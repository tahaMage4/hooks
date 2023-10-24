import { createContext, useContext, useEffect, useReducer } from "react";
import AuthReducer from "../reducer/AuthReducer";

const getUser = () => {
  let localUser = localStorage.getItem("user");
  const parseData = JSON.parse(localUser);
  console.log(parseData, typeof parseData);
  if (!Object.is(parseData)) {
    return {};
  } else {
    return parseData;
  }
};

const INITIAL_STATE = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  user: getUser(),
  loading: false,
  error: null,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthContext, AuthProvider };
