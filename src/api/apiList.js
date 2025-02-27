import axios from "axios";

// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = process.env.REACT_APP_BASE_URL_LOCAL;

const handleCatch = (error) => {
  if (!error.response) {
    //   console.error("Network error:", error.message);
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }

  if (error.response.status >= 400 && error.response.status < 500) {
    //   console.warn(
    //     `Client error (${error.response.status}):`,
    //     error.response.data
    //   );
    return {
      success: false,
      message: "Client error. Please check the request.",
      error: error.response.data,
    };
  }

  if (error.response.status >= 500) {
    //   console.error(
    //     `Server error (${error.response.status}):`,
    //     error.response.data
    //   );
    return {
      success: false,
      message: "Server error. Try again later.",
      error: error.response.data,
    };
  }

  // console.error("Unexpected error:", error.message);
  return {
    success: false,
    message: "An unexpected error occurred.",
    error: error.message,
  };
};

export const fetchCategoryLength = async () => {
  try {
    const response = await axios.get(baseUrl);
    const res = response.data;
    return res;
  } catch (err) {
    handleCatch(err);
  }
};

export const fetchCategoriesList = async (paramsObj) => {
  try {
    const response = await axios.get(baseUrl, {
      params: paramsObj,
    });
    const res = response?.data?.categories;
    return res;
  } catch (err) {
    handleCatch(err);
  } finally {
  }
};

export const fetchUser = async (obj) => {
  try {
    const user = await axios.get(baseUrl + "login", {
      params: obj,
      //   timeout: 5000,
    });
    return user;
    // if (!user.data || !user.data.length) {
    //   console.warn("Warning: Empty response received.");
    //   return { success: false, message: "No such user found.", data: [] };
    // }
    // return { success: true, data: user.data };
  } catch (err) {
    handleCatch(err);
  }
};
