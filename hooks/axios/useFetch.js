import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import Swal from "sweetalert2";


const useFetch = (url) => {
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);

   const app = useAppBridge();

    const fetchdata = () => {
        try {
            setLoading(true);
            getSessionToken(app)
                .then(async (token) => {
                    const res = await axios.get(url, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    })
                    setResponse(res.data);
                })
                .catch((error) => {
                    console.log("then catch", error);
                    setError(true);
                });
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error on fetch the data",
                text: error,
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });
            setError(true);
        }
        setLoading(false);
    };



    useEffect(() => {
        fetchdata();
    }, [url]);
   // for debug the data in custom hooks
   useDebugValue(response ?? 'loading.....');
   return [response, loading, error];
}

export default useFetch;
