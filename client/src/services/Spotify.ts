import axios from "axios";
import { API_BASE_URL } from "../config/config";
import {
  AlbumsResponse,
  SavedTracksResponse,
  FollowedArtistsResponse,
  UserResponse,
  PlaylistResponse,
} from "../interfaces/Spotify";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMe = async (userId: string) => {
  try {
    const response = await apiClient.get(`/spotify/user/${userId}/me`);
    return response.data as UserResponse;
  } catch (error) {
    console.log(error, "Error fetching user");
  }
};

export const getPlaylists = async (userId: string, limit = 20, offset = 0) => {
  try {
    const response = await apiClient.get(`/spotify/user/${userId}/playlists`, {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    return response.data as PlaylistResponse;
  } catch (error) {
    console.log(error, "Error fetching playlists");
  }
};

export const getSavedTracks = async (
  userId: string,
  limit = 20,
  offset = 0
) => {
  try {
    const response = await apiClient.get(
      `spotify/user/${userId}/savedTracks/`,
      {
        params: {
          limit: limit,
          offset: offset,
        },
      }
    );
    return response.data as SavedTracksResponse;
  } catch (error) {
    console.log(error, "Error fetching saved tracks");
  }
};

export const getSavedAlbums = async (
  userId: string,
  limit = 20,
  offset = 0
) => {
  try {
    const response = await apiClient.get(
      `spotify/user/${userId}/savedAlbums/`,
      {
        params: {
          limit: limit,
          offset: offset,
        },
      }
    );
    return response.data as AlbumsResponse;
  } catch (error) {
    console.log(error, "Error fetching saved albums");
  }
};

export const getSavedArtists = async (
  userId: string,
  limit = 20,
  offset = 0
) => {
  try {
    const response = await apiClient.get(
      `spotify/user/${userId}/savedArtists/`,
      {
        params: {
          limit: limit,
          offset: offset,
        },
      }
    );
    return response.data as FollowedArtistsResponse;
  } catch (error) {
    console.log(error, "Error fetching saved artists");
  }
};
