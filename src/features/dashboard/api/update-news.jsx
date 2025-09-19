import { API_URL } from "@/config/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      try {
        if (!formData || !(formData instanceof FormData)) {
          throw new Error("Invalid form data");
        }

        let hasNewsName = false;
        let hasNewsDescription = false;
        let hasImage = false;
        let imageFile = null;

        console.log("FormData entries:");
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1] instanceof File ? "File" : pair[1]);

          if (
            pair[0] === "newsName" &&
            pair[1] &&
            pair[1].toString().trim() !== ""
          ) {
            hasNewsName = true;
          }
          if (
            pair[0] === "newsDescription" &&
            pair[1] &&
            pair[1].toString().trim() !== ""
          ) {
            hasNewsDescription = true;
          }
          if (
            pair[0] === "newsImage" &&
            pair[1] instanceof File &&
            pair[1].size > 0
          ) {
            hasImage = true;
            imageFile = pair[1];
          }
        }

        if (!hasNewsName) {
          throw new Error("News title is required");
        }

        if (!hasNewsDescription) {
          throw new Error("News description is required");
        }

        if (hasImage && imageFile) {
          const validTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/gif",
            "image/webp",
          ];

          if (!validTypes.includes(imageFile.type)) {
            throw new Error(
              "Invalid image format. Please use JPEG, PNG, JPG, GIF, or WEBP format."
            );
          }

          const maxSize = 5 * 1024 * 1024; // 5MB in bytes
          if (imageFile.size > maxSize) {
            throw new Error("Image size exceeds the 5MB limit.");
          }
        }

        const formDataEntries = Array.from(formData.entries());
        if (formDataEntries.length === 0) {
          throw new Error("No data to update");
        }

        const response = await axios.patch(`${API_URL}/news/${id}`, formData, {
          headers: {
          },
          transformRequest: [(data) => data],
        });

        return response.data;
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;
          const errorMessage =
            error.response.data?.message || "Server error occurred";

          switch (statusCode) {
            case 400:
              throw new Error(`Invalid request body: ${errorMessage}`);
            case 401:
            case 403:
              throw new Error(
                "You are not authorized to update this news item"
              );
            case 404:
              throw new Error("News item not found");
            case 413:
              throw new Error(
                "File size too large. Please upload a smaller image (max 5MB)"
              );
            case 415:
              throw new Error(
                "Unsupported file type. Please use JPEG, PNG, JPG, GIF, or WEBP format"
              );
            case 422:
              throw new Error(`Validation error: ${errorMessage}`);
            default:
              throw new Error(`Server error (${statusCode}): ${errorMessage}`);
          }
        }
        console.error("Update news error:", error);
        throw new Error(
          error.message || "Failed to update news. Please try again."
        );
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news", variables.id] });
      return {
        success: true,
        message: "News updated successfully",
        data: data,
      };
    },
    onError: (error) => {
      console.error("Update news error:", error);
      return {
        success: false,
        message: error.message || "Failed to update news",
        error: error,
      };
    },
  });
}
