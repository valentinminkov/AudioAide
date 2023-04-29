// src/AuthCallback.tsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const AuthCallback: React.FC = () => {
  const { setAppState } = useContext(AppContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromURL = urlParams.get("user_id");

    if (userIdFromURL) {
      setAppState({ userId: userIdFromURL });
      navigate("/");
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
