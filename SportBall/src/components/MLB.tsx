import React, { useState } from 'react';
import axios from 'axios';
import "../assets/css/MLB.css";

const token = 'dfa1e699135555a17f14fe002ae4bb7aed835519fa412048';

interface PlayerInfo {
  longName: string;
  pos: string;
  teamAbv: string;
  mlbHeadshot: string;
}

function MLB() {
  const [playerName, setPlayerName] = useState('');
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const getPlayerInfo = async () => {
    const options = {
      method: 'GET',
      url: 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBPlayerInfo',
      params: {
        playerName: playerName,
        getStats: 'false',
      },
      headers: {
        'X-RapidAPI-Key': '14a168dfe5msh8a89a068ac60f21p1d8c63jsneb40ec59eebc',
        'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com',
      },
    };
  
    try {
      const response = await axios.request<{ body: PlayerInfo[] }>(options);
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
          team: playerInfo?.teamAbv,
          number: playerInfo?.jerseyNum,
          position: playerInfo?.pos,
        },
        {
          headers: {
            'X-RapidAPI-Key': '14a168dfe5msh8a89a068ac60f21p1d8c63jsneb40ec59eebc',
            'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com',
            'x-access-token': `Bearer ${token}`
          },
        }
      );
  
      console.log('Player saved to database:', response.data);
    } catch (error) {
      console.error('Error saving player to database:', error);
    }
  };
  

  return (
    <div className="mlb-container">
      <h1 className="mlb-heading">Player Information</h1>

      <div className="mlb-input-container">
        <label htmlFor="playerName">Enter Player Name:</label>
        <input
          type="text"
          id="playerName"
          placeholder="Enter player name"
          value={playerName}
          onChange={handleInputChange}
        />

        <button className="mlb-search-btn" onClick={getPlayerInfo}>
          Get Player Info
        </button>
      </div>

      {error && <div className="mlb-error">Error: {error}</div>}

      {playerInfo && (
        <div className="mlb-player-info">
          <h2>Player Info:</h2>
          <p>Name: {playerInfo.longName}</p>
          <p>Position: {playerInfo.pos}</p>
          <p>Team: {playerInfo.teamAbv}</p>
          <p>number:{playerInfo.jerseyNum}</p>

          {playerInfo.mlbHeadshot && (
            <img
              src={playerInfo.mlbHeadshot}
              alt={`${playerInfo.longName}'s picture`}
              className="mlb-player-image"
            />
          )}

          <button onClick={savePlayerToDatabase}>Save to Database</button>
        </div>
      )}
    </div>
  );
}

export default MLB;
