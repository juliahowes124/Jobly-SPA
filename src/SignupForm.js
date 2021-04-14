import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import Alert from './Alert';
import UserContext from "./userContext";

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
    <form onSubmit={submitHandler}>
      {
        Object.keys(formData).map(key => {
          return (<div key={key}>
          <label htmlFor={key}>{key}</label>
          <input onChange={handleChange}
            id={key}
            name={key}
            type={key==="password" ? "password": "text"}
            value={formData[key]}
           />
          </div>
          )
        })
      }
      <button>Submit</button>
      {error && <Alert message={error} />}
    </form>
  );
}

export default SignupForm;