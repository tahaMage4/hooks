import { createContext, useContext, useReducer } from "react";
import SearchReducer from "../reducer/SearchReducer";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  return useContext(SearchContext);
};

export { SearchContext, useSearchContext, SearchProvider };
