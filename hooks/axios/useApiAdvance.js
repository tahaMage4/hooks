import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useApi() {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   // Store the Axios cancel token source for each request
   const cancelTokenSource = axios.CancelToken.source();

   // Generic request function
   const request = useCallback(async (method, url, payload = null) => {
      try {
         setLoading(true);
         const response = await axios({
            method,
            url,
            data: payload,
            cancelToken: cancelTokenSource.token,
         });
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
   }, [cancelTokenSource.token]);

   // Define methods for convenience
   const get = useCallback((url) => request("get", url), [request]);
   const post = useCallback((url, payload) => request("post", url, payload), [request]);
   const put = useCallback((url, payload) => request("put", url, payload), [request]);
   const update = useCallback((url, payload) => request("patch", url, payload), [request]);

   useEffect(() => {
      // Cleanup on unmount
      return () => {
         cancelTokenSource.cancel("Component unmounted");
      };
   }, [cancelTokenSource]);

   return { data, error, loading, get, post, put, update };
}

export default useApi;


// Usage


import React, { useEffect } from "react";
import useApi from "./useApi"; // Import your custom hook

const MyComponent = () => {
   const { data, error, loading, get, post, put, update } = useApi();

   // Fetch data when the component mounts
   useEffect(() => {
      get("https://api.example.com/data");
   }, [get]);

   // Example function to handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = {
         name: "Example",
         description: "This is an example description.",
      };
      await post("https://api.example.com/data", payload);
   };

   // Example function to update data
   const handleUpdate = async () => {
      const payload = {
         description: "Updated description.",
      };
      await update("https://api.example.com/data/1", payload);
   };

   // Example function to put (replace) data
   const handleReplace = async () => {
      const payload = {
         name: "Replaced Example",
         description: "This replaces the old data.",
      };
      await put("https://api.example.com/data/1", payload);
   };

   return (
      <div>
         <h1>Data from API</h1>
         {loading && <p>Loading...</p>}
         {error && <p>Error: {error.message}</p>}
         {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

         <form onSubmit={handleSubmit}>
            <button type="submit">Submit Data</button>
         </form>

         <button onClick={handleUpdate}>Update Data</button>
         <button onClick={handleReplace}>Replace Data</button>
      </div>
   );
};

export default MyComponent;

