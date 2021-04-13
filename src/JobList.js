import React, { useState, useEffect } from "react";
import SearchBar from './SearchBar';
import JoblyApi from './api';
import JobCardList from "./JobCardList";

function JobList() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      let jobsFromApi = await JoblyApi.getJobs();
      setJobs(jobsFromApi);
    }
    fetchJobs();
  }, [])

  function handleFilter(filteredJobs) {
    setJobs(filteredJobs);
  }

  return (
    <div>
      {jobs 
        ? (<>
            <div>
              <SearchBar handleFilter={handleFilter} filterType="jobs" />
            </div>
            <div>
              {jobs.length 
              ? <JobCardList jobs={jobs} />
              : "Sorry, no results were found!"}
              
            </div>
          </>)
      : <h2>Loading...</h2>
      }
    </div>
  )
}

export default JobList;