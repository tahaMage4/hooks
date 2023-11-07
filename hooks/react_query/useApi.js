import { useQuery, useMutation, useQueryClient } from 'react-query';

const API_BASE_URL = 'https://your-api-url.com'; // Replace with your API URL

export function useApi() {
   const queryClient = useQueryClient();

   // GET request
   const get = (key, url) => {
      return useQuery(key, async () => {
         const response = await fetch(`${API_BASE_URL}${url}`);
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return response.json();
      });
   };

   // POST request
   const post = (url) => {
      return useMutation((data) =>
         fetch(`${API_BASE_URL}${url}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         })
      );
   };

   // PUT request
   const put = (url) => {
      return useMutation((data) =>
         fetch(`${API_BASE_URL}${url}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         })
      );
   };

   // Update data in cache
   const updateDataInCache = (key, newData) => {
      queryClient.setQueryData(key, newData);
   };

   return {
      get,
      post,
      put,
      updateDataInCache,
   };
}
