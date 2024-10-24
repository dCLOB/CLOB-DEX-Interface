import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const REFETCH_INTERVAL = 60 * 1000 * 5; // 5min
