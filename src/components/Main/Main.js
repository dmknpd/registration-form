import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CustomContext } from "../../Context";

import Menu from "../Menu/Menu";

const Main = () => {
  const { user, setUser } = useContext(CustomContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const logOut = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <div className="bg-gray-700 w-screen h-screen flex flex-col gap-10 items-center justify-center">
      <Menu />
      <p className="text-3xl font-bold text-white">
        {user ? `Hello ${user.email}` : "Please login"}
      </p>
      {user ? (
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={logOut}
        >
          Logout
        </button>
      ) : (
        <Link className="bg-gray-500 text-white py-2 px-4 rounded" to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Main;
