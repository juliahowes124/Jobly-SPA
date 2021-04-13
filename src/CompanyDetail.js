import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCardList from './JobCardList';


function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();


  useEffect(() => {
    async function fetchCompanyData() {
      const companyFromAPI = await JoblyApi.getCompany(handle);
      setCompany(companyFromAPI);
    }
    fetchCompanyData();
  }, [])

  return (
    <div>
      {company 
      ? <div>
          <h1>{company.name}</h1>
          <p>{company.description}</p>
          <JobCardList jobs={company.jobs}/>
        </div>
      : <h2>Loading...</h2>
      }
    </div>
  )
}

export default CompanyDetail;