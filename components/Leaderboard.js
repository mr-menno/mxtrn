import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  const sortedLeaderboard = Object.entries(leaderboard).sort(([, scoreA], [, scoreB]) => scoreA - scoreB);

  return (
    <div>
      <h2>Leaderboard</h2>
      {sortedLeaderboard.length === 0 ? (
        <p>No scores yet. Start a round!</p>
      ) : (
        <ol>
          {sortedLeaderboard.map(([player, score]) => (
            <li key={player}>
              {player}: {score} points
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Leaderboard;
