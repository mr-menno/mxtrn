import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Confetti from 'react-confetti';

const Game = ({ gameData, setGameData }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentRoundScores, setCurrentRoundScores] = useState({});
  const [currentDoubleDomino, setCurrentDoubleDomino] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

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
    setShowConfetti(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // Show confetti for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="container mx-auto p-4">
      {showConfetti && <Confetti />}
      <Card className="mb-4 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Players</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 mb-4 text-gray-800">
            {gameData.players.map(player => (
              <li key={player} className="text-lg">{player}</li>
            ))}
          </ul>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Add new player"
              className="flex-grow bg-white text-gray-800 border-gray-300"
            />
            <Button onClick={addPlayer} className="bg-blue-500 hover:bg-blue-600 text-white">Add Player</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>New Round</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Double Domino Used:</label>
            <Input
              type="text"
              value={currentDoubleDomino}
              onChange={(e) => setCurrentDoubleDomino(e.target.value)}
              placeholder="e.g., Double 12"
              className="bg-white text-gray-800 border-gray-300"
            />
          </div>
          {gameData.players.map(player => (
            <div key={player} className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{player} Score:</label>
              <Input
                type="number"
                value={currentRoundScores[player] || ''}
                onChange={(e) => handleScoreChange(player, e.target.value)}
                className="bg-white text-gray-800 border-gray-300"
              />
            </div>
          ))}
          <Button onClick={addRound} className="mt-4 bg-green-500 hover:bg-green-600 text-white">Add Round</Button>
        </CardContent>
      </Card>

      <Card className="mb-4 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Used Double Dominoes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-gray-800">
            {gameData.usedDoubleDominoes.map((domino, index) => (
              <li key={index} className="text-lg">{domino}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Rounds History</CardTitle>
        </CardHeader>
        <CardContent>
          {gameData.rounds.map((round, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 last:mb-0 bg-gray-50 text-gray-800">
              <h3 className="text-xl font-semibold mb-2">Round {index + 1}</h3>
              <p className="mb-1">Double Domino: {round.doubleDomino || 'N/A'}</p>
              <p className="mb-1">Winner: {round.winner}</p>
              <h4 className="text-lg font-medium mt-2">Scores:</h4>
              <ul className="list-disc pl-5">
                {Object.entries(round.points).map(([player, score]) => (
                  <li key={player}>{player}: {score} points</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;
