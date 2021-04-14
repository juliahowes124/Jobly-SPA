import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import Home from "./Home";


function Routes({login, logout, register, currUser}) {
  return (
    <Switch>
      <Route exact path="/companies/:handle">
        <CompanyDetail />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/jobs">
        <JobList />
      </Route>
      <Route exact path="/login">
        <LoginForm login={login}/>
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm register={register}/>
      </Route>
      <Route exact path="/">
        <Home currUser={currUser}/>
      </Route>
      <Route>
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  )
}

export default Routes