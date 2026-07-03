import React from 'react';

const PlayerList = ({ players, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Team Roster</h2>
      {players.length === 0 ? (
        <p>No players found. Add some players to your team!</p>
      ) : (
        <div className="grid">
          {players.map(player => (
            <div key={player.playerId} className="card">
              <h3>{player.playerName} (#{player.jerseyNumber})</h3>
              <p><strong>Role:</strong> {player.role}</p>
              <p><strong>Team:</strong> {player.teamName}</p>
              <p><strong>Matches:</strong> {player.totalMatches}</p>
              <p><strong>Origin:</strong> {player.countryOrState}</p>
              {player.description && <p><em>{player.description}</em></p>}
              
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => onEdit(player)}
                >
                  Edit
                </button>
                <button 
                  className="btn-danger" 
                  onClick={() => onDelete(player.playerId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerList;
