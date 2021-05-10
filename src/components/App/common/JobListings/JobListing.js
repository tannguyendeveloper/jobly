import { useState, useContext, useCallback, useMemo } from "react";
import JoblyAPI from "../../../../api/JoblyAPI";

import { Button } from "antd";
import AppContext from "../../../../contexts/AppContext";

const JobListing = ({ job }) => {
  const {applyToJob, dispatch, token, user} = useContext(AppContext);
  const {applications, username} = user?.user;
  const alreadyApplied = applications?.includes(job.id);
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(async () => {
    try {
      console.log(job.id);
      let appliedJobId = await applyToJob(username, job.id);
      console.log(appliedJobId);
      dispatch({type:"APPLY_TO_JOB", jobId: appliedJobId});
    } catch (e) {
      console.error(e);
      throw e;
    }
  }, [applyToJob, dispatch, job.id, username]);
  return (
    <li className="border border-gray-200 p-3 mb-2 clear-both">
      <strong>{job?.title}</strong>
      { job?.salary ? <p>Salary: ${job?.salary}</p> : '' }
      { job.companyName ?? <p><strong>{job.companyName}</strong></p> }
      {Number(job?.equity) > 0 ? <p>Equity: {job?.equity}</p> : null}
      <Button className="float-right" loading={loading} disabled={alreadyApplied} onClick={handleClick}>
        {
          alreadyApplied ? 'Applied' : 'Apply'
        }
      </Button>
      <div className="clear-both"></div>
    </li>
  );
};
export default JobListing;
