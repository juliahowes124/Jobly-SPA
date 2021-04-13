import React from 'react';
import { useHistory } from 'react-router-dom';

function CompanyCard({company}) {
  const {handle, name, description, logoUrl} = company;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/companies/${handle}`);
  }
  
//FIX LOGO
  return <div onClick={handleClick}>
    <p>{name}</p>
    <p>{description}</p>
    <img src={logoUrl}/> 
  </div>
}

export default CompanyCard;