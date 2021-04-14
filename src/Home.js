import React from "react";
import {Link} from 'react-router-dom';

function Home({currUser}) {
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