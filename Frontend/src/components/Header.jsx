import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("organizer");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">
          <Link to="/">HackFusion</Link>
        </h1>
        <nav className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/hackathons" className="hover:text-gray-300 transition">Hackathons</Link>
          {authToken ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
              <Link to="/signup" className="hover:text-gray-300 transition">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
