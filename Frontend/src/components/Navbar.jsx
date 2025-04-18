import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = Boolean(authToken);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("organizer");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-md sm:px-10">
      <h1 
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        HackFusion
      </h1>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="px-6 py-2 text-sm text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 text-sm text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Create Account
        </button>
      )}
    </div>
  );
};

export default Navbar;