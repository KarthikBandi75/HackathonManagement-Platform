import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JudgeDashboard = () => {
  const navigate = useNavigate();

  // Mock data for submissions
  const [submissions, setSubmissions] = useState([
    { id: 1, team: "Team Alpha", status: "Pending" },
    { id: 2, team: "Innovators", status: "Reviewed" },
    { id: 3, team: "Tech Titans", status: "Pending" },
  ]);

  const totalSubmissions = submissions.length;
  const pendingReviews = submissions.filter((s) => s.status === "Pending").length;
  const completedReviews = totalSubmissions - pendingReviews;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Judge Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 text-white bg-blue-500 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Submissions</h2>
          <p className="text-2xl">{totalSubmissions}</p>
        </div>
        <div className="p-4 text-white bg-yellow-500 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Pending Reviews</h2>
          <p className="text-2xl">{pendingReviews}</p>
        </div>
        <div className="p-4 text-white bg-green-500 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Completed Reviews</h2>
          <p className="text-2xl">{completedReviews}</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Submissions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Team Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b">
                <td className="p-3">{submission.team}</td>
                <td className={`p-3 ${submission.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                  {submission.status}
                </td>
                <td className="p-3">
                  {submission.status === "Pending" && (
                    <button
                      className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                      onClick={() => navigate(`/review/${submission.id}`)}
                    >
                      Review
                    </button>
                  )}
                  {submission.status === "Reviewed" && (
                    <span className="text-gray-600">Reviewed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JudgeDashboard;
