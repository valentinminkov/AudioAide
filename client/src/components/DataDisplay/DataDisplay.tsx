import React from "react";
import {
  FollowedArtistsResponse,
  PlaylistResponse,
  AlbumsResponse,
  SavedTracksResponse,
} from "../../interfaces/Spotify";

interface DataDisplayProps {
  data:
    | FollowedArtistsResponse
    | PlaylistResponse
    | AlbumsResponse
    | SavedTracksResponse;
  type: "artists" | "playlists" | "albums" | "tracks";
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, type }) => {
  const renderData = () => {
    let items;

    switch (type) {
      case "artists":
        items = (data as FollowedArtistsResponse)?.artists?.items;
        return items?.map((artist) => {
          if (artist.images && artist.images[0]) {
            return (
              <div key={artist.id}>
                <h4>{artist.name}</h4>
                <img src={artist.images[0]?.url} alt={artist.name} />
              </div>
            );
          } else {
            return (
              <div key={artist.id}>
                <h4>{artist.name}</h4>
                <p>No image available</p>
              </div>
            );
          }
        });
      case "playlists":
        items = (data as PlaylistResponse).items;
        return items?.map((playlist) => {
          if (playlist.images && playlist.images[0]) {
            return (
              <div key={playlist.id}>
                <h4>{playlist.name}</h4>
                <img src={playlist.images[0]?.url} alt={playlist.name} />
              </div>
            );
          } else {
            return (
              <div key={playlist.id}>
                <h4>{playlist.name}</h4>
                <p>No image available</p>
              </div>
            );
          }
        });

      case "albums":
        items = (data as AlbumsResponse).items;
        return items?.map(({ album }) => {
          if (album) {
            return (
              <div key={album.id}>
                <h4>{album.name}</h4>
                <img src={album.images[0]?.url} alt={album.name} />
              </div>
            );
          } else {
            return null;
          }
        });

      case "tracks":
        items = (data as SavedTracksResponse).items;
        return items?.map((item) => {
          if (item.track) {
            const { id, name, album } = item.track;
            return (
              <div key={id}>
                <h4>{name}</h4>
                <img src={album.images[0]?.url} alt={name} />
              </div>
            );
          } else {
            return null;
          }
        });

      default:
        return null;
    }
  };

  return <div>{renderData()}</div>;
};

export default DataDisplay;
