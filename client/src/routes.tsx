import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthMiddleware from "./components/AuthMiddleware/AuthMiddleware";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Discover from "./pages/Discover/Discover";
import Library from "./pages/Library/Library";
import Overview from "./pages/Library/Overview/Overview";
import ItemView from "./pages/Library/ItemView/ItemView";
import {
  getPlaylists,
  getSavedArtists,
  getSavedAlbums,
  getSavedTracks,
} from "./services/Spotify";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth_callback" element={<AuthCallback />} />
      {/* Protected routes */}
      <Route path="/" element={<AuthMiddleware element={<Home />} />} />
      <Route path="/library" element={<AuthMiddleware element={<Library />} />}>
        <Route
          path="playlists"
          element={
            <Overview
              title="Playlists"
              fetchData={getPlaylists}
              type="playlists"
            />
          }
        />
        <Route path="view/:type/:id" element={<ItemView />} />
        <Route
          path="tracks"
          element={
            <Overview title="Tracks" fetchData={getSavedTracks} type="tracks" />
          }
        />
        <Route
          path="artists"
          element={
            <Overview
              title="Artists"
              fetchData={getSavedArtists}
              type="artists"
            />
          }
        />
        <Route
          path="albums"
          element={
            <Overview title="Albums" fetchData={getSavedAlbums} type="albums" />
          }
        />
      </Route>
      <Route
        path="/discover"
        element={<AuthMiddleware element={<Discover />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
