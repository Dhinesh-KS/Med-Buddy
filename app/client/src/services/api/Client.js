import axios from "axios";
import { baseURL } from "../../constants/AppConstants";

const Client = axios.create({
  baseURL: baseURL,
});

Client.interceptors.request.use(
  (config) => {
    /*
     * Here you can add a header with a JWT token, ensuring it will be
     * sent with ALL your requests.
     */
    return config;
  },
  (error) => Promise.reject(error)
);

Client.interceptors.response.use(
  (response) => response,
  (error) => {
    /*
     * Here you can add a central error handling mechanism
     */
    return Promise.reject(error);
  }
);

// Exports Axios object to be used by the services
export default Client;