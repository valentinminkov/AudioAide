import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import style from "./ItemView.module.scss";
import { getPlaylist, getAlbum } from "../../../services/Spotify";
import { PlaylistResponse, AlbumResponse } from "../../../interfaces/Spotify";
import { AppContext } from "../../../context/AppContext";
import Spinner from "../../../components/Spinner/Spinner";
import List from "../../../components/List/List";
import DescriptionCard from "../../../components/DescriptionCard/DescriptionCard";
import { DataType } from "../../../types/Spotify";
import { useMapResponseToItem } from "../../../hooks/useMappedData";

interface Props {}

const ItemView: React.FC<Props> = () => {
  const { appState: { user } = { user: undefined } } =
    useContext(AppContext) || {};
  const params = useParams();
  const { id, type } = params as { id: string; type: DataType };
  const [data, setData] = useState<PlaylistResponse | AlbumResponse>();
  const item = useMapResponseToItem(data, type);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !id) return;

      switch (type) {
        case "playlists":
          try {
            const playlistData = await getPlaylist(id, user.id);
            if (!playlistData) return;
            setData(playlistData);
          } catch (error) {}
          break;
        case "albums":
          try {
            const albumData = await getAlbum(id, user.id);
            if (!albumData) return;
            setData(albumData);
          } catch (error) {}
          break;
        default:
          break;
      }
    };

    fetchData();
  }, [id, type, user]);

  return (
    <div className={style.container}>
      {item ? (
        <>
          {item.image && item.title && item.descriptionRows && (
            <DescriptionCard
              image={item.image}
              title={item.title}
              rows={item.descriptionRows}
            />
          )}
          <h4>Tracks</h4>
          {item.listColumns && (
            <List
              columnHeaders={item.listColumnHeaders}
              columns={item.listColumns}
            />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ItemView;
