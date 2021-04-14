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
    if (localToken) {
      JoblyApi.updateToken(localToken);
    } else {
      JoblyApi.updateToken(undefined);
    }
  }, [localToken]);

  useEffect( () => {
    async function fetchUser(username) {
      let user = await JoblyApi.getUser(username);
      setCurrentUser(user);
    }
    const userFromToken= jwt.decode(localToken);
    if (userFromToken) {
      fetchUser(userFromToken.username);
    } else {
      setCurrentUser(null);
      setLocalToken(null);
    }

  }, [localToken, setLocalToken]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav logout={logout} currUser={currentUser}/>
        <Routes login={login} register={register} currUser={currentUser}/>
      </BrowserRouter>
    </div>
  );
}


export default App;
