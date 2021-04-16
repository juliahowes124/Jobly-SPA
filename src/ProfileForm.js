import React, {useState, useContext} from "react";
import Alert from './Alert';
import UserContext from "./userContext";
import {Button, Form, FormGroup, Container, Row, Col} from 'react-bootstrap';

function ProfileForm() {
  const {currUser, updateUser} = useContext(UserContext);

  const initialState = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email
  };
  const [formData, setFormData] = useState(initialState);
  const [alerts, setAlerts] = useState([]);
  

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
      await updateUser(formData);
      setAlerts(a => [...a, { msg: "Updated successfully!", status: "success" }])
    } catch (err) {
      setAlerts(a => [...a, { msg: err }])
    }
  }
  return (
    <Container>
      <Row>
        <Col className="col-6 mt-5 mx-auto bg-light p-3">
        <h1 className="text-center">Edit Profile</h1>
        <Form onSubmit={submitHandler}>
          <Form.Label>Username</Form.Label>
          <p>{currUser.username}</p>
          {
            Object.keys(formData).map(key => {
              return (<FormGroup key={key}>
                <Form.Label htmlFor={key}>{key}</Form.Label>
                <Form.Control onChange={handleChange}
                  id={key}
                  name={key}
                  type={key === "password" ? "password" : "text"}
                  value={formData[key]}
                />
              </FormGroup>
              )
            })
          }
          {alerts.map(a => <Alert message={a.msg} status={a.status} />)}
          <Button variant="primary" type="submit" className="float-right">Submit</Button>
        </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileForm;