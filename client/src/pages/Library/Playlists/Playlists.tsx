import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { getPlaylists } from "../../../services/Spotify";

const Playlists = () => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const data = await getPlaylists(userId, 50);
      return data;
    };

    if (user?.id) {
      fetchData(user.id);
    }
  });

  return (
    <div>
      <h2>Playlists</h2>
    </div>
  );
};

export default Playlists;
