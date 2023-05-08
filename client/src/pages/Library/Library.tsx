import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./Library.module.scss";

const Library = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname, "location.pathname");

  useEffect(() => {
    if (location.pathname === "/library") {
      navigate("/library/playlists", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div>
      <h1>Library</h1>
      <div className={styles.container}>
        <div>
          <Link className={"link"} to={`/library/playlists`}>
            Playlists
          </Link>
        </div>
        <div className={"link"}>
          <Link className={"link"} to={`/library/tracks`}>
            Tracks
          </Link>
        </div>
        <div className={"link"}>
          <Link className={"link"} to={`/library/albums`}>
            Albums
          </Link>
        </div>
        <div className={"link"}>
          <Link className={"link"} to={`/library/artists`}>
            Artists
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Library;
