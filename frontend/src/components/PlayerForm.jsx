import React, { useState, useEffect } from 'react';

const PlayerForm = ({ onSave, editingPlayer, onCancel }) => {
  const [formData, setFormData] = useState({
    playerName: '',
    jerseyNumber: '',
    role: 'Batsman',
    totalMatches: '',
    teamName: '',
    countryOrState: '',
    description: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingPlayer) {
      setFormData(editingPlayer);
    } else {
      setFormData({
        playerName: '',
        jerseyNumber: '',
        role: 'Batsman',
        totalMatches: '',
        teamName: '',
        countryOrState: '',
        description: ''
      });
    }
  }, [editingPlayer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await onSave({
        ...formData,
        jerseyNumber: parseInt(formData.jerseyNumber),
        totalMatches: parseInt(formData.totalMatches)
      });
    } catch (err) {
      setError(err.message || 'Failed to save player');
    }
  };

  return (
    <div className="card">
      <h2>{editingPlayer ? 'Edit Player' : 'Add New Player'}</h2>
      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Player Name</label>
          <input required name="playerName" value={formData.playerName} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Jersey Number</label>
          <input required type="number" name="jerseyNumber" value={formData.jerseyNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select required name="role" value={formData.role} onChange={handleChange}>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
            <option value="Wicket-Keeper">Wicket-Keeper</option>
          </select>
        </div>

        <div className="form-group">
          <label>Total Matches</label>
          <input required type="number" name="totalMatches" value={formData.totalMatches} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Team Name</label>
          <input required name="teamName" value={formData.teamName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Country / State</label>
          <input required name="countryOrState" value={formData.countryOrState} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn-primary">
            {editingPlayer ? 'Update Player' : 'Add Player'}
          </button>
          {editingPlayer && (
            <button type="button" className="btn-danger" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
