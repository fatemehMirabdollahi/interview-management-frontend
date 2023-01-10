import axios from "axios";
import { revokeAccess } from "./auth";

const instant = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api/" : "",
  timeout: 30 * 1000,
});

instant.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      revokeAccess();
    }
    return Promise.reject(error);
  }
);

export default instant;
