// src/services/SpotifyService.ts
import axios from "axios";
import { API_BASE_URL } from "../config/config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMe = async (userId: string) => {
  try {
    const response = await apiClient.get(`/spotify/user/${userId}/me`);
    return response.data;
  } catch (error) {
    console.log(error, "Error fetching user");
  }
};

// Add similar functions for other API routes here
