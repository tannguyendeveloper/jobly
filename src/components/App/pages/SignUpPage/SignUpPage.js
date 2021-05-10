import { useContext } from 'react';
import AppContext from '../../../../contexts/AppContext';
import SignUpForm from '../../SignUpForm';
import { Redirect } from 'react-router-dom';

const SignUpPage = () => {
  const AppState = useContext(AppContext);
  console.log(AppState);
  return !AppState?.user?.isLoggedIn ? <SignUpForm /> : <Redirect to="/" />
}

export default SignUpPage;