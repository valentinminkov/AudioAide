import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { getSavedArtists } from "../../../services/Spotify";

const Artists = () => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const data = await getSavedArtists(userId, 50);
      return data;
    };

    if (user?.id) {
      fetchData(user.id);
    }
  });

  return (
    <div>
      <h2>Artists</h2>
    </div>
  );
};

export default Artists;
