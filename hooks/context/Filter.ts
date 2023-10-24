"use client";
import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	ReactNode,
} from "react";
import { useProductContext } from "./Products";
import { FilterContextType, FilterState } from "@/types/ContextTypes/filter";
import FilterReducer from "@/reducer/FilterRedcer";

const initialState: FilterState = {
	filter_products: [],
	all_products: [],
	grid_view: true,
	sorting_value: "lowest",
	filters: {
		text: "",
		category: "all",
		company: "all",
		color: "all",
		maxPrice: 0,
		price: 0,
		minPrice: 0,
	},
};
const FilterContext = createContext<FilterContextType | null>(null);

export const FilterContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { products } = useProductContext();

	const [state, dispatch] = useReducer(FilterReducer, initialState);

	// to set the grid view
	const setGridView = () => {
		return dispatch({ type: "SET_GRID_VIEW" });
	};

	// to set the list view
	const setListView = () => {
		return dispatch({ type: "SET_LIST_VIEW" });
	};

	// sorting function
	const sorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let userValue = e.target.value;
		dispatch({ type: "GET_SORT_VALUE", payload: userValue });
	};

	// update the filter values
	const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		let name = e.target.name;
		let value = e.target.value;

		return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
	};

	// to clear the filter
	const clearFilters = () => {
		dispatch({ type: "CLEAR_FILTERS" });
	};

	// to sort the product
	useEffect(() => {
		dispatch({ type: "FILTER_PRODUCTS" });
		dispatch({ type: "SORTING_PRODUCTS" });
	}, [products, state.sorting_value, state.filters]);

	// to load all the products for grid and list view
	useEffect(() => {
		dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
	}, [products]);

	const FilterValue: FilterContextType = {
		...state,
		setGridView,
		setListView,
		sorting,
		updateFilterValue,
		clearFilters,
	};

	return (
		<FilterContext.Provider value={FilterValue}>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilterContext = () => {
	const filtercontext = useContext(FilterContext);
	if (!filtercontext || filtercontext === null || filtercontext === undefined) {
		throw new Error(
			"useFilterContext must be used within a FilterContextProvider"
		);
	}
	return filtercontext;
};
