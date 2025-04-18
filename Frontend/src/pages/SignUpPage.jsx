import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
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
        "http://localhost:7555/organizers/register",
        formData
      );

      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
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
        <h2 className="mb-4 text-3xl font-extrabold text-center text-blue-500">
          Sign Up
        </h2>
        <p className="mb-8 text-center text-gray-500">
          Create your organizer account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
            className="w-full py-2 text-white transition transform bg-purple-600 rounded-lg hover:bg-purple-700 hover:scale-105"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <NavLink
            to="/"
            className="text-sm text-gray-600 hover:text-purple-600"
          >
            Back to Homepage
          </NavLink>
          <br />
          <NavLink
            to="/login"
            className="text-sm text-gray-600 hover:text-purple-600"
          >
            Already have an account? Login
          </NavLink>
        </div>
      </div>
    </motion.main>
  );
};

export default SignUpPage;