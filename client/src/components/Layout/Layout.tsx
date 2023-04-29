import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { logout } = useAuth();
  const { appState } = useContext(AppContext);
  const { user } = appState;
  return (
    <div>
      {user && (
        <div>
          <Link to={"/library"}>Your Library</Link>
          <br />
          <Link to={"/discover"}>Discover</Link>
          <br />
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
