import React from "react";
import {
  FollowedArtistsResponse,
  PlaylistResponse,
  AlbumsResponse,
  SavedTracksResponse,
} from "../../interfaces/Spotify";
import Data from "../Data/Data";

type DataType = "artists" | "playlists" | "albums" | "tracks";

interface DataDisplayProps {
  data:
    | FollowedArtistsResponse
    | PlaylistResponse
    | AlbumsResponse
    | SavedTracksResponse;
  type: DataType;
}

interface ItemProperties {
  id: string;
  name: string;
  images: any[];
}

const getItemProperties = (item: any, type: DataType): ItemProperties => {
  switch (type) {
    case "artists":
    case "playlists":
      return { id: item?.id, name: item?.name, images: item?.images };
    case "albums":
      return {
        id: item?.album?.id,
        name: item?.album?.name,
        images: item?.album?.images,
      };
    case "tracks":
      return {
        id: item?.track?.id,
        name: item?.track?.name,
        images: item?.track?.album?.images,
      };
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

const DataDisplay: React.FC<DataDisplayProps> = ({ data, type }) => {
  let items;

  switch (type) {
    case "artists":
      items = (data as FollowedArtistsResponse)?.artists?.items;
      break;
    case "playlists":
      items = (data as PlaylistResponse).items;
      break;
    case "albums":
      items = (data as AlbumsResponse).items;
      break;
    case "tracks":
      items = (data as SavedTracksResponse).items;
      break;
    default:
      throw new Error(`Invalid type: ${type}`);
  }

  return (
    <div>
      {items?.map((item) => {
        const { id, name, images } = getItemProperties(item, type);
        return <Data key={id} title={name} images={images} />;
      })}
    </div>
  );
};

export default DataDisplay;
