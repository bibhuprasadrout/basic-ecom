import axios from "axios";

// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = process.env.REACT_APP_BASE_URL_LOCAL;

const apiCall = async (endpont, method = "GET", data = null, params = {}) => {
  let res;
  try {
    const response = await axios({
      url: `${baseUrl}${endpont}`,
      method,
      headers: { "Content-Type": "application/json" },
      data,
      params,
    });
    res = response.data;
  } catch (error) {
    if (!error.response) {
      res = {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
    res = {
      success: false,
      message: error.response.data.message,
    };
  }
  return res;
};

const handleCatch = (error) => {
  if (!error.response) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
  return {
    success: false,
    message: error.response.data.message,
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

export const fetchUser = (credentials) =>
  apiCall("signin", "POST", credentials);