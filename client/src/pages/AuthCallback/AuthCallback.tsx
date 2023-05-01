// src/AuthCallback.tsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/Spotify";
import { SPOTIFY_AUTH_URL } from "../../config/config";
import { AppContext } from "../../context/AppContext";

const AuthCallback: React.FC = () => {
  const { setAppState } = useContext(AppContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const onUserIdFetch = async (userId: string) => {
      if (userId) {
        const userData = await getMe(userId);
        if (userData) {
          setAppState({ user: userData });
        }
        navigate("/");
      } else {
        window.location.href = SPOTIFY_AUTH_URL;
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromURL = urlParams.get("user_id");

    if (userIdFromURL) {
      onUserIdFetch(userIdFromURL);
    }
    // TO DO: Handle error case
  }, [navigate, setAppState]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default AuthCallback;
