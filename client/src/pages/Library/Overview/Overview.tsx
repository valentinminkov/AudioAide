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
import style from "./Overview.module.scss";
import Spinner from "../../../components/Spinner/Spinner";
import { useMappedData } from "../../../hooks/useMappedData";
import {
  AlbumsResponse,
  FollowedArtistsResponse,
  PlaylistsResponse,
  SavedTracksResponse,
} from "../../../interfaces/Spotify";
import { DataType } from "../../../types/Spotify";

interface Props {
  title: string;
  fetchData: (userId: string, limit: number, offset: number) => Promise<any>;
  type: DataType;
}

const itemsPerPage = 24;

const Overview = ({ title, fetchData, type }: Props) => {
  const { appState: { user } = { user: undefined } } =
    useContext(AppContext) || {};
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const pageFromUrl = parseInt(queryParams.get("page")!, 10) || 1;
  const [data, setData] = useState<
    | FollowedArtistsResponse
    | PlaylistsResponse
    | AlbumsResponse
    | SavedTracksResponse
    | null
  >(null);
  const { items, total } = useMappedData(data, type);
  const offset = (pageFromUrl - 1) * itemsPerPage;

  const fetchDataWrapper = useCallback(
    async (userId: string, limit = itemsPerPage, offset = 0) => {
      // TO DO: Cache data to optimize, instead of just fetching it every time
      setData(null);
      const fetchedData = await fetchData(userId, limit, offset);
      setData(fetchedData);
    },
    [fetchData]
  );

  useEffect(() => {
    if (user?.id) {
      // Only fetch data if the page from the URL is valid and non-negative
      if (pageFromUrl > 0) {
        const offset = (pageFromUrl - 1) * itemsPerPage;
        fetchDataWrapper(user.id, itemsPerPage, offset);
      }
    }
  }, [fetchDataWrapper, user, pageFromUrl]);

  useEffect(() => {
    // If the page is not specified in the URL, set it to 1
    if (!queryParams.get("page")) {
      navigate(`${location.pathname}?page=1`, { replace: true });
    }

    if (data) {
      const maxPage = Math.ceil(total / itemsPerPage);
      if (pageFromUrl > maxPage) {
        // If the page from the URL is greater than the max page, set it to the max page
        navigate(`${location.pathname}?page=${maxPage}`, { replace: true });
      }
    }
  }, [navigate, location.pathname, data, total, queryParams, pageFromUrl]);

  const handlePageChange = (page: number) => {
    if (page !== pageFromUrl) {
      navigate(`${location.pathname}?page=${page}`, { replace: true });
    }
  };

  const onContainerClick = (id: string) => {
    switch (type) {
      case "artists":
        console.log(type, id);
        break;
      case "tracks":
        console.log(type, id);
        break;
      case "playlists":
      case "albums":
        navigate(`/library/view/${type}/${id}`, {
          replace: true,
        });
        break;
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  };

  return (
    <div className={style.containers}>
      <h3>{title}</h3>

      {data ? (
        <DataDisplay
          currentPage={pageFromUrl}
          items={items}
          total={total}
          type={type}
          offset={offset}
          itemsPerPage={itemsPerPage}
          handlePageChange={handlePageChange}
          onContainerClick={onContainerClick}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Overview;
