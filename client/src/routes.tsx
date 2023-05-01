import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthMiddleware from "./components/AuthMiddleware/AuthMiddleware";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Discover from "./pages/Discover/Discover";
import Library from "./pages/Library/Library";
import LibrarySection from "./pages/Library/LibrarySection/LibrarySection";
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
            <LibrarySection title="Playlists" fetchData={getPlaylists} />
          }
        />
        <Route
          path="tracks"
          element={<LibrarySection title="Tracks" fetchData={getSavedTracks} />}
        />
        <Route
          path="artists"
          element={
            <LibrarySection title="Artists" fetchData={getSavedArtists} />
          }
        />
        <Route
          path="albums"
          element={<LibrarySection title="Albums" fetchData={getSavedAlbums} />}
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
