import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "./Alert";
import UserContext from "./userContext";
import {Container, Row, Col, Form, FormGroup, Button} from "react-bootstrap";

function LoginForm() {
  const {login} = useContext(UserContext)
  const [formData, setFormData] = useState({username:"", password:""});
  const [error , setError] = useState(null);
  const history = useHistory();

  function handleChange(evt) {
    const {name, value} = evt.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function submitHandler(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      history.push("/");
    } catch (err) {
      setError(err)
    }
  }

  //refactor this
  return (
    <Container>
      <Row>
        <Col className="col-6 mt-5 mx-auto bg-light p-5">
          <h1 className="text-center">Login</h1>
          <Form onSubmit={submitHandler} className="w-75 mx-auto">
            <FormGroup >
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                    onChange={handleChange}
                    id="username"
                    name="username"
                    value={formData.username}
                    required={true}/>
            </FormGroup>

            <FormGroup>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    required={true}/>
            </FormGroup>
            <Button variant="primary" className="float-right" type="submit">Submit</Button>
            {error && <Alert message={error}/>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;