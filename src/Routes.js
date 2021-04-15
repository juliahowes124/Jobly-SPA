import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import Profile from './Profile';
import SignupForm from "./SignupForm";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute"


function Routes() {
  return (
    <Switch>
      <ProtectedRoute path="/companies/:handle">
        <CompanyDetail />
      </ProtectedRoute>
      <ProtectedRoute path="/companies">
        <CompanyList />
      </ProtectedRoute>
      <ProtectedRoute path="/jobs">
        <JobList />
      </ProtectedRoute>
      <ProtectedRoute path="/profile/edit">
        <ProfileForm/>
      </ProtectedRoute>
      <ProtectedRoute path="/profile">
        <Profile/>
      </ProtectedRoute>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignupForm/>
      </Route>
      <Route path="/">
        <Home/>
      </Route>
      <Route>
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  )
}

export default Routes