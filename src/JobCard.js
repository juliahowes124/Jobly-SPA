import React, { useContext } from 'react';
import UserContext from "./userContext"

function JobCard({job, applied}) {
  const {title, salary, equity, companyName, id} = job;
  const {applyToJob} = useContext(UserContext);


  return (<div>
  <p>{title}</p>
  <p>{companyName}</p>
  <p>salary: {salary}</p>
  <p>equity: {equity}</p>
  { applied
    ? <button disabled> Applied </button>
    : <button onClick={() => applyToJob(id)}>Apply</button>
  }
</div>)
}

export default JobCard;