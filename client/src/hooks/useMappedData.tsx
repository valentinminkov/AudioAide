import { useMemo } from "react";
import {
  FollowedArtistsResponse,
  PlaylistsResponse,
  AlbumsResponse,
  SavedTracksResponse,
  PlaylistResponse,
  AlbumResponse,
} from "../interfaces/Spotify";
import { UniversalItem } from "../interfaces/Data";
import { DescriptionRow } from "../components/DescriptionCard/DescriptionCard";
import { Image } from "../interfaces/Spotify";

interface Item {
  title: string;
  image: Image;
  descriptionRows: DescriptionRow[];
  listColumnHeaders: string[];
  listColumns: any[][];
}

type DataType = "artists" | "playlists" | "albums" | "tracks";

// all of this should be done server side

const mapTrackItems = (
  response: PlaylistResponse | AlbumResponse,
  type: DataType
): any[][] => {
  switch (type) {
    case "playlists":
      return (response as PlaylistResponse).tracks.items.map((item) => [
        item.track.name,
        item.track.artists.map((artist) => artist.name).join(", "),
        <a href={item.track.external_urls.spotify}>Open Track</a>,
      ]);
    case "albums":
      return (response as AlbumResponse).tracks.items.map((item) => [
        item.name,
        item.artists.map((artist) => artist.name).join(", "),
        <a href={item.external_urls.spotify}>Open Track</a>,
      ]);
    default:
      return [];
  }
};

const mapDescriptionRows = (
  response: PlaylistResponse | AlbumResponse,
  type: DataType
): DescriptionRow[] => {
  switch (type) {
    case "playlists":
      const playlist = response as PlaylistResponse;
      return [
        { title: "Owner", content: playlist.owner.display_name || "" },
        {
          title: "Followers",
          content: playlist.followers.total.toString() || "",
        },
        {
          content: <a href={playlist.external_urls.spotify}>Open in Spotify</a>,
        },
      ];
    case "albums":
      const album = response as AlbumResponse;
      return [
        {
          title: "Artists",
          content: album.artists.map((artist) => artist.name).join(", "),
        },
        { title: "Release Date", content: album.release_date },
        { content: <a href={album.external_urls.spotify}>Open in Spotify</a> },
      ];
    default:
      return [];
  }
};

const useMappedData = (
  data:
    | FollowedArtistsResponse
    | PlaylistsResponse
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
        const playlistsData = data as PlaylistsResponse;
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

const useMapResponseToItem = (
  response: PlaylistResponse | AlbumResponse | undefined,
  type: DataType
): Item | undefined => {
  if (!response) return;
  const listColumns = mapTrackItems(response, type);
  const descriptionRows = mapDescriptionRows(response, type);

  const item: Item = {
    title: response.name,
    image: response.images[0],
    descriptionRows: descriptionRows,
    listColumnHeaders: ["Title", "Artist", ""],
    listColumns: listColumns,
  };

  return item;
};

export { useMappedData, useMapResponseToItem };
