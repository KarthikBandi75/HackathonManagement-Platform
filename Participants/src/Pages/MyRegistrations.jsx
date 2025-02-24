import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch registrations from the backend
  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:7555/api/user/my-registrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistrations(response.data.registrations || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setError(error.response?.data?.message || 'Failed to fetch registrations');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', fontSize: '18px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '24px', fontWeight: 'bold' }}>My Registrations</h2>
      {registrations.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No registrations found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {registrations.map((registration) => (
            <div
              key={registration._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
              }}
            >
              <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '20px', color: '#333' }}>
                {registration.hackathonId?.title || 'Hackathon Name Not Found'}
              </h3>
              <p>
                <strong>Team Name:</strong> {registration.teamName || 'No team name provided'}
              </p>
              <p>
                <strong>Team Lead:</strong>{' '}
                {typeof registration.teamLead === 'object' && registration.teamLead?.name
                  ? registration.teamLead.name
                  : registration.teamLead || 'No team lead provided'}
              </p>
              <p>
                <strong>Registration ID:</strong> {registration._id || 'No ID available'}
              </p>
              <p>
                <strong>Team Members:</strong>{' '}
                {Array.isArray(registration.teamMembers)
                  ? registration.teamMembers.map((member) => (typeof member === 'object' ? member.name : member)).join(', ')
                  : 'No members found'}
              </p>
              <p>
                <strong>Hackathon Date:</strong>{' '}
                {registration.hackathonId?.startDate
                  ? new Date(registration.hackathonId.startDate).toLocaleDateString()
                  : 'Date Not Available'}
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                  onClick={() => navigate('/submit')}
                >
                  Submit
                </button>
                <button
                  style={{
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                  onClick={() => alert('Request to Join Team button clicked')}
                >
                  Request to Join Team
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
