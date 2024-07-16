import { useDebugValue } from "react";
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";

export const usePost = (url) => {
   const app = useAppBridge();
   const queryClient = useQueryClient();

   const post_data = async (postData) => {
      try {
         const token = await getSessionToken(app);
         const response = await axios.post(url, postData, {
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + token,
            },
         });
         return response?.data;
      } catch (error) {
         console.log(error?.message);
      }
   };

   const { mutate, data, isError, isLoading, error } = useMutation(post_data, {
      onSuccess: () => {
         queryClient.invalidateQueries(); // Invalidate all queries to refetch after a successful post
      },
      onError: (error) => {
         console.error('Post request failed:', error);
      },
      retry: 3,
      retryDelay: 5000, // Will always wait 5s to retry, regardless of how many retries
   });

   // for debug the data in custom hooks
   useDebugValue(data ?? 'loading.....');

   return { mutate, data, isError, isLoading, error };
};



// use in compontent
const { mutate, data, isError, isLoading, error } = usePost("https://your-api-url.com");
const handleFormBuilder = (event) => {
   event.preventDefault();
   const postData = {
      formState: formState,
   };
   mutate(postData);
   Swal.fire({
      icon: "success",
      title: "Success...",
      text: data,
   });
};