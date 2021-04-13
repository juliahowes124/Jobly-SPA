import React, { useState, useEffect } from "react";
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';

function CompanyList() {
  const [companies, setCompanies] = useState(null);


  useEffect(() => {
    const fetchCompanies = async () => {
      let companiesFromApi = await JoblyApi.getCompanies();
      setCompanies(companiesFromApi);
    }
    fetchCompanies();
  }, [])

  function handleFilter(filteredCompanies) {
    setCompanies(filteredCompanies);
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
          ? companies.map(c => <CompanyCard key={c.handle} company={c}/>)
          : 'Sorry, no results were found!'
          }
        </div>
      </>
    : <h2>Loading...</h2>}
    </div>
  )
}

export default CompanyList;