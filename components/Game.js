import React, { useState } from 'react';

const Game = ({ gameData, setGameData }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentRoundScores, setCurrentRoundScores] = useState({});
  const [currentDoubleDomino, setCurrentDoubleDomino] = useState('');

  const addPlayer = () => {
    if (newPlayerName && !gameData.players.includes(newPlayerName)) {
      const updatedPlayers = [...gameData.players, newPlayerName];
      setGameData({ ...gameData, players: updatedPlayers });
      setNewPlayerName('');
    }
  };

  const handleScoreChange = (player, score) => {
    setCurrentRoundScores({ ...currentRoundScores, [player]: parseInt(score) || 0 });
  };

  const addRound = () => {
    if (gameData.players.length === 0) {
      alert('Please add players first.');
      return;
    }

    const newRound = {
      doubleDomino: currentDoubleDomino,
      scores: currentRoundScores,
      winner: null,
      points: {}
    };

    let minScore = Infinity;
    let roundWinner = null;

    // Calculate total points for each player and find the winner
    const updatedPlayers = gameData.players.reduce((acc, player) => {
      const score = currentRoundScores[player] || 0;
      const currentTotal = (gameData.rounds.length > 0 ? gameData.rounds.reduce((sum, r) => sum + (r.points[player] || 0), 0) : 0) + score;
      acc[player] = currentTotal;

      if (score < minScore) {
        minScore = score;
        roundWinner = player;
      } else if (score === minScore) {
        // Handle ties for winner (can be adjusted based on game rules)
        roundWinner = 'Tie';
      }
      return acc;
    }, {});

    newRound.winner = roundWinner;
    newRound.points = currentRoundScores; // Store individual round scores

    const updatedRounds = [...gameData.rounds, newRound];

    // Update leaderboard
    const newLeaderboard = {};
    gameData.players.forEach(player => {
      newLeaderboard[player] = updatedPlayers[player];
    });

    const updatedUsedDoubleDominoes = currentDoubleDomino ? [...gameData.usedDoubleDominoes, currentDoubleDomino] : gameData.usedDoubleDominoes;

    setGameData({
      ...gameData,
      rounds: updatedRounds,
      leaderboard: newLeaderboard,
      usedDoubleDominoes: updatedUsedDoubleDominoes
    });

    setCurrentRoundScores({});
    setCurrentDoubleDomino('');
  };

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {gameData.players.map(player => (
          <li key={player}>{player}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
        placeholder="Add new player"
      />
      <button onClick={addPlayer}>Add Player</button>

      <h2>New Round</h2>
      <div>
        <label>Double Domino Used:</label>
        <input
          type="text"
          value={currentDoubleDomino}
          onChange={(e) => setCurrentDoubleDomino(e.target.value)}
          placeholder="e.g., Double 12"
        />
      </div>
      {gameData.players.map(player => (
        <div key={player}>
          <label>{player} Score:</label>
          <input
            type="number"
            value={currentRoundScores[player] || ''}
            onChange={(e) => handleScoreChange(player, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addRound}>Add Round</button>

      <h2>Used Double Dominoes</h2>
      <ul>
        {gameData.usedDoubleDominoes.map((domino, index) => (
          <li key={index}>{domino}</li>
        ))}
      </ul>

      <h2>Rounds History</h2>
      {gameData.rounds.map((round, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h3>Round {index + 1}</h3>
          <p>Double Domino: {round.doubleDomino || 'N/A'}</p>
          <p>Winner: {round.winner}</p>
          <h4>Scores:</h4>
          <ul>
            {Object.entries(round.points).map(([player, score]) => (
              <li key={player}>{player}: {score} points</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Game;
