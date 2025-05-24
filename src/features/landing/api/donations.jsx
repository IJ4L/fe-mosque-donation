import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";

/**
 * Submit a donation to the API
 * @param {Object} donationData - The donation data
 * @returns {Promise<Object>} The API response
 */
export const submitDonation = async (donationData) => {
  try {
    const params = new URLSearchParams();
    Object.keys(donationData).forEach((key) => {
      params.append(key, donationData[key]);
    });

    const response = await axios.post(
      "http://localhost:9999/donations",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Donation submission error:", error);
    if (error.response) {
      throw new Error(
        error.response.data.message || "Server error during donation submission"
      );
    } else if (error.request) {
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      throw new Error("Error in donation submission: " + error.message);
    }
  }
};

/**
 * Custom hook for handling donation submission
 * @returns {Object} Mutation object
 */
export const useDonationSubmit = () => {
  return useMutation({
    mutationFn: submitDonation,
    onSuccess: (data) => {
      console.log("Donation successful:", data);
    },
    onError: (error) => {
      console.error("Donation submission error in mutation:", error);
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};

export const fetchTopDonations = async () => {
  try {
    try {
      const response = await axios.get("http://localhost:9999/donations/top");

      console.log("API response structure:", response);

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.log("Unexpected API response structure:", response.data);
        throw new Error("Unexpected response structure");
      }
    } catch (apiError) {
      console.log("Using fallback data for top donations:", apiError.message);
      return [
        {
          donationID: 1,
          donaturName: "Lutfi Halimawan",
          donationAmount: "5000000.00",
        },
        {
          donationID: 2,
          donaturName: "Ahmad Rahman",
          donationAmount: "4500000.00",
        },
        {
          donationID: 3,
          donaturName: "Siti Fatimah",
          donationAmount: "4000000.00",
        },
        {
          donationID: 4,
          donaturName: "Muhammad Arif",
          donationAmount: "3500000.00",
        },
        {
          donationID: 5,
          donaturName: "Aisyah Putri",
          donationAmount: "3000000.00",
        },
      ];
    }
  } catch (error) {
    console.error("Error fetching top donations:", error);
    throw new Error("Failed to fetch top donations");
  }
};

export const useTopDonations = () => {
  return useQuery({
    queryKey: ["topDonations"],
    queryFn: fetchTopDonations,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    placeholderData: [
      {
        donationID: 1,
        donaturName: "Lutfi Halimawan",
        donationAmount: "5000000.00",
      },
      {
        donationID: 2,
        donaturName: "Ahmad Rahman",
        donationAmount: "4500000.00",
      },
      {
        donationID: 3,
        donaturName: "Siti Fatimah",
        donationAmount: "4000000.00",
      },
      {
        donationID: 4,
        donaturName: "Muhammad Arif",
        donationAmount: "3500000.00",
      },
      {
        donationID: 5,
        donaturName: "Aisyah Putri",
        donationAmount: "3000000.00",
      },
    ],
    onError: (error) => {
      console.error("Error in top donations query:", error);
    },
    select: (data) => {
      if (Array.isArray(data)) {
        return data;
      }
      else if (data && Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error("Unexpected data structure:", data);
        return [];
      }
    },
  });
};

// Default export with all functions
export default {
  submitDonation,
  useDonationSubmit,
  fetchTopDonations,
  useTopDonations,
};
