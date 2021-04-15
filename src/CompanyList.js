import React, { useState, useEffect } from "react";
import {useLocation, Link, useHistory} from 'react-router-dom';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';

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
    <div>
      {companies ? 
      <>
        <div>
          <SearchBar handleFilter={handleFilter} filterType="companies"/>
        </div>
        <div>
          {companies.length
          ? getPaginatedResults().map(c => <CompanyCard key={c.handle} company={c}/>)
          : 'Sorry, no results were found!'
          }
        </div>
        {page > 1 && <Link to={`/companies?page=${+page-1}`}>Prev</Link>}
        <p>Page {page}/{calcMaxPages()}</p>
        {page < calcMaxPages() && <Link to={`/companies?page=${+page+1}`}>Next</Link>}
      </>
    : <h2>Loading...</h2>}
    </div>
  )
}

export default CompanyList;