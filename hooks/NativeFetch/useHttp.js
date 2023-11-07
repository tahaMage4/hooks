// Fetching the GET && POST Request

import { useCallback, useState } from "react";
// import axios from "axios";


const useHttp = (requstConfig, applydata) => {
// console.log(applydata);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);


   const sendRequest = useCallback(async () => {
      try {
         setLoading(true);
         const { url, method, headers, body } = requstConfig;

         const response = await fetch(url, {
            method: method ?? 'GET',
            headers: headers ?? {},
            body: body ? JSON.stringify(body) : null
         });
         if (!response.ok) {
            throw new Error("request Filed")
         }
         const data = await response.json();
         console.log("Product Data", data);
         applydata(data)

         // setResponse(res.data);
         // setResponse(taskData)
      }
      catch (error) {
         setError(true);
         throw new Error(error);
      }
      setLoading(false);
   }, [requstConfig, applydata])

   return { loading, error, sendRequest };
}

export default useHttp;


// Use in compontent

// Get
const { loading, error, sendRequest } = useHttp({
   url: 'your-get-url',
   method: 'GET',
}, yourDataHandlerFunction);
sendRequest();


// post

const { loading, error, sendRequest } = useHttp({
   url: 'your-post-url',
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer',
   },
   body: { /* your request body data */ },
}, yourDataHandlerFunction);
sendRequest();

// or
// For a POST request:
const { loading, error, sendRequest } = useHttp();
sendRequest({
   url: 'your-post-url',
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer',
   },
   body: { /* your request body data */ },
   onSuccess: (data) => {
      // Handle successful response data
   },
   onError: (errorMessage) => {
      // Handle errors
   },
});

