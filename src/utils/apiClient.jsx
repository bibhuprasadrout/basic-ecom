import axios from "axios"; // `axios` is an HTTP client used to call backend API.
import { BASE_URL } from "../config/Constants"; // `BASE_URL` is a constant that centralizes the API server address, an useful architecture to change environments (local, staging, prod) without rewriting every request.

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// // --- REQUEST INTERCEPTOR ---
// apiClient.interceptors.request.use(
//   (config) => {
//     // This runs BEFORE every request is sent.
//     // Use this if you need to add dynamic headers (like a timestamp or a token)
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // --- RESPONSE INTERCEPTOR ---
// apiClient.interceptors.response.use(
//   (response) => {
//     // Any status code within the range of 2xx triggers this function
//     return response;
//   },
//   (error) => {
//     // Any status codes outside the range of 2xx trigger this function

//     // Example: Global 401 (Unauthorized) handling
//     if (error.response?.status === 401) {
//       console.warn("Session expired. Redirecting to sign-in...");
//       // You could clear localStorage or trigger a logout here
//       // window.location.href = '/signin';
//     }

//     // Example: Render Backend is asleep (503 or timeout)
//     if (error.response?.status === 503 || error.code === "ECONNABORTED") {
//       console.error("Backend is waking up, please hold...");
//     }

//     return Promise.reject(error);
//   },
// );

/**
 * @param {String} method - 'get', 'post', 'put', 'patch', 'delete'
 * @param {String} url - The endpoint path
 * @param {Object} [data] - The request body (optional)
 * @param {Object} [params] - Query parameters (optional)
 */

const request = async (method, url, data = null, params = null) => {
  try {
    const response = await apiClient({
      method: method.toLowerCase(),
      url,
      data,
      params,
    });
    return { data: response.data, error: null };
  } catch (error) {
    const message = error.response?.data?.message || "An error occurred";
    return { data: null, error: message };
  }
};

export default request;
