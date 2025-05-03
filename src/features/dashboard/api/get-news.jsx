// src/features/news/hooks/useNews.js
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
