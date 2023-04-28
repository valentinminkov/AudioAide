// src/AuthCallback.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromURL = urlParams.get("user_id");

    if (userIdFromURL) {
      localStorage.setItem("user_id", userIdFromURL);
      navigate("/");
    }
    // TO DO: Handle error case
  }, [navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default AuthCallback;
