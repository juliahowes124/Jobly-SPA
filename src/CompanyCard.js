import React from 'react';
import { useHistory } from 'react-router-dom';

function CompanyCard({company}) {
  const {handle, name, description} = company;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/companies/${handle}`);
  }

  return <div onClick={handleClick}>
    <p>{name}</p>
    <p>{description}</p>
  </div>
}

export default CompanyCard;