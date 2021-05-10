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
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
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

  static async getCompanies(name) {
    const queryString = name ? `?name=${name}` : '';
    console.log(queryString);
    let res = await this.request(`companies/${queryString}`);
    console.log(res.companies);
    return res.companies;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //** Post new company */
  static async postCompany(data) {
    let res = await this.request(`companies/`,data,"post");
    return res.company;
  }

  /** Update Company */
  static async updateCompany(data) {
    let res = await this.request(`companies/${data.handle}`, data,"patch");
    return res.company;
  }

  /** Update Company */
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, "delete");
    return res.company;
  }


  // Jobs
  static async getJobs(titleQuery) {
    const queryString = titleQuery ? `?title=${titleQuery}` : '';
    console.log(queryString);
    let res = await this.request(`jobs/${queryString}`);

    console.log(res.jobs);
    return res.jobs;
  }

  // Auth/Registration
  static async login(data) {
    try {
      let response = await this.request(`auth/token`, data, "post");
      return response;
    } catch (e) {

    }
  }

  static async registerUser(data) {
    try {
      let response = await this.request(`auth/register`, data, "post");
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  // Users

  static async getUser(username) {
    try {
      let {user} = await this.request(`users/${username}`, {}, "get");
      return user;
    } catch (e) {
      console.error(e);
      throw (e)
    }
  }

  static async updateUser({username, ...data}) {
    try {
      delete(data.isAdmin);
      let {user} = await this.request(`users/${username}`, data, "patch");
      return user;
    } catch (e) {
      console.error(e);
      throw (e)
    }
  }

  static async applyToJob(username, jobid) {
    try {
      let response = await this.request(`users/${username}/jobs/${jobid}`, {}, "post");
      return response;
    } catch (e) {
      console.error(e);
      throw (e)
    }
  }

}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;