// src/Home.tsx
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Home: React.FC = () => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};

  return (
    <div>
      <div>
        <h1>Welcome, {user?.display_name}</h1>
        {/* Render other user information here */}
      </div>
    </div>
  );
};

export default Home;
