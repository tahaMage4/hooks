import React from 'react';
import { useApi } from './useApi'; // Import your custom hook

function MyComponent() {
   const api = useApi();

   const fetchUserData = api.get('user', '/user');
   const addUser = api.post('/user');
   const updateUser = api.put('/user');

   const handleAddUser = async (userData) => {
      const newUserData = await addUser.mutateAsync(userData);
      // Optionally, update the data in cache
      api.updateDataInCache('user', newUserData);
   };

   const handleUpdateUser = async (updatedData) => {
      const updatedUserData = await updateUser.mutateAsync(updatedData);
      // Optionally, update the data in cache
      api.updateDataInCache('user', updatedUserData);
   };

   if (fetchUserData.isLoading) {
      return 'Loading...';
   }

   if (fetchUserData.isError) {
      return 'Error loading user data';
   }

   return (
      <div>
         <h1>User Data</h1>
         <pre>{JSON.stringify(fetchUserData.data, null, 2)}</pre>
         <button onClick={() => handleAddUser({ name: 'New User' })}>Add User</button>
         <button onClick={() => handleUpdateUser({ id: 1, name: 'Updated User' })}>Update User</button>
      </div>
   );
}

export default MyComponent;



// Axios Example
import React, { useEffect } from "react";
import useApi from "./useApi";

function DTA() {
   const { data, error, loading, get, post } = useApi();

   useEffect(() => {
      // Fetch data when the component mounts
      get("https://api.example.com/data");
   }, []);

   const handlePost = async () => {
      const postData = {
         // Your post data here
         value: "test_data"
      };

      try {
         // Make a POST request
         await post("https://api.example.com/create", postData);
         // After a successful post, you might want to fetch data again or update the UI
      } catch (error) {
         // Handle any errors from the post request
         console.error("Post request error:", error);
      }
   };

   return (
      <div>
         {loading && <p>Loading...</p>}
         {error && <p>Error: {error.message}</p>}
         {data && (
            <div>
               <h2>Data:</h2>
               <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
         )}
         <button onClick={handlePost}>Make a POST Request</button>
      </div>
   );
}

export default DTA;
