import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const useFetch = (url) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const fetchdata = async () => {
        try {
            setLoading(true);
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            setData(response?.data);
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                text: error,
            });
            setError(true);
        }
        setLoading(false);
    };



    useEffect(() => {
        fetchdata();
    }, [url]);
    // for debug the data in custom hooks
    useDebugValue(data ?? 'loading.....');
    return { data, loading, error };
}

export default useFetch;
