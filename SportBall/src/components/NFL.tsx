import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/NFL.css'; 

const token = 'dfa1e699135555a17f14fe002ae4bb7aed835519fa412048';

interface PlayerInfo {
  longName: string;
  pos: string;
  teamAbv: string;
  espnHeadshot : string;
}
function NFL() {
  const [playerName, setPlayerName] = useState('');
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const getPlayerInfo = async () => {
    const options = {
      method: 'GET',
      url: 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerInfo',
      params: {
        playerName: playerName,
        getStats: 'false',
      },
      headers: {
        'X-RapidAPI-Key': '14a168dfe5msh8a89a068ac60f21p1d8c63jsneb40ec59eebc',
        'X-RapidAPI-Host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
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
            'X-RapidAPI-Host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
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
    <div className="nfl-container">
      <h1 className="nfl-heading">NFL Player Information</h1>

      <div className="nfl-input-container">
        <label htmlFor="playerName">Enter Player Name:</label>
        <input
          type="text"
          id="playerName"
          placeholder="Enter player name"
          value={playerName}
          onChange={handleInputChange}
        />
      </div>

      <button className="nfl-search-btn" onClick={getPlayerInfo}>
        Get Player Info
      </button>

      {error && <div className="nfl-error">Error: {error}</div>}

      {playerInfo && (
        <div className="nfl-player-info">
          <h2>Player Info:</h2>
          <p>Name: {playerInfo.longName}</p>
          <p>Position: {playerInfo.pos}</p>
          <p>Team: {playerInfo.team}</p>
          <p>Number: {playerInfo.jerseyNum}</p>

          {playerInfo.espnHeadshot && (
            <img
              className="nfl-player-image"
              src={playerInfo.espnHeadshot}
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

export default NFL;
