import { useDebugValue } from "react";
import { useQuery } from 'react-query'
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import Swal from "sweetalert2";

export const useGet = (id, url) => {
    const app = useAppBridge();
    const fetch_data = async () => {
        try {
            const token = await getSessionToken(app);
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            return response?.data;
        } catch (error) {
            // throw new Error(error)
            Swal.fire({
                icon: "error",
                title: "Error on fetch the data from the App",
                text: error,
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });
        }
    }

    const { data, isError, isPending, error, refetch } = useQuery(id, fetch_data, {
        staleTime: 2000,
        refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: 5000, // Will always wait 5s to retry, regardless of how many retries
    })


    // for debug the data in custom hooks
    useDebugValue(data ?? 'loading.....');
    return { data, isError, isPending, error, refetch };
}

