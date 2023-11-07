import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";


const useFetch = (url) => {
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);

   const app = useAppBridge();

    const fetchdata = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setResponse(response.data);
        }
        catch (error) {
            console.log(error);
        }
        setError(true);
        }
    setLoading(false);
};



// mount the request
useEffect(() => {
    fetchdata();
}, [url]);


// reFetch the request
const reFetch = async () => {
    setLoading(true);
    try {
        const res = await axios.get(url);
        setData(res.data);
    } catch (err) {
        console.log(err);
        setError(err);
    }
    setLoading(false);
};

   // for debug the data in custom hooks
   useDebugValue(response ?? 'loading.....');
return { response, loading, error, reFetch }



export default useFetch;
