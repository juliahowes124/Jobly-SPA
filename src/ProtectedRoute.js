import React from "react"
import {Redirect, Route} from "react-router-dom"

function ProtectedRoute({ currUser, children, path }) {
  return (
    currUser ? <Route exact path={path}>{children}</Route> : <Redirect to="/login"/>
  )
}

export default ProtectedRoute;