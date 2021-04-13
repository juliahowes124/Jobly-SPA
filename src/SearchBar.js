import React, {useState} from 'react';
import JoblyApi from './api';

function SearchBar({handleFilter, filterType}) {
  const [searchTerm, setSearchTerm] = useState('')


  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  async function filterCompanies(evt) {
    evt.preventDefault();
    let companies = await JoblyApi.getCompanies(searchTerm);
    handleFilter(companies);
  }

  return (
    <form onSubmit={filterCompanies}>
      <input onChange={handleChange} value={searchTerm}/>
      <button>Submit</button>
    </form>
  )

}

export default SearchBar;