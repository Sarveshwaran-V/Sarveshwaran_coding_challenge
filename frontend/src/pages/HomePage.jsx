import React, { useState, useEffect } from 'react';
import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';
import BulkDelete from '../components/BulkDelete';

const API_URL = 'http://localhost:9091/api/players';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSave = async (playerData) => {
    const isEditing = !!playerData.playerId;
    const url = isEditing ? `${API_URL}/${playerData.playerId}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Validation failed');
    }

    setEditingPlayer(null);
    fetchPlayers();
  };

  const handleDelete = async (playerId) => {
    if (!window.confirm('Are you sure you want to delete this player?')) return;
    try {
      const response = await fetch(`${API_URL}/${playerId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleBulkDelete = async (role, teamName) => {
    const response = await fetch(`${API_URL}/role/${encodeURIComponent(role)}/team/${encodeURIComponent(teamName)}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to perform bulk delete');
    }
    
    fetchPlayers();
  };

  return (
    <div className="layout">
      <div>
        <PlayerForm 
          onSave={handleSave} 
          editingPlayer={editingPlayer} 
          onCancel={() => setEditingPlayer(null)} 
        />
        <BulkDelete onBulkDelete={handleBulkDelete} />
      </div>
      <div>
        <PlayerList 
          players={players} 
          onEdit={setEditingPlayer} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
};

export default HomePage;
