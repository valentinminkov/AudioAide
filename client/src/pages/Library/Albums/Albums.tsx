import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { getSavedAlbums } from "../../../services/Spotify";

const Albums = () => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const data = await getSavedAlbums(userId, 50);
      return data;
    };

    if (user?.id) {
      fetchData(user.id);
    }
  });
  return (
    <div>
      <h2>Albums</h2>
    </div>
  );
};

export default Albums;
