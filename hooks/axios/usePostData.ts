"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const usePostData = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<null>(null);
	const [error, setError] = useState<null>(null);
	const [retryCount, setRetryCount] = useState<number>(0);

	// Optional: Set the maximum number of retries
	const maxRetries = 3;

	const postData = useCallback(
		async (url: string, postdata: any) => {
			setIsLoading(true);
			setError(null);

			try {
				// Perform the API call using Axios or Fetch
				const response = await axios.post(url, postdata);

				// Handle the response as needed
				setData(response.data);
				Swal.fire({
					icon: "success",
					title: "Success...",
					text: response.data,
				});
				setIsLoading(false);
			} catch (error: any) {
				if (retryCount < maxRetries) {
					// Retry the API call if maxRetries is not exceeded
					setRetryCount((prevRetryCount) => prevRetryCount + 1);
				} else {
					// Set the error if maxRetries is exceeded
					setError(error);
					setIsLoading(false);
					Swal.fire({
						icon: "error",
						title: "Configration",
						text: error,
					});
				}
			}
		},
		[retryCount]
	);

	// Retry the API call when retryCount changes
	// useEffect(() => {
	// 	if (retryCount > 0) {
	// 		postData(); //'/api/endpoint', formData url, postData
	// 	}
	// }, [retryCount, postData]);

	return { postData, isLoading, data, error };
};

export default usePostData;

// Compontent Code

// const [postData, isLoading, data, error] = usePostData();

// const handleSubmit = (e) => {
//     e.preventDefault();
//     postData('/api/endpoint', formData);
// };

// { isLoading && <p>Loading...</p> }
// { data && <p>Success! Response: {JSON.stringify(data)}</p> }
// { error && <p>Error: {error.message}</p> }
