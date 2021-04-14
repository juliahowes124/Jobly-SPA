import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import UserContext from './userContext';

function ProtectedRoute({ children, path }) {
  const {currUser} = useContext(UserContext);

  console.log('curr user in protected route: ', currUser);

  return (
    currUser ? <Route exact path={path}>{children}</Route> : <Redirect to="/login"/>
  )
}

export default ProtectedRoute;