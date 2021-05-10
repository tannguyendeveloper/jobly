import { useContext } from "react";
import { Link } from "react-router-dom"
import AppContext from "../../../contexts/AppContext";
import GuestNav from "./GuestNav";
import UserNav from "./UserNav";

const Nav = () => {
  const AppState = useContext(AppContext);
  return <div className="bg-gray-100 p-3 flex justify-between">
    <Link to="/" className="">Jobly</Link>
    {
      AppState?.user?.isLoggedIn ? <UserNav /> : <GuestNav />
    }
  </div>;
};

export default Nav;
