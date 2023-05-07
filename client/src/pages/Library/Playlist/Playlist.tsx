import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import style from "./Playlist.module.scss";
import { getPlaylist } from "../../../services/Spotify";
import { PlaylistResponse } from "../../../interfaces/Spotify";
import { AppContext } from "../../../context/AppContext";
import Spinner from "../../../components/Spinner/Spinner";

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

  return (
    <div className={style.container}>
      {playlist ? (
        <>
          <h3>{playlist.name}</h3>
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            width={playlist.images[0].width}
            height={playlist.images[0].height}
          />
          <p>Owner: {playlist.owner.display_name}</p>
          <p>Followers: {playlist.followers.total}</p>
          <p>
            <a href={playlist.external_urls.spotify}>Open in Spotify</a>
          </p>
          <h4>Tracks</h4>
          <ol>
            {playlist.tracks.items.map((item) => (
              <li key={item.track.id}>
                <span>{item.track.name}</span> -{" "}
                <span>
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </span>
                <p>
                  <a href={item.track.external_urls.spotify}>Open Track</a>
                </p>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Playlist;
