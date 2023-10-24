"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import AuthReducer from "../reducer/AuthReducer";

// const getUser = () => {
//   let localUser = localStorage.getItem("user");
//   const parseData = JSON.parse(localUser);
//   console.log(parseData);
//   // "!Object.is"
//   if (!Array.isArray(parseData)) {
//     return [];
//   } else {
//     return parseData;
//   }
// };

const INITIAL_STATE = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  // user: getUser() || null,
  user: null,
  loading: false,
  error: null,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: "LOGIN_SUCCESS" });
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
