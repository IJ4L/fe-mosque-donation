import { API_URL } from "@/config/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      try {
        console.log(`useUpdateNews - Updating news with ID: ${id}`);

        console.log("FormData entries before sending to server:");
        for (let pair of formData.entries()) {
          if (pair[1] instanceof File) {
            console.log(
              `${pair[0]}: File(${pair[1].name}, ${pair[1].size} bytes, ${pair[1].type})`
            );
          } else {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        }

        const response = await axios.patch(
          `${API_URL}/news/${id}`,
          formData,
          {
            headers: {},
            transformRequest: [(data) => data],
          }
        );

        console.log("useUpdateNews - Response received:", response.data);
        return response.data;
      } catch (error) {
        console.error("useUpdateNews - Error occurred:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log(
        `useUpdateNews - Success, invalidating queries for ID: ${variables.id}`
      );
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news", variables.id] });
    },
  });
}
