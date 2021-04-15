import React, { useContext } from 'react';
import UserContext from "./userContext"
import { Card, Button } from "react-bootstrap";

function JobCard({job, applied}) {
  const {title, salary, equity, companyName, id} = job;
  const {applyToJob} = useContext(UserContext);


  return (
  <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle>{companyName}</Card.Subtitle>
      <Card.Text>salary: {salary}</Card.Text>
      <Card.Text>equity: {equity}</Card.Text>
      { applied
        ? <Button variant="success" disabled> Applied </Button>
        : <Button variant="success" onClick={() => applyToJob(id)}>Apply</Button>
      }
    </Card.Body>
  </Card>
)
}

export default JobCard;