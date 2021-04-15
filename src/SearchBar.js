/* Live search reference:
* https://medium.com/@mikjailsalazar/just-another-searchbar-react-axios-lodash-340efec6933d
*/

import React, {useState, useCallback} from 'react';
import JoblyApi from './api';
import _ from "lodash";
import {Form} from "react-bootstrap";


function SearchBar({handleFilter, filterType}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filter = useCallback(
    async function filter(searchTerm) {
      if(filterType === "companies") {
        let companies = await JoblyApi.getCompanies(searchTerm);
        handleFilter(companies);
    } else {
        let jobs = await JoblyApi.getJobs(searchTerm);
        handleFilter(jobs);
    }}, [filterType, handleFilter]);

  const search = useCallback(_.debounce(filter, 1000), [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(evt) {
    console.log("handleChange");
    setSearchTerm(evt.target.value);
    search(evt.target.value);
  }

  return (
    <Form className="mx-auto">
      <Form.Control onChange={handleChange} value={searchTerm} placeholder="Enter search term"/>
    </Form>
  )

}

export default SearchBar;