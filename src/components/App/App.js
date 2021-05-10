import { useEffect, useReducer, useCallback, useMemo } from "react";
import "antd/dist/antd.css";
import { message } from "antd";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";

import { decode } from "jsonwebtoken";

/** Pages */
import CompaniesPage from "./pages/CompaniesPage";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import EditProfilePage from "./pages/EditProfilePage";
import SignUpPage from "./pages/SignUpPage";

import JoblyAPI from "../../api/JoblyAPI";

import AppContext from "../../contexts/AppContext";
import useLocalStorage from "../../hooks/useLocalStorage";

import Nav from "./Nav";
import PrivateRoute from "./PrivateRoute";

const initialUserState = { isLoggedIn: false, isLoading: false };

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_LOADING_USER_TRUE":
      return { ...state, isLoading: true };
    case "SET_LOADING_USER_FALSE":
      return { ...state, isLoading: false };
    case "APPLY_TO_JOB":
      const newState = { ...state };
      newState.user.applications.push(action.jobId);
      return newState;
    case "LOGIN_USER":
      return { ...state, user: { ...action.user }, isLoggedIn: true };
    case "UPDATE_USER":
      const updatedUser = { ...state.user, ...action.user };
      return { ...state, user: { ...updatedUser } };
    case "LOGOUT_USER":
      return initialUserState;
    default:
      throw new Error();
  }
};

function App() {
  const history = useHistory();
  const [token, { set, remove }] = useLocalStorage("token");
  const [user, dispatch] = useReducer(userReducer, initialUserState);

  const login = useCallback(
    async (data) => {
      try {
        dispatch({ type: "SET_LOADING_USER_TRUE" });
        const { token } = await JoblyAPI.login(data);
        set(token);
      } catch (e) {
        console.log(e);
        message.error("Inavlid Username/Password");
        dispatch({ type: "SET_LOADING_USER_FALSE" });
        remove();
        throw e;
      }
    },
    [remove, set]
  );

  const logout = () => {
    remove();
    dispatch({ type: "LOGOUT_USER" });
  };

  const signup = useCallback(
    async (data) => {
      try {
        const { token } = await JoblyAPI.registerUser(data);
        if (token) set(token);
      } catch (e) {
        console.error(e);
        message("error");
        throw e;
      }
    },
    [set]
  );

  const updateUser = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        let user = await JoblyAPI.updateUser(values);
        message.success("Profile Updated Successfully");
        dispatch({ type: "UPDATE_USER", user });
        resetForm();
        setSubmitting(false);
      } catch (e) {
        console.error(e);
        message.error("Unable to update profile.");
        setSubmitting(false);
      }
    },
    []
  );

  const applyToJob = useCallback(async (username, jobId) => {
    try {
      const response = await JoblyAPI.applyToJob(
        username,
        jobId
      );
      if (!response.applied) throw new Error();
      const appliedJobId = response.applied;
      return appliedJobId;
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  //
  useEffect(() => {
    console.log(token);
    const loadUser = async (username) => {
      try {
        dispatch({ type: "SET_LOADING_USER_TRUE" });
        const user = await JoblyAPI.getUser(username);
        dispatch({ type: "LOGIN_USER", user });
        dispatch({ type: "SET_LOADING_USER_FALSE" });
      } catch (e) {
        console.error(e);
        dispatch({ type: "SET_LOADING_USER_FALSE" });
        throw e;
      }
    };
    if (token) {
      JoblyAPI.token = token;
      const { username } = decode(token);
      loadUser(username);
    }
  }, [token]);

  return (
    <div className="App">
      <Router history={history}>
        <AppContext.Provider
          value={{ applyToJob, dispatch, login, logout, signup, token, updateUser, user,}}
        >
          <header className="App-header">
            <Nav />
          </header>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <PrivateRoute path="/companies/" exact component={CompaniesPage} />
            <PrivateRoute
              path="/companies/:handle"
              exact
              component={CompanyPage}
            />
            <PrivateRoute path="/jobs" exact component={JobsPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <PrivateRoute path="/profile" exact component={EditProfilePage} />
          </Switch>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
