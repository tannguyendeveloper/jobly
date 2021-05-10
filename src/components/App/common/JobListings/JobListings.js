import JobListing from './JobListing';

const JobListings = ({jobs = []}) => {
  const jobListItems = jobs.map(job=><JobListing key={`job-${job.id}`}job={job}/>)
  return(
    jobs?.length ? <ul>{jobListItems}</ul> : null
  )
}

export default JobListings;