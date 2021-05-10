import { useEffect, useState } from "react";
import JoblyAPI from "../../../../api/JoblyAPI";
import JobListings from "../../common/JobListings/";

import { Input } from "antd";
const { Search } = Input;
const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(function loadCompanies() {
    search();
  }, []);
  const search = async (query) => {
    const jobs = await JoblyAPI.getJobs(query);
    setJobs(jobs);
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="block text-xl text-center m-3">CompaniesJobs</h1>
      <Search
        placeholder="input search text"
        onSearch={search}
        style={{ width: 200 }}
        className="my-3"
      />
      <JobListings jobs={jobs} />
    </div>
  );
};

export default JobsPage;
