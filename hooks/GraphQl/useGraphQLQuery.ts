import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

// Define your GraphQL query here
const YOUR_GRAPHQL_QUERY = gql`
  query YourGraphQLQuery {
    // Your query definition goes here
  }
`;

// Custom hook for executing GraphQL queries
const useGraphQLQuery = () => {
	// Fetch data using the Apollo useQuery hook
	const { data, loading, error } = useQuery(YOUR_GRAPHQL_QUERY);

	// Perform any additional logic here if needed
	// For example, you can map or transform the data

	// useEffect to trigger the query when the component mounts
	useEffect(() => {
		// Trigger the query here if needed
		// For example, you can call the refetch method to manually trigger the query
		// The query will also be executed automatically by useQuery
	}, []);

	return { data, loading, error };
};

export default useGraphQLQuery;
