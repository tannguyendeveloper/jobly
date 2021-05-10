import { useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../../../../contexts/AppContext";
import LoginForm from "../../LoginForm";

const HomePage = () => {
  const AppState = useContext(AppContext);
  const { user } = AppState.user;
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-xl text-center m-3">Jobly</h1>
      {!AppState.user?.isLoggedIn ? (
        <LoginForm />
      ) : (
        <>
          <h2>Welcome {user.username}!</h2>
        </>
      )}
    </div>
  );
};

export default HomePage;
