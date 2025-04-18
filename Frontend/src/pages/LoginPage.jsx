import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:7555/organizers/login",
        formData
      );

      if (response.status === 200) {
        const { token, organizer } = response.data;

        // Store necessary data in local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("organizer", JSON.stringify(organizer));

        alert("Login Successful!");
        navigate("/hackathons"); // Redirect to dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100"
    >
      <div className="w-full max-w-lg p-10 bg-white shadow-2xl rounded-3xl">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-indigo-700">
          Login
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Welcome back! Please login to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <p className="mb-4 text-center text-red-500">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 text-white transition transform rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 hover:scale-105"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <NavLink
            to="/signup"
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Don't have an account? Sign Up
          </NavLink>
        </div>
      </div>
    </motion.main>
  );
};

export default LoginPage;