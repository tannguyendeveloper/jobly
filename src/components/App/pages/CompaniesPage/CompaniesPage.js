import { useEffect, useState } from "react";
import JoblyAPI from "../../../../api/JoblyAPI";
import CompaniesList from "./CompaniesList";
import { Input } from "antd";
const { Search } = Input;
const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(function loadCompanies() {
    search();
  }, []);
  const search = async (query) => {
    const companies = await JoblyAPI.getCompanies(query);
    setCompanies(companies);
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="block text-xl text-center m-3">Companies</h1>
      <Search
        placeholder="input search text"
        onSearch={search}
        style={{ width: 200 }}
        className="my-3"
      />
      {companies.length ? <CompaniesList companies={companies} /> : <></>}
    </div>
  );
};

export default CompaniesPage;
