import { axiosInstance } from ".";

// Post the Ratings and Reviews
export const addRating = async (data) => {
  try {
    const response = await axiosInstance.post("/api/ratings/add-rating", data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

// Get the Ratings and Reviews
export const getRatings = async (bookId) => {
  try {
    const response = await axiosInstance.post(
      "/api/ratings/get-ratings",
      bookId
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};
