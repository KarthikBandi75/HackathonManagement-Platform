import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHackathonPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problemStatement: "",
    teamSize: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [organizerId, setOrganizerId] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const savedOrganizer = JSON.parse(localStorage.getItem("organizer") || "{}");
    const token = localStorage.getItem("authToken");

    if (savedOrganizer?.id && token) {
      setOrganizerId(savedOrganizer.id);
      setAuthToken(token);
    } else {
      alert("Please log in first!");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End date cannot be before the start date.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:7555/hackathons",
        {
          ...formData,
          organizerId, // Automatically added from localStorage
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Corrected syntax
          },
        }
      );

      if (response.status === 201) {
        alert("Hackathon Added Successfully!");
        navigate("/hackathons"); // Redirect to hackathons list page
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to add Hackathon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-6 text-3xl font-bold text-center text-purple-600">
            Add Hackathon
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Hackathon Title"
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Hackathon Description"
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Problem Statement</label>
              <textarea
                name="problemStatement"
                placeholder="Problem Statement"
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.problemStatement}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Team Size</label>
              <input
                type="number"
                name="teamSize"
                placeholder="Max Team Size"
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.teamSize}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Hackathon Location"
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            {error && (
              <p className="mb-4 text-center text-red-500">{error}</p>
            )}
            <button
              type="submit"
              className={`w-full py-2 text-white transition bg-purple-600 rounded-2xl hover:bg-purple-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Hackathon"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddHackathonPage;
