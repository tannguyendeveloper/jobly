import {Link} from "react-router-dom";
const GuestNav = () => {
  return(
    <div>
      <Link to="/login" className="mx-2">Login</Link>
      <Link to="/signup" className="mx-2">Signup</Link>
    </div>
  )
}

export default GuestNav;