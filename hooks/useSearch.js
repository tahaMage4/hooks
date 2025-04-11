

function useSearch(data, query, ...filters) {
    const debouncedQuery = useDebounce(query, 300);

    return React.useMemo(() => {
        const dataArray = Array.isArray(data) ? data : [data];

        try {
            // Apply each filter function in sequence
            return filters.reduce(
                (acc, feature) => feature(acc, debouncedQuery),
                dataArray
            );
        } catch (error) {
            console.error("Error applying search features:", error);
            return dataArray;
        }
    }, [data, debouncedQuery, filters]);
}
// https://www.freecodecamp.org/news/how-to-build-a-reusable-usesearch-hook-in-react/?ref=dailydev


import React from "react";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debouncedValue;
}