import { useDebugValue } from "react";
import {
   useQuery,
} from '@tanstack/react-query'

const useFetch = (id, url) => {
   const fetch_data = async () => {
      try {
         const response = await fetch(url);
         return response.json();
      } catch (error) {
         throw new Error(error)
      }

   }

   const { data, isPending, isError, error, refetch } = useQuery({
      queryKey: id,
      queryFn: fetch_data,
      enabled: false
   })


   // for debug the data in custom hooks
   useDebugValue(data ?? 'loading.....');
   return { data, isPending, isError, error, refetch };
}

export default useFetch;
