import {Link} from 'react-router-dom';
const CompanyListing = ({company}) => {
  return(
    <li className="border border-gray-200 p-3 mb-2">
      <Link to={`/companies/${company.handle}`}>
      {company.logoUrl}
      { company.logoUrl ? <img src={`${company.logoUrl}`} alt=""/> : null }
      <strong>{company.name}</strong>
      <p>{company.description}</p>
      </Link>
    </li>
  )
}

export default CompanyListing;