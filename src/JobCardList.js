import React, {useContext} from 'react';
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
    <div className="d-flex justify-content-between w-50 mx-auto my-2">
      <Link style={{visibility: page>1 ? "visible" : "hidden"}} className="btn btn-primary" to={`/jobs?page=${+page-1}`}>Prev</Link>
      <h5>Page {page}/{calcMaxPages()}</h5>
      <Link style={{visibility: page<calcMaxPages() ? "visible" : "hidden"}} className="btn btn-primary" to={`/jobs?page=${+page+1}`}>Next</Link>
    </div>
  </div>
    )
}

export default JobCardList;