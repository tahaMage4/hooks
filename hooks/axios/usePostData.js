// usePostData.js
import { useCallback, useDebugValue, useEffect, useState } from 'react';
import axios from 'axios'; // You may need to install Axios using npm or yarn
import Swal from 'sweetalert2';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';

const usePostData = () => {
    const [postResponse, setPostResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const app = useAppBridge();

    const maxRetries = 3
    const postData = useCallback((url, data) => {
        try {
            setIsLoading(true);
            setError(false);

            getSessionToken(app)
                .then(async (token) => {
                    const response = await axios.post(url, { data },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + token,
                            },
                        }
                    );
                    setPostResponse(response.data);
                    Swal.fire({
                        icon: "success",
                        title: "Success...",
                        text: response.data,
                    })
                }).catch((error) => {
                    if (retryCount < maxRetries) {
                        // Retry the API call if maxRetries is not exceeded
                        setRetryCount((prevRetryCount) => prevRetryCount + 1);
                    } else {
                        // Set the error if maxRetries is exceeded
                        setError(true);
                        setIsLoading(false);
                    }
                    console.error("then catch Post Hook", error);
                    // setError(true);
                });


        } catch (error) {
            setIsLoading(false);
            setError(true);
            Swal.fire({
                icon: "error",
                title: "Configration",
                text: error,
            });
        }
        setIsLoading(false);
    }, [retryCount])

    // Retry the API call when retryCount changes
    useEffect(() => {
        postData();
        if (retryCount > 0) {
            postData();
        }
    }, [retryCount, postData]);

    // useEffect(() => {
    //     postData();
    // }, [url, data]);

    // for debug the data in custom hooks
    useDebugValue(postData ?? 'loading.....');

    return [postData, isLoading, postResponse, error];
};

export default usePostData;




