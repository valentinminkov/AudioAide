import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthMiddleware from "./components/AuthMiddleware/AuthMiddleware";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Discover from "./pages/Discover/Discover";
import Library from "./pages/Library/Library";
import Playlists from "./pages/Library/Playlists/Playlists";
import Tracks from "./pages/Library/Tracks/Tracks";
import Artists from "./pages/Library/Artists/Artists";
import Albums from "./pages/Library/Albums/Albums";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth_callback" element={<AuthCallback />} />
      {/* Protected routes */}
      <Route path="/" element={<AuthMiddleware element={<Home />} />} />
      <Route path="/library" element={<AuthMiddleware element={<Library />} />}>
        <Route path="playlists" element={<Playlists />} />
        <Route path="tracks" element={<Tracks />} />
        <Route path="artists" element={<Artists />} />
        <Route path="albums" element={<Albums />} />
      </Route>
      <Route
        path="/discover"
        element={<AuthMiddleware element={<Discover />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
