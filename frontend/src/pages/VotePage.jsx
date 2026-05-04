import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const VotePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get('/admin/candidates');
      setCandidates(res.data);
    } catch (err) {
      setError('Failed to load candidates.');
    } finally {
      setLoading(false);
    }
  };

  const castVote = async (candidateId) => {
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/vote', { candidateId });
      setSuccess(res.data.message || 'Vote cast successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cast vote. You may have already voted.');
    }
  };

  if (loading) return <div className="page-container"><h2>Loading candidates...</h2></div>;

  return (
    <div className="page-container" style={{ padding: '2rem 0', alignItems: 'flex-start' }}>
      <h2>Cast Your Vote</h2>
      <p style={{ marginBottom: '2rem' }}>Please select one candidate carefully. Votes are recorded immutably on the blockchain.</p>
      
      {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', width: '100%', padding: '1rem', background: 'rgba(255,0,0,0.1)', borderRadius: '8px' }}>{error}</div>}
      {success && <div style={{ color: '#4ade80', marginBottom: '1rem', width: '100%', padding: '1rem', background: 'rgba(0,255,0,0.1)', borderRadius: '8px' }}>{success}</div>}

      {candidates.length === 0 ? (
        <p>No candidates available.</p>
      ) : (
        <div className="card-grid">
          {candidates.map(candidate => (
            <div key={candidate.id} className="card">
              <h3>{candidate.name}</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--primary-accent)' }}>Party: {candidate.party}</p>
              <button 
                className="btn" 
                style={{ width: '100%' }}
                onClick={() => castVote(candidate.id)}
              >
                Vote for {candidate.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotePage;
