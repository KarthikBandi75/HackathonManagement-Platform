import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllHackathonsPage = () => {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const organizer = JSON.parse(localStorage.getItem("organizer")); // Get organizer object
    const organizerId = organizer?.id; // Extract organizerId

    if (!token || !organizerId) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }
    setAuthToken(token);

    const fetchHackathons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7555/hackathons/organizer/${organizerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Fixed the syntax for template literals
            },
          }
        );

        // Check if response contains expected data
        if (Array.isArray(response.data.hackathons)) {
          setHackathons(response.data.hackathons);
        } else if (Array.isArray(response.data)) {
          setHackathons(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load hackathons");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [navigate]);

  const handleRegister = async (hackathonId) => {
    try {
      const response = await axios.post(
        `http://localhost:7555/hackathons/${hackathonId}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Fixed the syntax for template literals
          },
        }
      );

      if (response.status === 200) {
        alert("Registered successfully!");
        navigate(`/hackathons/${hackathonId}`); // Fixed syntax for navigation path
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register for hackathon");
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h2 className="mb-8 text-4xl font-bold text-center text-purple-600">
        All Hackathons
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : hackathons.length === 0 ? (
        <p className="text-center text-gray-500">No hackathons available.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-purple-600">
                {hackathon.title}
              </h3>
              <p className="mb-4 text-gray-600">{hackathon.description}</p>
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Start Date: {new Date(hackathon.startDate).toDateString()}
                </span>
                <br />
                <span className="text-sm text-gray-500">
                  End Date: {new Date(hackathon.endDate).toDateString()}
                </span>
              </div>
             
              <button
                className="w-full py-2 text-gray-800 transition bg-gray-200 rounded-2xl hover:bg-gray-300"
                onClick={() => navigate(`/hackathons/${hackathon._id}`)} // Fixed syntax for navigation path
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AllHackathonsPage;
