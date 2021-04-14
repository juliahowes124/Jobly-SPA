import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute"


function Routes({login, logout, register, currUser, updateUser}) {
  return (
    <Switch>
      <ProtectedRoute currUser={currUser} path="/companies/:handle">
        <CompanyDetail />
      </ProtectedRoute>
      <ProtectedRoute currUser={currUser} path="/companies">
        <CompanyList />
      </ProtectedRoute>
      <ProtectedRoute currUser={currUser} path="/jobs">
        <JobList />
      </ProtectedRoute>
      <ProtectedRoute currUser={currUser} path="/profile">
        <ProfileForm updateUser={updateUser} currUser={currUser}/>
      </ProtectedRoute>
      <Route path="/login">
        <LoginForm login={login}/>
      </Route>
      <Route path="/signup">
        <SignupForm register={register}/>
      </Route>
      <Route path="/">
        <Home currUser={currUser}/>
      </Route>
      <Route>
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  )
}

export default Routes