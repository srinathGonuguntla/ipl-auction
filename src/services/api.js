import axios from 'axios';

const API_BASE_URL = 'https://cricket.sportmonks.com/api/v2.0/players'; 

export const fetchPlayers = async () => {
  try {
  
    const response = await axios.get(`${API_BASE_URL}/players`);
    return response.data;
  } catch (error) {
    console.error('API failed, using mock data:', error);
   
  }
};

export const saveAuctionResult = async (playerId, teamId, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auction`, {
      playerId,
      teamId,
      amount
    });
    return response.data;
  } catch (error) {
    console.error('Error saving auction result:', error);
    throw error;
  }
};