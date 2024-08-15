import { useQuery, useMutation } from "react-query";
import axios from "axios";

// Function to handle API requests
const fetchData = async ({ queryKey }) => {
   const [_, url] = queryKey;
   const { data } = await axios.get(url);
   return data;
};

export function useApiQuery(key, url) {
   return useQuery([key, url], fetchData);
}

export function useApiMutation(method, url) {
   return useMutation(async (payload) => {
      const { data } = await axios({
         method,
         url,
         data: payload,
      });
      return data;
   });
}












// Usages

import React from "react";
import { useApiQuery, useApiMutation } from "./useApi"; // Import your custom hooks

const MyComponent = () => {
   // GET request using useApiQuery
   const { data, error, isLoading } = useApiQuery("fetchData", "https://api.example.com/data");

   // POST request using useApiMutation
   const postMutation = useApiMutation("post", "https://api.example.com/data");

   // PATCH request using useApiMutation
   const patchMutation = useApiMutation("patch", "https://api.example.com/data/1");

   // PUT request using useApiMutation
   const putMutation = useApiMutation("put", "https://api.example.com/data/1");

   // Handle form submission (POST request)
   const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
         name: "Example",
         description: "This is an example description.",
      };
      postMutation.mutate(payload);
   };

   // Handle data update (PATCH request)
   const handleUpdate = () => {
      const payload = { description: "Updated description." };
      patchMutation.mutate(payload);
   };

   // Handle data replacement (PUT request)
   const handleReplace = () => {
      const payload = {
         name: "Replaced Example",
         description: "This replaces the old data.",
      };
      putMutation.mutate(payload);
   };

   return (
      <div>
         <h1>Data from API</h1>
         {isLoading && <p>Loading...</p>}
         {error && <p>Error: {error.message}</p>}
         {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

         <form onSubmit={handleSubmit}>
            <button type="submit" disabled={postMutation.isLoading}>
               Submit Data
            </button>
         </form>

         <button onClick={handleUpdate} disabled={patchMutation.isLoading}>
            Update Data
         </button>

         <button onClick={handleReplace} disabled={putMutation.isLoading}>
            Replace Data
         </button>
      </div>
   );
};

export default MyComponent;

