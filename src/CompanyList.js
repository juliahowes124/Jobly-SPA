import React, { useState, useEffect } from "react";
import {useLocation, Link, useHistory} from 'react-router-dom';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import { Container, Row, Col } from 'react-bootstrap';

function CompanyList() {
  const [companies, setCompanies] = useState(null);
  let query = useQuery();
  const page = query.get('page') || 1;
  const ITEMS_PER_PAGE = 20; // w/ items per page in query, or prop
  const history = useHistory();

  useEffect(() => {
    const fetchCompanies = async () => {
      let companiesFromApi = await JoblyApi.getCompanies();
      setCompanies(companiesFromApi);
    }
    fetchCompanies();
  }, [])
  //backend is better w/query params

  function calcMaxPages() {
    return Math.ceil(companies.length / ITEMS_PER_PAGE);
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function handleFilter(filteredCompanies) {
    history.push('/companies');
    setCompanies(filteredCompanies);
  }

  function getPaginatedResults() {
    return companies.slice(ITEMS_PER_PAGE*(page-1), ITEMS_PER_PAGE*page);
  }

//pass in data and render function into paginatedList component
  return (
    <Container className="bg-light py-2 px-4 my-2">
      {companies ? 
      <>
        <Row className="my-3">
          <Col className="mx-auto">
            <SearchBar handleFilter={handleFilter} filterType="companies"/>
          </Col>
        </Row>
        <Row>
          <Col>
            {companies.length
            ? getPaginatedResults().map(c => <CompanyCard key={c.handle} company={c}/>)
            : 'Sorry, no results were found!'
            }
          </Col>
        </Row>
        <Row className="d-flex justify-content-between w-50 mx-auto my-2">
          <Link style={{visibility: page>1 ? "visible" : "hidden"}} className="btn btn-primary" to={`/companies?page=${+page-1}`}>Prev</Link>
          <h5>Page {page}/{calcMaxPages()}</h5>
          <Link style={{visibility: page<calcMaxPages() ? "visible" : "hidden"}} className="btn btn-primary" to={`/companies?page=${+page+1}`}>Next</Link>
        </Row>
      </>
    : 
    <Row>
      <Col className="mx-auto text-center">
        <h2>Loading...</h2>
      </Col>
    </Row>
    }
    </Container>
  )
}

export default CompanyList;