import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to handle API requests
const fetchData = async ({ queryKey }) => {
   const [_key, url] = queryKey;
   const { data } = await axios.get(url);
   return data;
};

export function useApiQuery(key, url, options = {}) {
   return useQuery({
      queryKey: [key, url],
      queryFn: fetchData,
      ...options,
   });
}

export function useApiMutation(method, url, options = {}) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (payload) => {
         const { data } = await axios({
            method,
            url,
            data: payload,
         });
         return data;
      },
      onSuccess: () => {
         // Invalidate and refetch if applicable
         if (options.invalidateKey) {
            queryClient.invalidateQueries({ queryKey: options.invalidateKey });
         }
      },
      ...options,
   });
}



// Usage in a component
const { data, isLoading, isError } = useApiQuery('fetchData', 'https://api.example.com/data', {
   staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
});

const postMutation = useApiMutation('post', 'https://api.example.com/data', {
   invalidateKey: ['fetchData'],
   onSuccess: () => console.log('Data posted successfully!'),
});
