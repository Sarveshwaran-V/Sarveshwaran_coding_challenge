import React, { useState } from 'react';

const BulkDelete = ({ onBulkDelete }) => {
  const [role, setRole] = useState('Batsman');
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setError('Team name is required');
      return;
    }
    setError(null);
    
    if (window.confirm(`Are you sure you want to delete all ${role}s from team "${teamName}"?`)) {
      try {
        await onBulkDelete(role, teamName.trim());
        setTeamName(''); // clear on success
      } catch (err) {
        setError(err.message || 'Failed to perform bulk delete');
      }
    }
  };

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <h2 style={{ color: 'var(--danger-color)' }}>Danger Zone: Bulk Delete</h2>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
        Remove all players of a specific role from a specific team.
      </p>
      
      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
            <option value="Wicket-Keeper">Wicket-Keeper</option>
          </select>
        </div>

        <div className="form-group">
          <label>Team Name</label>
          <input 
            type="text" 
            placeholder="Enter exact team name"
            value={teamName} 
            onChange={(e) => setTeamName(e.target.value)} 
          />
        </div>

        <button type="submit" className="btn-danger" style={{ width: '100%' }}>
          Delete Matching Players
        </button>
      </form>
    </div>
  );
};

export default BulkDelete;
