import {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import AppContext from "../../../../contexts/AppContext";

const UserNav = () => {
  const { user, logout } = useContext(AppContext);
  return(
    <div>
      <NavLink to="/companies" className="mx-2">Companies</NavLink>
      <NavLink to="/jobs" className="mx-2">Jobs</NavLink>
      <NavLink to="/profile" className="mx-2">Profile</NavLink>
      <a><button onClick={logout} className="mx-2 hover:">Logout {user.username}</button></a>
    </div>
  )
}

export default UserNav;