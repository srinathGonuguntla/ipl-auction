import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { saveDataToStorage, loadDataFromStorage } from '../services/storage';
import { fetchPlayers } from '../services/api';

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isAuctionLive, setIsAuctionLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadInitialData = async () => {
      try {
      
        const savedData = loadDataFromStorage();
        
        if (savedData) {
          setPlayers(savedData.players || []);
          setTeams(savedData.teams || []);
        } else {
         
          const apiPlayers = await fetchPlayers();
          setPlayers(apiPlayers);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);


  useEffect(() => {
    if (!loading) {
      saveDataToStorage({ players, teams });
    }
  }, [players, teams, loading]);

  const addPlayer = (player) => {
    setPlayers([...players, { ...player, id: Date.now(), sold: false }]);
  };

  const updatePlayer = (updatedPlayer) => {
    setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
  };

  const removePlayer = (playerId) => {
  setPlayers(players.filter(player => player.id !== playerId));

  setTeams(teams.map(team => ({
    ...team,
    players: team.players.filter(id => id !== playerId)
  })));
};


  const addTeam = (teamName, budget) => {
    setTeams([...teams, {
      id: Date.now(),
      name: teamName,
      budget: budget,
      players: [],
      spent: 0
    }]);
  };

  const removeTeam = (teamId) => {
  setTeams(teams.filter(team => team.id !== teamId));
  
   setPlayers(players.map(player => {
    if (player.teamId === teamId) {
      return {
        ...player,
        teamId: null,
        sold: false,
        currentBid: null,
        biddingTeamId: null
      };
    }
    return player;
  }));
};

  const startAuction = (playerId) => {
    const player = players.find(p => p.id === playerId);
    setCurrentPlayer(player);
    setIsAuctionLive(true);
  };

  const placeBid = (teamId, amount) => {
    if (!isAuctionLive || !currentPlayer) return;

    const team = teams.find(t => t.id === teamId);
    if (team.budget - team.spent < amount) {
      alert('Team does not have enough budget!');
      return;
    }

    const updatedPlayer = {
      ...currentPlayer,
      currentBid: amount,
      biddingTeamId: teamId
    };
    updatePlayer(updatedPlayer);
    setCurrentPlayer(updatedPlayer);
  };

  const sellPlayer = () => {
    if (!isAuctionLive || !currentPlayer || !currentPlayer.biddingTeamId) return;

    const teamIndex = teams.findIndex(t => t.id === currentPlayer.biddingTeamId);
    if (teamIndex === -1) return;

    const updatedTeams = [...teams];
    updatedTeams[teamIndex] = {
      ...updatedTeams[teamIndex],
      players: [...updatedTeams[teamIndex].players, currentPlayer.id],
      spent: updatedTeams[teamIndex].spent + (currentPlayer.currentBid || 0)
    };

    const updatedPlayers = players.map(p => 
      p.id === currentPlayer.id 
        ? { ...p, sold: true, teamId: currentPlayer.biddingTeamId } 
        : p
    );

    setTeams(updatedTeams);
    setPlayers(updatedPlayers);
    setIsAuctionLive(false);
    setCurrentPlayer(null);
  };

  return (
    <AuctionContext.Provider
      value={{
        players,
        teams,
        currentPlayer,
        isAuctionLive,
        loading,
        error,
        addPlayer,
        updatePlayer,
        addTeam,
        startAuction,
        placeBid,
        sellPlayer,
        removePlayer,
        removeTeam
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};