import React, {useContext, useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import JobCard from './JobCard';
import UserContext from "./userContext"


function JobCardList({jobs}) {
  const {currUser} = useContext(UserContext);
  let query = useQuery();
  const page = query.get('page') || 1;
  const ITEMS_PER_PAGE = 20;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function calcMaxPages() {
    return Math.ceil(jobs.length / ITEMS_PER_PAGE);
  }

  function getPaginatedResults() {
    return jobs.slice(ITEMS_PER_PAGE*(page-1), ITEMS_PER_PAGE*page);
  }

  return (
  <div>
    {getPaginatedResults().map(job => {
      return <JobCard key={job.id} job={job} applied={currUser.applications.includes(job.id)}/>
    })}
    {page > 1 && <Link to={`/jobs?page=${+page-1}`}>Prev</Link>}
    <p>Page {page}/{calcMaxPages()}</p>
    {page < calcMaxPages() && <Link to={`/jobs?page=${+page+1}`}>Next</Link>}
  </div>
    )
}

export default JobCardList;