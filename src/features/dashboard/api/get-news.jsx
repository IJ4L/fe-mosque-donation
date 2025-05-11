import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:9999/news");
      return response.data;
    },
  });
}

export function useNewsById(id) {
  return useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      if (!id || id === "undefined" || id === "null") {
        return null;
      }

      try {
        const response = await axios.get(`http://localhost:9999/news/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!id && id !== "undefined" && id !== "null",
    refetchOnWindowFocus: false,
  });
}
