import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function usePostNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      console.log("usePostNews - Sending request with FormData");

      // Debug the FormData content
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(
            `FormData contains ${pair[0]}: File(${pair[1].name}, ${pair[1].size} bytes, ${pair[1].type})`
          );
        } else {
          console.log(`FormData contains ${pair[0]}: ${pair[1]}`);
        }
      } // IMPORTANT: DO NOT SET Content-Type for FormData - browser will set it with correct boundary
      const response = await axios.post(
        "http://localhost:9999/news",
        formData,
        {
          headers: {
            // Let browser set this automatically for proper multipart boundaries
            // "Content-Type": "multipart/form-data",
          },
          transformRequest: [(data) => data], // Keep the data as is, no transforms
        }
      );

      console.log("usePostNews - Response received:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("usePostNews - Success, invalidating queries");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (error) => {
      console.error("usePostNews - Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    },
  });
}
