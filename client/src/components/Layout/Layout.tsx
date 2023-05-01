import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { logout } = useAuth();
  const { appState } = useContext(AppContext);
  const { user } = appState;
  return (
    <div>
      {/* Navigation */}
      {user && (
        <div className={styles.navContainer}>
          <Link className="link" to={"/library"}>Your Library</Link>
          <Link className="link" to={"/discover"}>Discover</Link>
          <div className="grow"></div>
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
      {/* Content */}
      <div>{children}</div>
      {/* Footer */}
      {user && (
        <div className={styles.footerContainer}>
          Test footer
          {/* To do 
          Display the current song playing
          Display the current playlist? or album? or artist? 
          Display the current user - (Display the current user's profile picture if available
          Display the current user's name if available)
          Display the current user's device
          Display the current user's volume
          Display the current user's shuffle status
          Display the current user's repeat status
          Display the current user's play status
          Display the current user's queue
          Display the current user's queue position
          Display the current user's queue length
          Display the current user's queue history
          Display the current user's queue history position
          Display the current user's queue history length
        */}
        </div>
      )}
    </div>
  );
};

export default Layout;
