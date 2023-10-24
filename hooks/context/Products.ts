"use client";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";
import useFetch from "@/hooks/useFetch";
import ProductsReducer from "@/reducer/ProductsReducer";
import { ProductState } from "@/types/ContextTypes/product";

const initialState: ProductState = {
	isLoading: false,
	isError: false,
	products: [],
	featureProducts: [],
	isSingleLoading: false,
	singleProduct: {},
};
interface ProductContextValue {
	state: ProductState;
	getProducts: () => void;
	getSingleProduct: () => void;
}

const ProductsContext = createContext<ProductContextValue>(
	{} as ProductContextValue
);

const ProductProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(ProductsReducer, initialState);
	const { data } = useFetch("https://api.pujakaitem.com/api/products");
	const { data: single_product } = useFetch(
		"https://api.pujakaitem.com/api/products"
	);

	//   For All the Products
	const getProducts = async () => {
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
		// getSingleProduct();
	}, [data, single_product]);

	const contextValue: ProductContextValue = {
		state,
		getProducts,
		getSingleProduct,
	};

	return (
		<ProductsContext.Provider value={contextValue}>
			{children}
		</ProductsContext.Provider>
	);
};

// custom hooks
const useProductContext = (): ProductContextValue => {
	const productcontext = useContext(ProductsContext);
	if (!productcontext || productcontext === null) {
		throw new Error("useProductContext must be used within a CartProvider");
	}
	return productcontext;
};

export { ProductProvider, ProductsContext, useProductContext };
