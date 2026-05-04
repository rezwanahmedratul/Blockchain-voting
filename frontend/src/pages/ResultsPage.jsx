import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const ResultsPage = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get('/results');
      setResults(res.data);
    } catch (err) {
      setError('Failed to fetch results.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-container"><h2>Loading results...</h2></div>;

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  return (
    <div className="page-container" style={{ padding: '2rem 0', alignItems: 'flex-start' }}>
      <h2>Live Election Results</h2>
      <p style={{ marginBottom: '2rem' }}>Total Votes Cast: {totalVotes}</p>
      
      {error && <div style={{ color: '#ff6b6b' }}>{error}</div>}

      <div className="glass-panel" style={{ width: '100%' }}>
        {Object.keys(results).length === 0 ? (
          <p>No results available yet.</p>
        ) : (
          Object.entries(results)
            .sort((a, b) => b[1] - a[1]) // sort by vote count descending
            .map(([name, count]) => {
              const percentage = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);
              return (
                <div key={name} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>{name}</strong>
                    <span>{count} votes ({percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'var(--bg-card)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${percentage}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #b091ff, #8a64ff)',
                        transition: 'width 1s ease-in-out'
                      }} 
                    />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
