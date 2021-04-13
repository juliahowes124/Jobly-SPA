import React from 'react';

function JobCard({job}) {
  const {title, salary, equity, companyName} = job;

  return (<div>
  <p>{title}</p>
  <p>{companyName}</p>
  <p>salary: {salary}</p>
  <p>equity: {equity}</p>
</div>)
}

export default JobCard;