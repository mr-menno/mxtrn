"use client";

import { useState, useEffect } from 'react';
import Game from '../components/Game';
import Leaderboard from '../components/Leaderboard';

export default function Page() {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    // Load game data from local storage
    const storedGameData = localStorage.getItem('mexicanTrainGame');
    if (storedGameData) {
      setGameData(JSON.parse(storedGameData));
    } else {
      // Initialize new game data if none exists
      setGameData({
        rounds: [],
        players: [],
        leaderboard: {},
        usedDoubleDominoes: []
      });
    }
  }, []);

  useEffect(() => {
    // Save game data to local storage whenever it changes
    if (gameData) {
      localStorage.setItem('mexicanTrainGame', JSON.stringify(gameData));
    }
  }, [gameData]);

  if (!gameData) {
    return <div>Loading game...</div>;
  }

  return (
    <div>

      <main className="container mx-auto py-8">
        <h1 className="text-5xl font-extrabold text-center mb-8 drop-shadow-lg">Mexican Train Scorekeeper</h1>
        <Game gameData={gameData} setGameData={setGameData} />
        <Leaderboard leaderboard={gameData.leaderboard} />
      </main>

      <footer className="text-center mt-8 text-gray-200">
        Powered by Next.js
      </footer>
    </div>
  );
}
