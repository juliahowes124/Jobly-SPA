import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "./Alert";

function LoginForm({login}) {
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
    <form onSubmit={submitHandler}>
      <label htmlFor="username">Username</label>
      <input onChange={handleChange}
             id="username"
             name="username"
             value={formData.username}
             required={true}/>
      <label htmlFor="password">Password</label>
      <input onChange={handleChange}
             type="password"
             id="password"
             name="password"
             value={formData.password}
             required={true}/>
      <button>Submit</button>
      {error && <Alert message={error}/>}
    </form>
  );
}

export default LoginForm;