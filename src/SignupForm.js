import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import Alert from './Alert';
import UserContext from "./userContext";
import {Container, Row, Col, Form, FormGroup, Button} from "react-bootstrap";

function SignupForm() {
  const {register} = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "",
                                             password: "",
                                             firstName: "",
                                             lastName: "",
                                             email: "" });
  const [error, setError] = useState(false);
  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function submitHandler(evt) {
    evt.preventDefault();
    try {
      await register(formData);
      history.push("/");
    } catch (err) {
      setError(err)
    }
  }

  return (
    <Container>
      <Row>
        <Col className="col-6 mt-5 mx-auto bg-light p-3">
        <h1 className="text-center">Sign Up</h1>
          <Form onSubmit={submitHandler} className="w-75 mx-auto">
            {
              Object.keys(formData).map(key => {
                return (
                <FormGroup key={key}>
                  <Form.Label htmlFor={key}>{key}</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    id={key}
                    name={key}
                    type={key==="password" ? "password": "text"}
                    value={formData[key]}
                  />
                </FormGroup>
                )
              })
            }
            <Button variant="primary" type="submit" className="float-right">Submit</Button>
            {error && <Alert message={error} />}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupForm;