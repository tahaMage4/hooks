"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import useFetch from "../../hooks/useFetch";
import ProductsReducer from "../reducer/productsReducer";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);
  const { data } = useFetch("https://api.pujakaitem.com/api/products");
  const { data: single_product } = useFetch();
  // `https://api.pujakaitem.com/api/products/${data.id}`

  // console.log(
  //   "🚀 ~ file: Products.js:20 ~ AppProvider ~ single_product:",
  //   single_product
  // );

  //   For All the Products
  const getProducts = async () => {
    /* `dispatch` is a function that is used to send actions to the reducer. It takes an action object
      as an argument and triggers the reducer function to update the state based on the action type
      and payload. In this code, `dispatch` is used to update the state in various scenarios like
      setting loading state, setting API data, handling API errors, setting single loading state, and
      setting single product data. */
    dispatch({ type: "SET_LOADING" });
    try {
      const products = await data;


      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR", payload: error });
    }
  };

  //   For Only the Single Products

  const getSingleProduct = async () => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const singleProduct = await single_product;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts();
    getSingleProduct();
  }, [data, single_product]);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
