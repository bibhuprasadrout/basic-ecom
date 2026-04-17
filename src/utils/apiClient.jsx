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
 * Executes an API request using the configured axios instance.
 * @param {Object} options - The request configuration object.
 *  @param {('get'|'post'|'put'|'patch'|'delete')} options.method - The HTTP method to use.
 *  @param {string} options.url - The endpoint path (relative to BASE_URL).
 *  @param {Object} [options.data=null] - The request body for POST/PUT/PATCH requests.
 *  @param {Object} [options.params=null] - Query parameters to be appended to the URL.
 *  @param {boolean} [options.withCredentials=true] - Whether to include cookies in the request.
 * @returns {Promise<{data: any, error: (string|null)}>} An object containing the response data or an error message.
 */

const request = async ({
  method,
  url,
  data = null,
  params = null,
  withCredentials = true,
}) => {
  try {
    const config = {
      method: method.toLowerCase(),
      url,
      withCredentials,
    };

    // * IMPORTANT: Always only send data or paramas if they are not null( infor that is needed/ wanted ), otherwise you might send an empty body or unwanted query string which can cause backend errors or unexpected behavior.
    if (data !== null) {
      config.data = data;
    }

    if (params !== null) {
      config.params = params;
    }

    const response = await apiClient(config);

    return { data: response.data, error: null };
  } catch (error) {
    const message = error.response?.data?.message || "An error occurred";
    return { data: null, error: message };
  }
};

export default request;
