import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SPOTIFY_AUTH_URL } from "../../config/config";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { appState } = useContext(AppContext) || {};

  useEffect(() => {
    if (appState.user) {
      navigate("/");
    }
  });

  return (
    <div>
      <h1>Login</h1>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
        necessitatibus cupiditate iure facilis deleniti porro dolor eos ipsam,
        exercitationem pariatur, sapiente molestias nulla maxime fugit vel,
        molestiae excepturi minus doloremque.
        <button
          onClick={() => {
            window.location.assign(SPOTIFY_AUTH_URL);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
