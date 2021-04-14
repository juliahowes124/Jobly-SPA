import Routes from "./Routes";
import Nav from "./Nav";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.css";
import JoblyApi from "./api"
import jwt from "jsonwebtoken"
import useLocalStorage from "./hooks/LocalStorageHook";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [localToken, setLocalToken] = useLocalStorage("token", null);


  async function updateUser(userData) {
    const updatedUser = await JoblyApi.patchUser(currentUser.username, userData);
    setCurrentUser(updatedUser);

  }

  async function login(userInfo) {
    const token = await JoblyApi.login(userInfo);
    if (token) {
      setLocalToken(token);
      return true;
    }
    return false

  }

  function logout() {
    setLocalToken(null);
    JoblyApi.logout();
  }

  async function register(userInfo) {
    const token = await JoblyApi.register(userInfo);
    setLocalToken(token);
  }

  useEffect( () => {
    async function fetchUser(username) {
      let user = await JoblyApi.getUser(username);
      setCurrentUser(user);
    }
    const userFromToken= jwt.decode(localToken);
    if (userFromToken) {
      JoblyApi.updateToken(localToken);
      fetchUser(userFromToken.username);
    } else {
      setCurrentUser(null);
      setLocalToken(null);
      JoblyApi.updateToken(undefined);
    }
  }, [localToken]);
  //why setLocalToken as dependency caused infinite loop?

  return (
    <div className="App">
      <BrowserRouter>
        <Nav logout={logout} currUser={currentUser}/>
        <Routes login={login} register={register} currUser={currentUser} updateUser={updateUser}/>
      </BrowserRouter>
    </div>
  );
}


export default App;
