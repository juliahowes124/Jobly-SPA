import Routes from "./Routes";
import NavComponent from "./Nav";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.css";
import JoblyApi from "./api"
import jwt from "jsonwebtoken"
import useLocalStorage from "./hooks/LocalStorageHook";
import UserContext from "./userContext";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [localToken, setLocalToken] = useLocalStorage("token", null);
  const [isLoading, setIsLoading] = useState(true);


  async function updateUser(userData) {
    const updatedUser = await JoblyApi.patchUser(currentUser.username, userData);
    setCurrentUser(updatedUser);

  }

  async function applyToJob(jobId) {
    await JoblyApi.applyToJob(currentUser.username, jobId);
    setCurrentUser((currentUser) => ({...currentUser, applications:[...currentUser.applications, jobId]}))
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
      setIsLoading(false);
    }
    setIsLoading(true);
    const userFromToken= jwt.decode(localToken);
    console.log('local storage user', userFromToken);
    if (userFromToken) {
      JoblyApi.updateToken(localToken);
      fetchUser(userFromToken.username);
    } else {
      setCurrentUser(null);
      setLocalToken(null);
      JoblyApi.updateToken(undefined);
      setIsLoading(false);
    }
  }, [localToken]);
  //why setLocalToken as dependency caused infinite loop?

  //QUESTION wrap Provider around Nav too?
  return (
    isLoading ? (
      <h2>Loading...</h2>
    ) : (
    <div className="App">
      <BrowserRouter>
        <NavComponent logout={logout} currUser={currentUser}/>
        <UserContext.Provider value={{login, register, currUser: currentUser, updateUser, applyToJob}}>
          <Routes/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
  );
}


export default App;
