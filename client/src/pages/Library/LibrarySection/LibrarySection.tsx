import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DataDisplay from "../../../components/DataDisplay/DataDisplay";
import { AppContext } from "../../../context/AppContext";
import style from "./LibrarySection.module.scss";
import Spinner from "../../../components/Spinner/Spinner";
import {
  AlbumsResponse,
  FollowedArtistsResponse,
  PlaylistResponse,
  SavedTracksResponse,
} from "../../../interfaces/Spotify";

type DataType = "artists" | "playlists" | "albums" | "tracks";

interface LibrarySectionProps {
  title: string;
  fetchData: (userId: string, limit: number, offset: number) => Promise<any>;
  type: DataType;
}

const LibrarySection = ({ title, fetchData, type }: LibrarySectionProps) => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const pageFromUrl = queryParams.get("page")
    ? parseInt(queryParams.get("page")!, 10)
    : 1;

  const [page, setPage] = useState(pageFromUrl);

  // State
  const [data, setData] = useState<
    | FollowedArtistsResponse
    | PlaylistResponse
    | AlbumsResponse
    | SavedTracksResponse
    | null
  >(null);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [offset, setOffset] = useState((page - 1) * itemsPerPage);

  const fetchSectionData = useCallback(
    async (userId: string, limit = itemsPerPage, offset = 0) => {
      return await fetchData(userId, limit, offset);
    },
    [fetchData, itemsPerPage]
  );

  const setAsyncSectionData = useCallback(
    async (userId: string, offset: number) => {
      const fetchedData = await fetchSectionData(userId, itemsPerPage, offset);
      setData(fetchedData);
    },
    [fetchSectionData, itemsPerPage]
  );

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    const newOffset = (page - 1) * itemsPerPage;
    setOffset(newOffset);
  }, [page, itemsPerPage]);

  useEffect(() => {
    if (!queryParams.get("page")) {
      navigate(`${location.pathname}?page=1`, { replace: true });
    }
  }, [navigate, location.pathname, queryParams]);

  // TO DO
  // Accessing the different objects could be done differently with less repeaiting code
  useEffect(() => {
    if (data) {
      let maxPage;
      switch (type) {
        case "artists":
          maxPage = Math.ceil(
            (data as FollowedArtistsResponse).artists?.total / itemsPerPage
          );
          break;
        case "playlists":
          maxPage = Math.ceil((data as PlaylistResponse)?.total / itemsPerPage);
          break;
        case "albums":
          maxPage = Math.ceil((data as AlbumsResponse)?.total / itemsPerPage);
          break;
        case "tracks":
          maxPage = Math.ceil(
            (data as SavedTracksResponse)?.total / itemsPerPage
          );
          break;
        default:
          maxPage = 1;
      }
      if (page > maxPage) {
        navigate(`${location.pathname}?page=${maxPage}`, { replace: true });
      }
    }
  }, [navigate, location.pathname, data, itemsPerPage, page, type]);

  useEffect(() => {
    setData(null);

    if (user?.id) {
      setAsyncSectionData(user.id, offset);
    }
  }, [setAsyncSectionData, user, offset]);

  return (
    <div className={style.containers}>
      <h3>{title}</h3>

      {data ? (
        <DataDisplay
          data={data}
          type={type}
          offset={offset}
          setOffset={setOffset}
          itemsPerPage={itemsPerPage}
          setPage={setPage}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default LibrarySection;
