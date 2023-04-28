// src/Home.tsx
import React, { useEffect, useState } from "react";
import { getMe } from "../../services/SpotifyService";
import { getUserId } from "../../services/AuthService";
import { SPOTIFY_AUTH_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const userId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getMe(userId);

        setUser(userData);
      } else {
        window.location.href = SPOTIFY_AUTH_URL;
      }
    };

    fetchData();
  }, [userId]);

  const logout = () => {
    localStorage.removeItem("user_id");
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
