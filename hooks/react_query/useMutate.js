// useApi.js
import {
   useQuery,
   useMutation
} from '@tanstack/react-query'

// const API_URL = 'https://your-api-endpoint.com';

// Define your API functions
// const fetchData = async (path) => {
//    try {
//       const response = await fetch(path)
//       if (!response.ok) {
//          throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data;
//    } catch (error) {
//       throw new Error(`Error On FetchData ${error}`)
//    }
// };

const fetchData = async (path) => {
   try {
      const response = await fetch(path);
      if (!response.ok) {
         throw new Error(`Request failed with status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
         const data = await response.json();
         return data;
      } else {
         throw new Error('Response is not in JSON format');
      }
   } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
   }
};
const postData = async (path, data) => {
   const response = await fetch(path, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   });

   if (!response.ok) {
      throw new Error('Network response was not ok');
   }

   return response.json();
};

const putData = async (path, data) => {
   const response = await fetch(path, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   });

   if (!response.ok) {
      throw new Error('Network response was not ok');
   }

   return response.json();
};

// Define your custom hook
export function useMutate() {
   // GET operation using React Query
   const getQuery = useQuery({
      queryKey: ['getData'], queryFn: fetchData
   });

   // POST operation using React Query
   const postMutation = useMutation(postData);

   // PUT operation using React Query
   const putMutation = useMutation(putData);

   // Custom update function
   const updateData = async (path, data) => {
      await putData(path, data);
      // Optionally, you can invalidate the relevant query here
      getQuery.refetch();
   };

   return {
      getData: getQuery.data,
      isLoading: getQuery.isLoading || postMutation.isLoading || putMutation.isLoading,
      isError: getQuery.isError || postMutation.isError || putMutation.isError,
      error: getQuery.error || postMutation.error || putMutation.error,
      fetchData: getQuery.refetch,
      postData: postMutation.mutate,
      putData: putMutation.mutate,
      updateData,
   };
}
