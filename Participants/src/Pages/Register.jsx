import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { id } = useParams(); // Hackathon ID
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamLead, setTeamLead] = useState({ name: "", email: "" });
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);


  // useEffect(() => {
  //   const fetchHackathon = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:7555/api/user/isAlreadyRegistered`, {
  //           email: "varshithakudum@gmail.com"
  //         }
  //       );
  //       if (response.data.status) {
  //         setIsAlreadyRegistered(true);
  //       }

  //       // Initialize teamMembers based on team size
  //       setTeamMembers(Array(response.data.teamSize).fill({ name: "", email: "" }));
  //     } catch (err) {
  //       setError(err.response?.data?.error || "Failed to load hackathon details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHackathon();
  // }, [id]);
  
  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7555/api/user/view-hackathon/${id}`
        );
        setHackathon(response.data);

        // Initialize teamMembers based on team size
        setTeamMembers(Array(response.data.teamSize).fill({ name: "", email: "" }));
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load hackathon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        `http://localhost:7555/api/user/register`,
        {
          hackathonId: id,
          teamName,
          teamLead,
          teamMembers,
          isRegisterd: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => navigate("/My-Registrations"), 2000); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register.");
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-64 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Register for {hackathon?.title}</h1>

        {successMessage && (
          <div className="p-4 mb-4 text-green-600 bg-green-100 rounded-lg">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 text-red-600 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Team Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Team Name (must be unique)</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          {/* Team Lead */}
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Team Leader Details</h2>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={teamLead.name}
                onChange={(e) => setTeamLead({ ...teamLead, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                value={teamLead.email}
                onChange={(e) => setTeamLead({ ...teamLead, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Team Members</h2>
            {teamMembers.map((member, index) => (
              <div key={index} className="mb-4">
                <div className="mb-2">
                  <label className="block mb-1">Member {index + 1} Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={member.name}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "name", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Member {index + 1} Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg"
                    value={member.email}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "email", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Submit Registration
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
