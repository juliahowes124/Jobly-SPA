import React, { useState, useEffect } from "react";
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';

function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchCompanies = async () => {
      let companiesFromApi = await JoblyApi.getCompanies();
      setCompanies(companiesFromApi);
    }
    fetchCompanies();
  }, [])

  //do these functions get defined every time?

  function calcMaxPages() {
    return Math.ceil(companies.length / ITEMS_PER_PAGE);
  }

  function handleFilter(filteredCompanies) {
    setCompanies(filteredCompanies);
  }

  function getPaginatedResults() {
    return companies.slice(ITEMS_PER_PAGE*(page-1), ITEMS_PER_PAGE*page);
  }

  function handlePrev() {
    setPage(p => p-1);
  }

  function handleNext() {
    setPage(p => p+1);
  }

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
        {page > 1 && <button onClick={handlePrev}>Prev</button>}
        <p>Page {page}/{calcMaxPages()}</p>
        {page < calcMaxPages() && <button onClick={handleNext}>Next</button>}
      </>
    : <h2>Loading...</h2>}
    </div>
  )
}

export default CompanyList;