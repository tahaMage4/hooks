import { useState, useEffect } from "react";
import axios from "axios";


function useApi() {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   // Store the Axios cancel token source for each request
   const cancelTokenSource = axios.CancelToken.source();
   const get = async (url) => {
      try {
         setLoading(true);
         const response = await axios.get(url, { cancelToken: cancelTokenSource.token });
         setData(response.data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
   };

   const post = async (url, payload) => {
      try {
         setLoading(true);
         const response = await axios.post(url, payload, { cancelToken: cancelTokenSource.token });
         setData(response.data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
   };

   const put = async (url, payload) => {
      try {
         setLoading(true);
         const response = await axios.put(url, payload, { cancelToken: cancelTokenSource.token });
         setData(response.data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
   };

   const update = async (url, payload) => {
      try {
         setLoading(true);
         const response = await axios.patch(url, payload, { cancelToken: cancelTokenSource.token });
         setData(response.data);
         setLoading(false);
      } catch (error) {
         if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
         } else {
            setError(error);
            setLoading(false);
         }
      }
   };

   useEffect(() => {
      // You can add any cleanup logic here
      return () => {
         cancelTokenSource.cancel("Component unmounted");
      };
   }, []);

   return { data, error, loading, get, post, put, update };
}

export default useApi;
