import {useContext} from "react";
import {
  Route,
  Redirect
} from "react-router-dom"
import AppContext from "../../../contexts/AppContext";
import LoginForm from "../LoginForm";

const PrivateRoute = ({children, ...props}) => {
  const AppState = useContext(AppContext);
  return AppState?.user?.isLoggedIn ? <Route {...props}>{children}</Route> : <LoginForm />;
}

export default PrivateRoute;