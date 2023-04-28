import React from "react";
import { SPOTIFY_AUTH_URL } from "../../config/config";

const Login = () => {
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
