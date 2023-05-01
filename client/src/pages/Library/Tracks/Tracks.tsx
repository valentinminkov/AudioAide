import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { getSavedTracks } from "../../../services/Spotify";

const Tracks = () => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const data = await getSavedTracks(userId, 50);
      return data;
    };

    if (user?.id) {
      fetchData(user.id);
    }
  });

  return (
    <div>
      <h2>Tracks</h2>
    </div>
  );
};

export default Tracks;
