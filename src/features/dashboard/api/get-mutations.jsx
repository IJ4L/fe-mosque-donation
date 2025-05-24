import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config/env";

const fetchMutations = async ({ page = 1, limit = 10 }) => {
  const response = await axios.get(
    `${API_URL}/mutations?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const useMutations = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["mutations", page, limit],
    queryFn: () => fetchMutations({ page, limit }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};
