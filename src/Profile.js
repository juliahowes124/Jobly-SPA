import {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import JobCardList from './JobCardList';
import UserContext from './userContext';
import JoblyApi from './api';
import { Container, Row, Col} from 'react-bootstrap';


function Profile() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const {currUser} = useContext(UserContext);

  useEffect(() => {
    async function fetchAppliedJobs() {
      let jobs = await Promise.all(currUser.applications.map(id => {
        return JoblyApi.getJob(id);
      }));
      setAppliedJobs(jobs);
    }
    fetchAppliedJobs();
  }, []);

  return (
    <Container className="bg-light py-2 px-4 my-2">
      <Row>
        <Col>
            <h1>{currUser.username}</h1>
        </Col>
        <Col>
            <Link className="btn btn-primary float-right" to="/profile/edit">Edit Profile</Link>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="mx-auto">
          <JobCardList jobs={appliedJobs}/>
        </Col>
      </Row>
    </Container>
  )

}
export default Profile;