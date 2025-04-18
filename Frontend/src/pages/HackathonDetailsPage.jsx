import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";

const HackathonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const fetchHackathon = async () => {
      try {
        const response = await axios.get(`http://localhost:7555/hackathons/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setHackathon(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load hackathon details");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id, navigate, authToken]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7555/hackathons/${id}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Registered successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hackathon?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:7555/hackathons/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      alert("Hackathon deleted successfully!");
      navigate("/hackathons");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete hackathon");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
          <h2 className="mb-4 text-4xl font-bold text-center text-purple-600">
            {hackathon?.title || "N/A"}
          </h2>
          <p className="mb-4 text-lg text-gray-700">{hackathon?.description || "No description available"}</p>

          <div className="mb-4">
            <strong className="text-gray-800">📌 Problem Statement:</strong>
            <p className="text-gray-600">{hackathon?.problemStatement || "No problem statement provided"}</p>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <p>👥 Team Size: {hackathon?.teamSize || "N/A"}</p>
            <p>📍 Location: {hackathon?.location || "N/A"}</p>
          </div>

          <div className="flex justify-between text-gray-500">
            <p>📅 Start: {hackathon?.startDate ? new Date(hackathon.startDate).toDateString() : "N/A"}</p>
            <p>⏳ End: {hackathon?.endDate ? new Date(hackathon.endDate).toDateString() : "N/A"}</p>
          </div>

          <div className="flex gap-4 mt-6">
           
            <button
              className="w-full py-2 text-gray-800 transition bg-gray-200 rounded-2xl hover:bg-gray-300"
              onClick={() => navigate("/hackathons")}
            >
              Back to List
            </button>
          </div>

          <div className="mt-4">
            <button
              className="w-full py-2 text-white transition bg-red-600 rounded-2xl hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete Hackathon
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HackathonDetailsPage;
