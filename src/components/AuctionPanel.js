import React, { useState } from 'react';

const AuctionPanel = ({ player, teams, placeBid, sellPlayer, isAuctionLive }) => {
  const [bidAmount, setBidAmount] = useState(player.basePrice);

  const handleBidSubmit = (teamId) => {
    if (bidAmount <= (player.currentBid || player.basePrice - 1)) {
      alert('Bid must be higher than current bid!');
      return;
    }
    placeBid(teamId, bidAmount);
    setBidAmount(bidAmount + 1);
  };

  return (
    <div className="auction-panel">
      <h2>Auction: {player.name}</h2>
      <div className="player-info">
        <p>Role: {player.role}</p>
        <p>Base Price: ${player.basePrice}</p>
        <p>Current Bid: ${player.currentBid || 'No bids yet'}</p>
      </div>
      
      <div className="bid-controls">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          min={(player.currentBid || player.basePrice) + 1}
          step="1"
        />
        
        <div className="team-buttons">
          {teams.map(team => (
            <button 
              key={team.id} 
              onClick={() => handleBidSubmit(team.id)}
              disabled={!isAuctionLive || team.budget - team.spent < bidAmount}
            >
              {team.name} (${team.budget - team.spent} left)
            </button>
          ))}
        </div>
        
        <button 
          onClick={sellPlayer}
          disabled={!player.biddingTeamId}
          className="sell-button"
        >
          Sell to Highest Bidder
        </button>
      </div>
    </div>
  );
};

export default AuctionPanel;