import React, {useState} from 'react';
import JoblyApi from './api';

function SearchBar({handleFilter, filterType}) {
  const [searchTerm, setSearchTerm] = useState('')


  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  async function filter(evt) {
    evt.preventDefault();
    if(filterType === "companies") {
      let companies = await JoblyApi.getCompanies(searchTerm);
      handleFilter(companies);
    } else {
      let jobs = await JoblyApi.getJobs(searchTerm);
      handleFilter(jobs);
    }
  }

  return (
    <form onSubmit={filter}>
      <input onChange={handleChange} value={searchTerm}/>
      <button>Submit</button>
    </form>
  )

}

export default SearchBar;