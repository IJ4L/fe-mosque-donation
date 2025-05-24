import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetch latest news for landing page
 * @param {number} limit - Number of news items to retrieve
 * @returns {Promise<Array>} - List of news items
 */
export const fetchNews = async (limit = 4) => {
  try {
    const response = await axios.get(
      `http://localhost:9999/news?page=1&limit=${limit}`
    );

    console.log("News API response:", response.data);

    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.log("Unexpected news API response structure:", response.data);
      throw new Error("Unexpected news response structure");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return [
      {
        newsID: 1,
        newsImage: "/images/default-news-1.jpg",
        newsName: "A Miracle Of The Qur'an: Mother's Milk",
        newsDescription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, similique quas voluptatum, possimus a reiciendis porro, consequuntur corporis aperiam iste molestias!",
        createdAt: "2025-07-07T12:00:00.000Z",
        updatedAt: "2025-07-07T12:00:00.000Z",
      },
      {
        newsID: 2,
        newsImage: "/images/default-news-2.jpg",
        newsName: "The Importance of Ramadan",
        newsDescription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
        createdAt: "2025-04-14T12:00:00.000Z",
        updatedAt: "2025-04-14T12:00:00.000Z",
      },
      {
        newsID: 3,
        newsImage: "/images/default-news-3.jpg",
        newsName: "Community Service Event",
        newsDescription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
        createdAt: "2025-03-20T12:00:00.000Z",
        updatedAt: "2025-03-20T12:00:00.000Z",
      },
      {
        newsID: 4,
        newsImage: "/images/default-news-4.jpg",
        newsName: "New Mosque Expansion Project",
        newsDescription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
        createdAt: "2025-02-15T12:00:00.000Z",
        updatedAt: "2025-02-15T12:00:00.000Z",
      },
    ];
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
    onError: (error) => {
      console.error("Error in news landing query:", error);
    },
  });
};

export default {
  fetchNews,
  useNewsLanding,
};
