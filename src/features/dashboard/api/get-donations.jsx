import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config/env";

const fetchDonations = async ({ page = 1, limit = 5 }) => {
  const response = await axios.get(
    `${API_URL}/donations?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const useDonations = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["donations", page, limit],
    queryFn: () => fetchDonations({ page, limit }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDonationById = (id) => {
  return useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axios.get(`${API_URL}/donations/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
