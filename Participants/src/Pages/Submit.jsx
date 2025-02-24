import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
  const [hackathonId, setHackathonId] = useState(''); 
  const [registrationId, setRegistrationId] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployLink, setDeployLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [pdf, setPdf] = useState(null); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!description || !githubLink || !deployLink || !videoLink) {
      setError('Please fill in all the required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('hackathonId', hackathonId);
      formData.append('registrationId', registrationId);
      formData.append('description', description);
      formData.append('githubLink', githubLink);
      formData.append('liveDemoLink', deployLink);
      formData.append('multimediaAttachments', videoLink);

      const submissonData = {
        "hackathonId": hackathonId,
        "registrationId": registrationId,
        "projectDetails": {
            "githubLink": githubLink,
            "liveDemoLink": deployLink,
            "multimediaAttachments": videoLink,
            "description": description
        }
      }
      

      const response = await axios.post('http://localhost:7555/api/user/submit', submissonData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccess(response.data.message);
      setTimeout(() => navigate('/my-registrations'), 3000); // Redirect after success
    } catch (error) {
      console.error('Error submitting project:', error);
      setError(error.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Submit Your Project</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Hackathon ID (required):</label>
          <input
            type="text"
            value={hackathonId}
            onChange={(e) => setHackathonId(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Registration ID (required):</label>
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Project Description (required):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            rows="4"
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>GitHub Link (required):</label>
          <input
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Live Demo Link (required):</label>
          <input
            type="url"
            value={deployLink}
            onChange={(e) => setDeployLink(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Video Link (required):</label>
          <input
            type="url"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default Submit;
