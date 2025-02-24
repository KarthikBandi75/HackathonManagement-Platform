import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const HackathonDetails = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7555/api/user/view-hackathon/${id}`
        );
        setHackathon(response.data);
        calculateTimeRemaining(response.data.startDate);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load hackathon details");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  const calculateTimeRemaining = (startDate) => {
    const eventStart = new Date(startDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventStart - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeRemaining("Event has started!");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-600">{error}</div>;
  }

  const timelineSteps = ["Idea Submission", "Shortlisting", "Team Confirmation", "Final Presentation"];
  const completedSteps = hackathon.completedSteps || 0;

  return (
    <div className="min-h-screen p-6">
      <motion.div
        className="max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="mb-4 text-3xl font-bold md:mb-0">{hackathon.title}</h1>
          <motion.div
            className="px-4 py-2 text-blue-600 bg-blue-100 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {timeRemaining}
          </motion.div>
        </div>
        <p className="mt-4 text-gray-900">Hackathon ID: {hackathon._id}</p>

        <p className="mt-4 text-gray-600">{hackathon.description}</p>

        <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-2">
          <div>
            <p>
              <strong>Start Date:</strong> {new Date(hackathon.startDate).toDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(hackathon.endDate).toDateString()}
            </p>
            <p>
              <strong>Mode:</strong> {hackathon.mode}
            </p>
          </div>
          <img
            src={hackathon.image || "https://via.placeholder.com/300"}
            alt="Hackathon"
            className="rounded-lg"
          />
        </div>

        <div className="my-6">
          <h2 className="mb-4 text-2xl font-bold">Timeline</h2>
          <div className="relative">
            <div className="absolute h-full w-1 bg-blue-200 left-2.5"></div>
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex items-start mb-6">
                <div
                  className={`w-5 h-5 rounded-full mt-1.5 flex items-center justify-center ${
                    index < completedSteps ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
                <p className={`ml-4 ${index < completedSteps ? "text-blue-600" : "text-gray-500"}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={() => navigate(`/register/${hackathon._id}`)}
          >
            Register
          </button>
          <button
            className="px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
            onClick={() => navigate("/hackathons")}
          >
            View All Hackathons
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HackathonDetails;