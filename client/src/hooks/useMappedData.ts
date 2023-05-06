import { useMemo } from "react";
import {
  FollowedArtistsResponse,
  PlaylistResponse,
  AlbumsResponse,
  SavedTracksResponse,
} from "../interfaces/Spotify";
import { UniversalItem } from "../interfaces/Data";

type DataType = "artists" | "playlists" | "albums" | "tracks";
// this should be done server side
const useMappedData = (
  data:
    | FollowedArtistsResponse
    | PlaylistResponse
    | AlbumsResponse
    | SavedTracksResponse
    | null,
  type: DataType
): { items: UniversalItem[]; total: number } => {
  return useMemo(() => {
    if (!data) return { items: [], total: 0 };
    switch (type) {
      case "artists":
        const artistsData = data as FollowedArtistsResponse;
        return {
          items:
            artistsData?.artists?.items?.map((item) => ({
              id: item?.id || "",
              name: item?.name || "",
              images: item?.images || [],
            })) || [],
          total: artistsData?.artists?.total || 0,
        };
      case "playlists":
        const playlistsData = data as PlaylistResponse;
        return {
          items:
            playlistsData?.items?.map((item) => ({
              id: item?.id || "",
              name: item?.name || "",
              images: item?.images || [],
            })) || [],
          total: playlistsData?.total || 0,
        };
      case "albums":
        const albumsData = data as AlbumsResponse;
        return {
          items:
            albumsData?.items?.map((item) => ({
              id: item?.album?.id || "",
              name: item?.album?.name || "",
              images: item?.album?.images || [],
            })) || [],
          total: albumsData?.total || 0,
        };
      case "tracks":
        const tracksData = data as SavedTracksResponse;
        return {
          items:
            tracksData?.items?.map((item) => ({
              id: item?.track?.id || "",
              name: item?.track?.name || "",
              images: item?.track?.album?.images || [],
            })) || [],
          total: tracksData?.total || 0,
        };
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  }, [data, type]);
};

export default useMappedData;
