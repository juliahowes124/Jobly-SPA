import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import JoblyApi from './api';
import JobCardList from "./JobCardList";
import { Container, Row, Col} from "react-bootstrap";

function JobList() {
  const [jobs, setJobs] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchJobs = async () => {
      let jobsFromApi = await JoblyApi.getJobs();
      setJobs(jobsFromApi);
    }
    fetchJobs();
  }, [])

  function handleFilter(filteredJobs) {
    history.push('/jobs');
    setJobs(filteredJobs);
  }


  return (
    <Container className="bg-light py-2 px-4 my-2">
      {jobs
        ? (<>
            <Row className="my-3">
              <Col className="mx-auto">
                <SearchBar handleFilter={handleFilter} filterType="jobs" />
              </Col>
            </Row>
            <Row>
              <Col>
                {jobs.length
                ? <JobCardList jobs={jobs}/>
                : <h3>Sorry, no results were found!</h3>}
              </Col>
            </Row>
          </>)
      : <h2>Loading...</h2>
      }
    </Container>
  )
}

export default JobList;