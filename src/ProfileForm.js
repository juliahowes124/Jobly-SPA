import React, {useState} from "react";
import Alert from './Alert';

function ProfileForm({ currUser, updateUser }) {
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
      setFormData(initialState);
      setAlerts(a => [...a, { msg: "Updated successfully!", status: "success" }])
    } catch (err) {
      setAlerts(a => [...a, { msg: err }])
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <label>Username</label>
      <p>{currUser.username}</p>
      {
        Object.keys(formData).map(key => {
          return (<div key={key}>
            <label htmlFor={key}>{key}</label>
            <input onChange={handleChange}
              id={key}
              name={key}
              type={key === "password" ? "password" : "text"}
              value={formData[key]}
            />
          </div>
          )
        })
      }
      <button>Submit</button>
      {alerts.map(a => <Alert message={a.msg} status={a.status} />)}
    </form>
  );
}

export default ProfileForm;