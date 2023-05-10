import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./Library.module.scss";

enum NavLinks {
  Playlists = "/library/playlists",
  Tracks = "/library/tracks",
  Albums = "/library/albums",
  Artists = "/library/artists",
}

const Library = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/library") {
      navigate("/library/playlists", { replace: true });
    }
  }, [location.pathname, navigate]);

  const renderSubNav = () => {
    return Object.keys(NavLinks).map((key) => {
      const path = NavLinks[key as keyof typeof NavLinks];
      if (path === location?.pathname) return null;
      return (
        <Link key={path} className={"link"} to={path}>
          {key}
        </Link>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>{renderSubNav()}</div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Library;
