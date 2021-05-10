import { useContext } from 'react';
import AppContext from '../../../../contexts/AppContext';
import { Redirect } from 'react-router-dom';

import LoginForm from "../../LoginForm";

const LoginPage = () => {
  const AppState = useContext(AppContext);
  console.log(AppState);
  return !AppState?.user?.isLoggedIn ? <LoginForm /> : <Redirect to="/" />
}

export default LoginPage;