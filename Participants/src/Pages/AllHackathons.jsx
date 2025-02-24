import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const AllHackathons = () => {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const fetchHackathons = async () => {
      try {
        const response = await axios.get("http://localhost:7555/api/user/all-hackathons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHackathons(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load hackathons");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [navigate]);

  const filteredHackathons = hackathons.filter((hackathon) => {
    const today = new Date();
    if (filter === "Ongoing") {
      return new Date(hackathon.startDate) <= today && new Date(hackathon.endDate) >= today;
    } else if (filter === "Upcoming") {
      return new Date(hackathon.startDate) > today;
    } else if (filter === "Finished") {
      return new Date(hackathon.endDate) < today;
    } else {
      return true; // "All"
    }
  });

  return (
    <main className="min-h-screen p-8 ">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Explore Hackathons
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        {["All", "Ongoing", "Upcoming", "Finished"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 font-medium rounded-full shadow-md hover:bg-blue-500 hover:text-white focus:outline-none transition-all ${
              filter === category
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg font-medium text-gray-600">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      ) : filteredHackathons.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg font-medium text-gray-600">No hackathons available.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHackathons.map((hackathon) => {
  const today = new Date();
  const isOngoing =
    new Date(hackathon.startDate) <= today && new Date(hackathon.endDate) >= today;
  const isUpcoming = new Date(hackathon.startDate) > today;
  const isFinished = new Date(hackathon.endDate) < today;

  return (
    <motion.div
      key={hackathon._id}
      whileHover={{ scale: 1.05 }}
      className="relative p-6 transition bg-white border rounded-lg shadow-md cursor-pointer"
    >
      {/* Status Badge */}
      <div
        className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${
          isOngoing
            ? "bg-green-100 text-green-800"
            : isUpcoming
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {isOngoing ? "Ongoing" : isUpcoming ? "Upcoming" : "Finished"}
      </div>

      {/* Card Header */}
      <div
        className="h-32 mb-4 bg-center bg-cover rounded-lg"
        style={{
          backgroundImage: `url(${hackathon.image || assets.cybersecurityimage})`,
        }}
      ></div>

      {/* Hackathon Details */}
      <h3 className="mb-2 text-xl font-bold text-gray-800">{hackathon.title}</h3>
      <p className="mb-4 text-sm text-gray-600">{hackathon.description}</p>
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          <strong>Start Date:</strong> {new Date(hackathon.startDate).toDateString()}
        </p>
        <p className="text-sm text-gray-500">
          <strong>End Date:</strong> {new Date(hackathon.endDate).toDateString()}
        </p>
      </div>

      {/* Footer with Mode and Action Button */}
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            hackathon.mode === "Online"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {hackathon.mode}
        </span>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
          onClick={() => navigate(`/view-hackathon/${hackathon._id}`)}
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
})}

        </div>
      )}
    </main>
  );
};

export default AllHackathons;
