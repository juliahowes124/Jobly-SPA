import { NavLink } from "react-router-dom"

function Nav({ logout, currUser }) {


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" exact to="/">Jobly</NavLink>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
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
      </div>
    </nav>
  )
}

export default Nav;