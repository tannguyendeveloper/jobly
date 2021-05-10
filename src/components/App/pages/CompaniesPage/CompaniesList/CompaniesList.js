import CompanyListing from './CompanyListing';

const CompaniesList = ({companies,...props}) => {
  return <ul>
  {
    companies.map((company, idx)=>{ console.log(company); return <CompanyListing key={`company-${idx}`} company={company}/>})
  }
  </ul>
}

export default CompaniesList;