import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [blockchain, setBlockchain] = useState([]);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    fetchBlockchain();
  }, []);

  const fetchBlockchain = async () => {
    try {
      const res = await api.get('/blockchain');
      setBlockchain(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    try {
      await api.post('/admin/candidate', { name, party });
      setMessage({ text: 'Candidate added successfully!', type: 'success' });
      setName('');
      setParty('');
    } catch (err) {
      setMessage({ text: 'Failed to add candidate.', type: 'error' });
    }
  };

  const validateChain = async () => {
    setValidating(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await api.get('/blockchain/validate');
      setMessage({ text: res.data.message || 'Blockchain is valid.', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Blockchain is compromised!', type: 'error' });
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard</h2>
      
      {message.text && (
        <div style={{ 
          color: message.type === 'success' ? '#4ade80' : '#ff6b6b', 
          marginBottom: '1.5rem',
          padding: '1rem',
          background: message.type === 'success' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
          borderRadius: '8px'
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Add Candidate Form */}
        <div className="glass-panel" style={{ flex: '1 1 300px' }}>
          <h3>Add New Candidate</h3>
          <form onSubmit={handleAddCandidate} style={{ marginTop: '1.5rem' }}>
            <div className="form-group">
              <label>Candidate Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Party</label>
              <input type="text" value={party} onChange={e => setParty(e.target.value)} required />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Add Candidate</button>
          </form>
        </div>

        {/* Blockchain Control */}
        <div className="glass-panel" style={{ flex: '2 1 500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Blockchain Explorer</h3>
            <button className="btn btn-secondary" onClick={validateChain} disabled={validating}>
              {validating ? 'Validating...' : 'Verify Integrity'}
            </button>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
            {blockchain.map(block => (
              <div key={block.index} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                <p><strong>Block Index:</strong> {block.index}</p>
                <p><strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}</p>
                <p style={{ wordBreak: 'break-all' }}><strong>Hash:</strong> <span style={{ color: 'var(--primary-accent)' }}>{block.hash}</span></p>
                <p style={{ wordBreak: 'break-all' }}><strong>Previous:</strong> {block.previousHash}</p>
                <div style={{ marginTop: '0.5rem', background: '#000', padding: '0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#4ade80' }}>{block.data}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
