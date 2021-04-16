import React from 'react';
import { useHistory } from 'react-router-dom';
import {Card} from 'react-bootstrap';

function CompanyCard({company}) {
  const {handle, name, description, logoUrl} = company;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/companies/${handle}`);
  }
  
  return <Card onClick={handleClick}>
    <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Subtitle>{description}</Card.Subtitle>
    <img src={logoUrl}/> 
    </Card.Body>
  </Card>
}


export default CompanyCard;