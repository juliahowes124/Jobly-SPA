import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCardList from './JobCardList';
import { Container, Row, Col } from 'react-bootstrap';


function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();


  useEffect(() => {
    async function fetchCompanyData() {
      const companyFromAPI = await JoblyApi.getCompany(handle);
      setCompany(companyFromAPI);
    }
    fetchCompanyData();
  }, [handle])

  return (
    <Container className="bg-light py-2 px-4 my-2">
      <Row className="my-3">
        <Col className="mx-auto">
          {company
          ? <div>
              <h1>{company.name}</h1>
              <p>{company.description}</p>
              <JobCardList jobs={company.jobs}/>
            </div>
          : <h2>Loading...</h2>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyDetail;