// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import Cookies from "universal-cookie";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: 'https://asm-3-be.vercel.app/',
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  console.log('accessToken', accessToken);

  if (accessToken) {
    config.headers["authorization"] = "Bearer " + accessToken;
  }

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
