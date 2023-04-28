// src/Home.tsx
import React, { useEffect, useState } from "react";
import { getMe } from "../../services/SpotifyService";
import { getUserId } from "../../services/AuthService";

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const userId = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getMe(userId);

        setUser(userData);
      } else {
        window.location.href = "http://localhost:8888/api/auth/login";
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.display_name}</h1>
          {/* Render other user information here */}
        </div>
      ) : (
        <h1>Fetching user date...</h1>
      )}
    </div>
  );
};

export default Home;
