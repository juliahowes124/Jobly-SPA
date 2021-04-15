import { NavLink } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavComponent({ logout, currUser }) {
  console.log(currUser);

  return (
    <Navbar bg="light">
      <NavLink className="navbar-brand" exact to="/">Jobly</NavLink>
      <Nav className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
          {currUser
            ? <><li className="nav-item">
              <NavLink className="nav-link" exact to="/companies">Companies</NavLink>
            </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/jobs">Jobs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/profile">Profile</NavLink>
              </li>
              <li className="nav-item">
                {/* change to not active somehow */}
                <NavLink className="nav-link" exact to="/" onClick={logout}>Logout {currUser.username}</NavLink>
              </li>
            </>
            : <>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/signup">Signup</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/login">Login</NavLink>
              </li>
            </>

          }


        </ul>
      </Nav>
    </Navbar>
  )
}

export default NavComponent;