import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/NBA.css'; 

const token = 'dfa1e699135555a17f14fe002ae4bb7aed835519fa412048';

interface PlayerInfo {
  longName: string;
  pos: string;
  teamAbv: string;
  nbaComHeadshot: string;
}

function NBA() {
  const [playerName, setPlayerName] = useState('');
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const getPlayerInfo = async () => {
    const options = {
      method: 'GET',
      url: 'https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo',
      params: {
        statsToGet: 'averages',
        playerName: playerName,
      },
      headers: {
        'X-RapidAPI-Key': '14a168dfe5msh8a89a068ac60f21p1d8c63jsneb40ec59eebc',
        'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setPlayerInfo(response.data.body[0]);
      setError(null);
    } catch (error) {
      console.error('Error getting player info:', error);
      setError('Error getting player info. Please try again.');
    }
  };

  const savePlayerToDatabase = async () => {
    try {
      const response = await axios.post(
        'https://sbbe.onrender.com/api/save_player_from_api',
        {
          name: playerInfo?.longName,
          team: playerInfo?.team,
          number: playerInfo?.jerseyNum,
          position: playerInfo?.pos,
        },
        {
          headers: {
            'X-RapidAPI-Key': '14a168dfe5msh8a89a068ac60f21p1d8c63jsneb40ec59eebc',
            'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com',
            'x-access-token': `Bearer ${token}`
          },
        }
      );
  
      console.log('Player info saved to database:', response.data);
    } catch (error) {
      console.error('Error saving player info:', error);
    }
  };

  return (
    <div className="nba-container">
      <h1 className="nba-heading">NBA Player Information</h1>

      <div className="nba-input-container">
        <label htmlFor="playerName">Enter Player Name:</label>
        <input
          type="text"
          id="playerName"
          placeholder="Enter player name"
          value={playerName}
          onChange={handleInputChange}
        />
      </div>

      <button className="nba-search-btn" onClick={getPlayerInfo}>
        Get Player Info
      </button>

      {error && <div className="nba-error">Error: {error}</div>}

      {playerInfo && (
        <div className="nba-player-info">
          <h2>Player Info:</h2>
          <p>Name: {playerInfo.longName}</p>
          <p>Position: {playerInfo.pos}</p>
          <p>Team: {playerInfo.team}</p>
          <p>number:{playerInfo.jerseyNum}</p>


          {playerInfo.nbaComHeadshot && (
            <img
              src={playerInfo.nbaComHeadshot}
              alt={`${playerInfo.longName}'s picture`}
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          )}

          <button onClick={savePlayerToDatabase}>Save Player Info</button>
        </div>
      )}
    </div>
  );
}

export default NBA;
