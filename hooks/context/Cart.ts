"use client";
import CartReducer from "@/reducer/CartReducer";
import {
	CartAction,
	CartContextProps,
	CartState,
} from "@/types/ContextTypes/cart";
import React, { createContext, useContext, useReducer, useEffect } from "react";

interface CartContextValue {
	state: CartState;
	addToCart: (id: string, color: string, amount: number, product: any) => void;
	setDecrease: (id: string) => void;
	setIncrement: (id: string) => void;
	removeItem: (id: string) => void;
	clearCart: () => void;
}
// <CartContextValue | null>
// <{state:CartState, dispatch: React.Dispatch<CartAction> }>(state : initialState, dispatch: () => {})
const CartContext = createContext<CartContextValue | null>(null); //{} as CartContextProps

const getLocalCartData = (): CartState["cart"] => {
	// let localCartData = localStorage.getItem("cartItem");
	let localCartData = localStorage.getItem("cartItem");

	const parseData = JSON.parse(localCartData || "[]") as CartState["cart"];
	if (!Array.isArray(parseData)) {
		return [];
	} else {
		return parseData;
	}
};

const initialState: CartState = {
	// cart: [],
	cart: getLocalCartData(),
	total_item: "",
	total_price: "",
	shipping_fee: 50000,
};

//  { children: React.ReactNode }
const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	const addToCart = (
		id: string,
		color: string,
		amount: number,
		product: any
	) => {
		dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
	};

	// increment and decrement the product

	const setDecrease = (id: string) => {
		dispatch({ type: "SET_DECREMENT", payload: id });
	};

	const setIncrement = (id: string) => {
		dispatch({ type: "SET_INCREMENT", payload: id });
	};

	// to remove the individual item from cart
	const removeItem = (id: string) => {
		dispatch({ type: "REMOVE_ITEM", payload: id });
	};

	// to clear the cart
	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	// to add the data in localStorage
	// get vs set

	useEffect(() => {
		// dispatch({ type: "CART_TOTAL_ITEM" });
		// dispatch({ type: "CART_TOTAL_PRICE" });
		dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

		localStorage.setItem("cartItem", JSON.stringify(state.cart));
	}, [state.cart]);
	// const [count, setCount] = useLocalStorage("cartItem", 0);

	const contextValue: CartContextValue = {
		state,
		addToCart,
		setDecrease,
		setIncrement,
		removeItem,
		clearCart,
	};

	// value={{
	// 			...state,
	// 			addToCart,
	// 			removeItem,
	// 			clearCart,
	// 			setDecrease,
	// 			setIncrement,
	// 		}}
	return (
		<CartContext.Provider value={{ contextValue }}>
			{children}
		</CartContext.Provider>
	);
};

const useCartContext = (): CartContextValue => {
	const cartcontext = useContext(CartContext);
	if (!cartcontext || cartcontext === null) {
		throw new Error("useCartContext must be used within a CartProvider");
	}
	return cartcontext;
};

export { CartProvider, useCartContext, CartContext };
