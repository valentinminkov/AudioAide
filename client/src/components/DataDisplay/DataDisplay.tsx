import React, { useMemo } from "react";
import {
  FollowedArtistsResponse,
  PlaylistResponse,
  AlbumsResponse,
  SavedTracksResponse,
} from "../../interfaces/Spotify";
import Data from "../Data/Data";
import Pagination from "../Pagination/Pagination";
import styles from "./DataDisplay.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

type DataType = "artists" | "playlists" | "albums" | "tracks";

interface DataDisplayProps {
  data:
    | FollowedArtistsResponse
    | PlaylistResponse
    | AlbumsResponse
    | SavedTracksResponse;
  type: DataType;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const getItemProperties = (item: any, type: DataType) => {
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
  }
};

const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  type,
  offset,
  setOffset,
  itemsPerPage,
  setPage,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], total = 0 } = useMemo(() => {
    switch (type) {
      case "artists":
        return {
          items: (data as FollowedArtistsResponse).artists?.items,
          total: (data as FollowedArtistsResponse).artists?.total,
        };
      case "playlists":
        return {
          items: (data as PlaylistResponse)?.items,
          total: (data as PlaylistResponse)?.total,
        };
      case "albums":
        return {
          items: (data as AlbumsResponse)?.items,
          total: (data as AlbumsResponse)?.total,
        };
      case "tracks":
        return {
          items: (data as SavedTracksResponse)?.items,
          total: (data as SavedTracksResponse)?.total,
        };
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  }, [data, type]);

  const totalPages = Math.ceil(total / itemsPerPage);
  const currentPage = Math.floor(offset / itemsPerPage) + 1;

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      const newOffset = (page - 1) * itemsPerPage;
      setOffset(newOffset);
      setPage(page);
      navigate(`${location.pathname}?page=${page}`, { replace: true });
    }
  };

  return (
    <div>
      <div className={styles.content}>
        {items?.map((item) => {
          const { id, name, images } = getItemProperties(item, type);
          return <Data key={id} title={name} images={images} />;
        })}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => handlePageChange(page)}
      />
    </div>
  );
};

export default DataDisplay;
