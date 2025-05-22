import { useAuction } from '../contexts/AuctionContext';

export const useAuctionData = () => {
  const {
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
  } = useAuction();

  return {
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

  };
};