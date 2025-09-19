import { API_URL } from "@/config/env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetch latest news for landing page
 * @param {number} limit - Number of news items to retrieve
 * @returns {Promise<Array>} - List of news items
 */
export const fetchNews = async (limit = 4) => {
  try {
    const response = await axios.get(`${API_URL}/news?page=1&limit=${limit}`);

    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Unexpected news response structure");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Custom hook for fetching news for landing page
 * @param {number} limit - Number of news items to retrieve
 * @returns {Object} - Query object with news data
 */
export const useNewsLanding = (limit = 4) => {
  return useQuery({
    queryKey: ["newsLanding", limit],
    queryFn: () => fetchNews(limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    onError: (error) => {},
  });
};

export default {
  fetchNews,
  useNewsLanding,
};
