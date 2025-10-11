"use client";

import { useState, useEffect } from 'react';
import { useGame } from '../lib/game-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import DominoButton from '../components/ui/domino-button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function Page() {
  const { players, addPlayer, clearGameData, rounds, leaderboard, startNewRound, recordRoundScores } = useGame();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedStartingDomino, setSelectedStartingDomino] = useState(null);
  const [currentRoundScores, setCurrentRoundScores] = useState({});

  useEffect(() => {
    // Initialize currentRoundScores when players change or a new round starts
    const initialScores = {};
    if (players && Array.isArray(players)) {
      players.forEach(player => {
        initialScores[player] = ''; // Use empty string for initial input state
      });
    }
    setCurrentRoundScores(initialScores);
  }, [players, rounds.length]); // Depend on players and rounds.length to re-initialize for new rounds

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const handleStartRound = () => {
    if (selectedStartingDomino && players.length > 0) {
      startNewRound(selectedStartingDomino);
      setSelectedStartingDomino(null); // Reset selected domino after starting round
    }
  };

  const handleScoreChange = (player, score) => {
    setCurrentRoundScores(prev => ({
      ...prev,
      [player]: score,
    }));
  };

  const handleRecordScores = () => {
    const scoresToRecord = {};
    let allScoresEntered = true;
    for (const player of players) {
      const score = parseInt(currentRoundScores[player], 10);
      if (isNaN(score)) {
        allScoresEntered = false;
        break;
      }
      scoresToRecord[player] = score;
    }

    if (allScoresEntered) {
      recordRoundScores(scoresToRecord);
      // Reset scores for next round
      const resetScores = {};
      if (players && Array.isArray(players)) {
        players.forEach(player => resetScores[player] = '');
      }
      setCurrentRoundScores(resetScores);
    } else {
      alert('Please enter scores for all players.');
    }
  };

  // Generate double dominoes for selection
  const allDoubleDominoes = Array.from({ length: 13 }, (_, i) => i).map((i) => ({ value1: i, value2: i }));

  // Filter out used double dominoes for starting a round
  const usedStartingDominoes = rounds.map(round => round.startingDomino);
  const availableDoubleDominoes = allDoubleDominoes.filter(domino =>
    !usedStartingDominoes.some(used => used.value1 === domino.value1 && used.value2 === domino.value2)
  );

  const currentRound = rounds[rounds.length - 1];

  return (
    <div>
      <main className="container mx-auto py-8">
        <h1 className="text-5xl font-extrabold text-center mb-8 drop-shadow-lg">Mexican Train Scorekeeper</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Enter player name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddPlayer();
                  }
                }}
              />
              <Button onClick={handleAddPlayer}>Add Player</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {players.map((player) => (
                <span key={player} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {player}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {players.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Start New Round</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Select Starting Domino:</h3>
              <div className="grid grid-cols-6 gap-2 mb-4">
                {availableDoubleDominoes.map((domino) => (
                  <DominoButton
                    key={`${domino.value1}-${domino.value2}`}
                    value1={domino.value1}
                    value2={domino.value2}
                    onClick={() => setSelectedStartingDomino(domino)}
                    isSelected={selectedStartingDomino?.value1 === domino.value1 && selectedStartingDomino?.value2 === domino.value2}
                  />
                ))}
              </div>
              <Button onClick={handleStartRound} disabled={!selectedStartingDomino || rounds.length > 0 && !currentRound?.winner}>Start Round</Button>
            </CardContent>
          </Card>
        )}

        {currentRound && !currentRound.winner && players.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Round {rounds.length} - Starting Domino: {currentRound.startingDomino.value1}-{currentRound.startingDomino.value2}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Enter Scores:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {players.map(player => (
                  <div key={player} className="flex items-center space-x-2">
                    <label className="w-1/3">{player}:</label>
                    <Input
                      type="number"
                      value={currentRoundScores[player]}
                      onChange={(e) => handleScoreChange(player, e.target.value)}
                      className="w-2/3"
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleRecordScores}>Record Scores</Button>
            </CardContent>
          </Card>
        )}

        {rounds.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Round History</CardTitle>
            </CardHeader>
            <CardContent>
              {rounds.map((round, index) => (
                <div key={index} className="mb-4 p-2 border rounded">
                  <h3 className="font-bold">Round {index + 1} - Starting Domino: {round.startingDomino.value1}-{round.startingDomino.value2}</h3>
                  <ul>
                    {Object.entries(round.scores).map(([player, score]) => (
                      <li key={player}>{player}: {score} points</li>
                    ))}
                  </ul>
                  {round.winner && <p className="font-semibold">Winner: {round.winner}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {players.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(leaderboard)
                  .sort(([, scoreA], [, scoreB]) => scoreA - scoreB) // Sort by lowest score first
                  .map(([player, score]) => (
                    <li key={player} className="flex justify-between items-center">
                      <span className="font-semibold">{player}</span>
                      <span className="text-lg">{score}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <section className="mb-8">
          <Button variant="destructive" onClick={clearGameData}>Clear All Game Data</Button>
        </section>
      </main>

      <footer className="text-center mt-8 text-gray-200">
        Powered by Next.js
      </footer>
    </div>
  );
}
