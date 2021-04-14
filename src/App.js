import Routes from "./Routes";
import Nav from "./Nav";
import {BrowserRouter, useHistory} from "react-router-dom";
import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.css";
import JoblyApi from "./api"
import jwt from "jsonwebtoken"


function App() {
  const [userToken, setUserToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  async function login(userInfo) {
    const token = await JoblyApi.login(userInfo);
    if (token) {
      setUserToken(token);
      return true; 
    } 
    return false

  }

  function logout() {
    setUserToken(null);
    JoblyApi.logout();
  }

  async function register(userInfo) {
    const token = await JoblyApi.register(userInfo);
    setUserToken(token);
  }

  useEffect( () => {
    async function fetchUser(username) {
      let user = await JoblyApi.getUser(username);
      setCurrentUser(user);
    }
    const userFromToken= jwt.decode(userToken);
    if (userFromToken) {
      fetchUser(userFromToken.username)
    } else {
      setCurrentUser(null);
    }

  }, [userToken])

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
