// src/API/axios.js
import { ACCESS_TOKEN } from "../Constant";
import axios from "axios";

// Create API instance
const API = axios.create({
  baseURL: process.env.API_BASE_URL || "http://api.finance.gyatva.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------- REQUEST INTERCEPTOR ----------
API.interceptors.request.use(
  (config) => {
    // Attach token automatically if exists
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---------- RESPONSE INTERCEPTOR ----------
API.interceptors.response.use(
  (response) => response, // pass successful responses

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized → redirecting to login");

      // Optional: clear token
      localStorage.clear();
      window.dispatchEvent(new Event("auth-changed"));

      // Optional: redirect
      window.location.href = "/login";
    }

    if (status === 500) {
      alert("Server error. Try again later.");
    }

    return Promise.reject(error);
  }
);

export default API;
