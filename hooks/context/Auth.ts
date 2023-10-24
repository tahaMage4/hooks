"use client";
import AuthReducer from "@/reducer/AuthReducer";
import { AuthContextType, AuthState, User } from "@/types/ContextTypes/auth";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";

const getUser = (): User[] => {
	let localUser = localStorage.getItem("user");
	const parseData = JSON.parse(localUser || "[]");
	console.log(parseData);
	// "!Object.is"
	if (!Array.isArray(parseData)) {
		return [];
	} else {
		return parseData;
	}
};

const INITIAL_STATE: AuthState = {
	// user: JSON.parse(localStorage.getItem("user")) || null,
	user: getUser() || null,
	// user: null,
	loading: false,
	error: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
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
			}}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuthContext = () => {
	const authcontext = useContext(AuthContext);
	if (!authcontext && authcontext === null) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return authcontext;
};

export { useAuthContext, AuthContext, AuthProvider };
