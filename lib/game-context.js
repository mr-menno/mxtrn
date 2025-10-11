"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [leaderboard, setLeaderboard] = useState({});

  // Load state from local storage on initial render
  useEffect(() => {
    const storedPlayers = localStorage.getItem('mxtrn_players');
    const storedRounds = localStorage.getItem('mxtrn_rounds');
    const storedLeaderboard = localStorage.getItem('mxtrn_leaderboard');

    if (storedPlayers) setPlayers(JSON.parse(storedPlayers));
    if (storedRounds) setRounds(JSON.parse(storedRounds));
    if (storedLeaderboard) setLeaderboard(JSON.parse(storedLeaderboard));
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('mxtrn_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('mxtrn_rounds', JSON.stringify(rounds));
  }, [rounds]);

  const calculateLeaderboard = useCallback(() => {
    const newLeaderboard = {};
    if (players && Array.isArray(players)) {
      players.forEach(player => {
        newLeaderboard[player] = 0;
      });
    }

    rounds.forEach(round => {
      for (const player in round.scores) {
        if (newLeaderboard.hasOwnProperty(player)) {
          newLeaderboard[player] += round.scores[player];
        }
      }
    });
    setLeaderboard(newLeaderboard);
    localStorage.setItem('mxtrn_leaderboard', JSON.stringify(newLeaderboard));
  }, [players, rounds]);

  useEffect(() => {
    calculateLeaderboard();
  }, [rounds, players, calculateLeaderboard]);

  const addPlayer = (playerName) => {
    setPlayers((prevPlayers) => {
      if (!prevPlayers.includes(playerName)) {
        return [...prevPlayers, playerName];
      }
      return prevPlayers;
    });
  };

  const startNewRound = (startingDomino) => {
    setRounds((prevRounds) => [
      ...prevRounds,
      { startingDomino, scores: {}, winner: null },
    ]);
  };

  const recordRoundScores = (roundScores) => {
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      const currentRoundIndex = updatedRounds.length - 1;

      if (currentRoundIndex >= 0) {
        const currentRound = { ...updatedRounds[currentRoundIndex] };
        currentRound.scores = roundScores;

        // Determine winner (player with the lowest score in the round)
        let winner = null;
        let minScore = Infinity;
        for (const player in roundScores) {
          if (roundScores[player] < minScore) {
            minScore = roundScores[player];
            winner = player;
          } else if (roundScores[player] === minScore) {
            // Handle ties if necessary, for now, first lowest wins
          }
        }
        currentRound.winner = winner;
        updatedRounds[currentRoundIndex] = currentRound;
      }
      return updatedRounds;
    });
  };

  const clearGameData = () => {
    localStorage.removeItem('mxtrn_players');
    localStorage.removeItem('mxtrn_rounds');
    localStorage.removeItem('mxtrn_leaderboard');
    setPlayers([]);
    setRounds([]);
    setLeaderboard({});
  };

  return (
    <GameContext.Provider
      value={{
        players,
        addPlayer,
        rounds,
        leaderboard,
        clearGameData,
        startNewRound,
        recordRoundScores,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);