// src/api/apiClient.js
import axios from "axios";

// JSON Server ishlaydigan portni yozamiz (masalan, 3004)
const apiClient = axios.create({
  baseURL: "http://localhost:3004", 
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient };