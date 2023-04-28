// src/config/config.ts
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8888/api";
export const SPOTIFY_AUTH_URL =
  process.env.REACT_APP_SPOTIFY_AUTH_URL ||
  "http://localhost:8888/api/auth/login";
