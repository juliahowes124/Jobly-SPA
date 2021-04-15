import {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import JobCardList from './JobCardList';
import UserContext from './userContext';
import JoblyApi from './api';

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
    <>
    <JobCardList jobs={appliedJobs}/>
    <Link to="/profile/edit">Edit Profile</Link>
    </>
  )

}
export default Profile;