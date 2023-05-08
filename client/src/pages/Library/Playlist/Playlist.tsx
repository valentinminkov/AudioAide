import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import style from "./Playlist.module.scss";
import { getPlaylist } from "../../../services/Spotify";
import { PlaylistResponse } from "../../../interfaces/Spotify";
import { AppContext } from "../../../context/AppContext";
import Spinner from "../../../components/Spinner/Spinner";
import List from "../../../components/List/List";
import DescriptionCard from "../../../components/DescriptionCard/DescriptionCard";

interface Props {}

const Playlist: React.FC<Props> = ({}) => {
  const { appState: { user } = { user: undefined } } =
    useContext(AppContext) || {};
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);

  useEffect(() => {
    const getPlaylistData = async () => {
      if (!user || !id) return;

      try {
        const playlistData = await getPlaylist(id, user.id);
        if (!playlistData) return;
        setPlaylist(playlistData);
      } catch (error) {}
    };

    getPlaylistData();
  }, [id, user]);

  const columnHeaders = ["Title", "Artist", ""];
  const listColumns = playlist?.tracks.items.map((item) => [
    item.track.name,
    item.track.artists.map((artist) => artist.name).join(", "),
    <a href={item.track.external_urls.spotify}>Open Track</a>,
  ]);
  const image = playlist?.images[0];
  const title = playlist?.name;
  const descriptionRows = [
    { title: "Owner", content: playlist?.owner.display_name || "" },
    { title: "Followers", content: playlist?.followers.total.toString() || "" },
    {
      content: <a href={playlist?.external_urls.spotify}>Open in Spotify</a>,
    },
  ];
  return (
    <div className={style.container}>
      {playlist ? (
        <>
          {image && title && descriptionRows && (
            <DescriptionCard
              image={image}
              title={title}
              rows={descriptionRows}
            />
          )}
          <h4>Tracks</h4>
          {listColumns && (
            <List columnHeaders={columnHeaders} columns={listColumns} />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Playlist;
