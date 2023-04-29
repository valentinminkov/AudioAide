// src/Home.tsx
import React, { useEffect, useContext } from "react";
import { getMe } from "../../api/Spotify";
import { SPOTIFY_AUTH_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Home: React.FC = () => {
  const { appState, setAppState } = useContext(AppContext) || {};
  const { userId, user } = appState || {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getMe(userId);
        if (userData) {
          setAppState({ user: userData });
        }
      } else {
        window.location.href = SPOTIFY_AUTH_URL;
      }
    };

    fetchData();
  }, [setAppState, userId]);

  const logout = () => {
    setAppState({ userId: undefined });
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.display_name}</h1>
          <button onClick={() => logout()}>Logout</button>
          {/* Render other user information here */}
        </div>
      ) : (
        <h1>Fetching user date...</h1>
      )}
    </div>
  );
};

export default Home;
