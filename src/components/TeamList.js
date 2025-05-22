import React, { useState } from 'react';
import DeleteConfirmation from './DeleteConfirmation';

const TeamList = ({ 
  teams, 
  players, 
  addTeam, 
  removeTeam 
}) => {
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [budget, setBudget] = useState(1000);

  const handleDeleteTeam = (teamId) => {
    setTeamToDelete(teamId);
  };

  const confirmTeamDelete = () => {
    removeTeam(teamToDelete);
    setTeamToDelete(null);
  };

  const cancelTeamDelete = () => {
    setTeamToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    addTeam(teamName, budget);
    setTeamName('');
    setBudget(1000);
  };

  return (
    <div className="team-list">
      <h2>Teams</h2>
      
      <form onSubmit={handleSubmit} className="team-form">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team name"
          required
        />
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          min="500"
          max="2000"
          step="50"
        />
        <button type="submit">Add Team</button>
      </form>
      
      <div className="team-grid">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <div className="team-header">
              <h3>{team.name}</h3>
              <button 
                onClick={() => handleDeleteTeam(team.id)}
                className="delete-btn"
              >
                Remove Team
              </button>
            </div>
            <p>Budget: ${team.budget - team.spent} remaining (${team.spent} spent)</p>
            <h4>Squad:</h4>
            <ul>
              {team.players.map(playerId => {
                const player = players.find(p => p.id === playerId);
                return player ? <li key={playerId}>{player.name} (${player.currentBid})</li> : null;
              })}
            </ul>
          </div>
        ))}
      </div>

      <DeleteConfirmation
        isOpen={teamToDelete !== null}
        onCancel={cancelTeamDelete}
        onConfirm={confirmTeamDelete}
        message={`Are you sure you want to remove this team? All players from this team will become available again.`}
      />
    </div>
  );
};

export default TeamList;