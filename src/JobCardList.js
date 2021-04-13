import React from 'react';
import JobCard from './JobCard';

function JobCardList({jobs, company}) {

  return (
  <div>
    {jobs.map(job => {
      return <JobCard key={job.id} job={job} />
    })}
  </div>
    )
}

export default JobCardList;