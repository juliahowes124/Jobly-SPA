import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from "./userContext";
import { Container, Row, Jumbotron, Col } from "react-bootstrap";

function Home() {
  const { currUser } = useContext(UserContext);

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <Jumbotron className="text-center">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
        {currUser
          ? <p>Welcome back, {currUser.firstName}!</p>
          : <>
            <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
            <Link to="/login" className="btn btn-primary mx-2">Login</Link>
          </>
        }
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;