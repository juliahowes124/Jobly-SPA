import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import Home from "./Home";


function Routes() {
  return (
    <Switch>
      <Route exact path="/companies/:company">
        <CompanyDetail />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/jobs">
        <JobList />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  )
}

export default Routes