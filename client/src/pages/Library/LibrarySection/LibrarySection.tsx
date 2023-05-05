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

const itemsPerPage = 12;
const LibrarySection = ({ title, fetchData, type }: LibrarySectionProps) => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const pageFromUrl = parseInt(queryParams.get("page")!, 10) || 1;

  const [page, setPage] = useState(pageFromUrl);
  const [data, setData] = useState<
    | FollowedArtistsResponse
    | PlaylistResponse
    | AlbumsResponse
    | SavedTracksResponse
    | null
  >(null);
  const [offset, setOffset] = useState((page - 1) * itemsPerPage);

  const fetchDataMemoized = useCallback(fetchData, [fetchData]);
  const setDataMemoized = useCallback(setData, [setData]);

  const fetchSectionData = useCallback(
    async (userId: string, limit = itemsPerPage, offset = 0) => {
      return await fetchDataMemoized(userId, limit, offset);
    },
    [fetchDataMemoized]
  );

  const setAsyncSectionData = useCallback(
    async (userId: string, offset: number) => {
      setDataMemoized(null); // Reset data to null to show spinner

      const fetchedData = await fetchSectionData(userId, itemsPerPage, offset);
      setDataMemoized(fetchedData);
    },
    [fetchSectionData, setDataMemoized]
  );

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    setOffset((page - 1) * itemsPerPage);
  }, [page]);

  useEffect(() => {
    if (!queryParams.get("page")) {
      navigate(`${location.pathname}?page=1`, { replace: true });
    }
  }, [navigate, location.pathname, queryParams]);

  useEffect(() => {
    if (data) {
      const maxPage = {
        artists: Math.ceil(
          (data as FollowedArtistsResponse).artists?.total / itemsPerPage
        ),
        playlists: Math.ceil((data as PlaylistResponse)?.total / itemsPerPage),
        albums: Math.ceil((data as AlbumsResponse)?.total / itemsPerPage),
        tracks: Math.ceil((data as SavedTracksResponse)?.total / itemsPerPage),
      }[type];

      if (page > maxPage) {
        navigate(`${location.pathname}?page=${maxPage}`, { replace: true });
      }
    }
  }, [navigate, location.pathname, data, page, type]);

  useEffect(() => {
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
