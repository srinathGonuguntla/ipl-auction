import React, { useState } from 'react';
import DeleteConfirmation from './DeleteConfirmation';
import { useAuction } from '../contexts/AuctionContext';

const PlayerList = ({ 
  startAuction, 
  currentPlayer,
}) => {
    const { players, removePlayer } = useAuction();
  const [playerToDelete, setPlayerToDelete] = useState(null);

  const handleDeleteClick = (playerId) => {
    setPlayerToDelete(playerId);
  };

  const confirmDelete = () => {
    removePlayer(playerToDelete);
    setPlayerToDelete(null);
  };

  const cancelDelete = () => {
    setPlayerToDelete(null);
  };

  return (
    <div className="player-list">
      <h2>Player List</h2>
      <div className="player-grid">
        {players.map(player => (
          <div 
            key={player.id} 
            className={`player-card ${player.sold ? 'sold' : ''} ${currentPlayer?.id === player.id ? 'highlight' : ''}`}
          >
            <h3>{player.name}</h3>
            <p>Role: {player.role}</p>
            <p>Base Price: ${player.basePrice}</p>
            <p>Country: {player.country}</p>
            <div className="player-actions">
              {!player.sold && (
                <button 
                  onClick={() => startAuction(player.id)}
                  disabled={currentPlayer !== null}
                >
                  Start Auction
                </button>
              )}
              <button 
                onClick={() => handleDeleteClick(player.id)}
                className="delete-btn"
              >
                Remove
              </button>
            </div>
            {player.currentBid && (
              <p>Current Bid: ${player.currentBid} by Team {player.biddingTeamId}</p>
            )}
          </div>
        ))}
      </div>

      <DeleteConfirmation
        isOpen={playerToDelete !== null}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        message={`Are you sure you want to remove this player? This action cannot be undone.`}
      />
    </div>
  );
};

export default PlayerList;