import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PlayerList from './components/PlayersList'; 
import TeamList from './components/TeamList';
import AuctionPanel from './components/AuctionPanel';
import PlayerForm from './components/PlayerForm';
import { useAuctionData } from './hooks/useAuction';
import './App.css';

const AppMain = () => {
  const [activeTab, setActiveTab] = useState('players');
  const {
    players,
    teams,
    currentPlayer,
    isAuctionLive,
    loading,
    error,
    addPlayer,
    addTeam,
    startAuction,
    placeBid,
    sellPlayer,
    removePlayer,
    removeTeam 
  } = useAuctionData();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container">
        {activeTab === 'players' && (
          <>
            <PlayerForm addPlayer={addPlayer} />
            <PlayerList 
              players={players} 
              startAuction={startAuction} 
              currentPlayer={currentPlayer}
              removePlayer={removePlayer} 
            />
          </>
        )}
        
        {activeTab === 'teams' && (
          <TeamList 
            teams={teams} 
            players={players} 
            addTeam={addTeam} 
            removeTeam={removeTeam}
          />
        )}
        
        {activeTab === 'auction' && currentPlayer && (
          <AuctionPanel 
            player={currentPlayer} 
            teams={teams} 
            placeBid={placeBid} 
            sellPlayer={sellPlayer}
            isAuctionLive={isAuctionLive}
          />
        )}
      </div>
    </div>
  );
};

export default AppMain;