import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import UserContext from "./userContext";

function Home() {
    const {currUser} = useContext(UserContext);

    return(
        <>
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {currUser
        ? <p>Welcome back, {currUser.firstName}!</p>
        :<>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        </>
        }
        
        </>
    )
}

export default Home;