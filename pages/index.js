import Head from 'next/head';
import { useState, useEffect } from 'react';
import Game from '../components/Game';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
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
      <Head>
        <title>Mexican Train Scorekeeper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Mexican Train Scorekeeper</h1>
        <Game gameData={gameData} setGameData={setGameData} />
        <Leaderboard leaderboard={gameData.leaderboard} />
      </main>

      <footer>
        Powered by Next.js
      </footer>
    </div>
  );
}
