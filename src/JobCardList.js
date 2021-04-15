import React, {useContext} from 'react';
import JobCard from './JobCard';
import UserContext from "./userContext"


function JobCardList({jobs}) {
  const {currUser} = useContext(UserContext);

  return (
  <div>
    {jobs.map(job => {
      return <JobCard key={job.id} job={job} applied={currUser.applications.includes(job.id)}/>
    })}
  </div>
    )
}

export default JobCardList;