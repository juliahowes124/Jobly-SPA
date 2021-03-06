import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(searchTerm) {
    let endpoint;
    if (searchTerm) {
      endpoint = `companies?name=${searchTerm}`;
    } else {
      endpoint = `companies`;
    }
    let res = await this.request(endpoint);
    return res.companies;
  }

  static async getJobs(searchTerm) {
    let endpoint;
    if (searchTerm) {
      endpoint = `jobs?title=${searchTerm}`;
    } else {
      endpoint = `jobs`;
    }
    let res = await this.request(endpoint)
    return res.jobs;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async login(credentials) {
    let res = await this.request('auth/token', credentials, "post");
    JoblyApi.token = res.token;
    return res.token;
  }

  static async register(userInfo) {
    let res = await this.request('auth/register', userInfo, "post");
    JoblyApi.token = res.token;
    return res.token;
  }

  static async logout() {
    JoblyApi.token = null;
  }

  static updateToken(token) {
    JoblyApi.token=token;
  }

  static async patchUser(username, userData) {
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post")
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;