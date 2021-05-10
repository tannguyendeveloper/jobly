import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import JoblyAPI from "../../../../api/JoblyAPI";
import {Spin, message} from "antd";
import JobListings from "../../common/JobListings/";

const CompanyPage = () => {
  const {handle} = useParams();
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(false);

  const loadCompany = async (handle) => {
    setLoading(true);
    try {
      const company = await JoblyAPI.getCompany(handle);
      setCompany(company);
      setLoading(false);
    } catch(e) {
      console.error(e);
      message.error('Unable to load company');
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompany(handle);
  },[handle])

  return(<>
    <Spin spinning={loading}>
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-xl text-center m-3">{company?.name}</h1>
      <p>{company?.description}</p>
      <JobListings jobs={company?.jobs}/>
    </div>
    </Spin>
  </>)
}

export default CompanyPage;