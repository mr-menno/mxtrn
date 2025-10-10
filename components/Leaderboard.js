import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Leaderboard = ({ leaderboard }) => {
  const sortedLeaderboard = Object.entries(leaderboard).sort(([, scoreA], [, scoreB]) => scoreA - scoreB);

  return (
    <Card className="mt-4 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedLeaderboard.length === 0 ? (
          <p className="text-gray-600">No scores yet. Start a round!</p>
        ) : (
          <ol className="list-decimal pl-5 text-gray-800">
            {sortedLeaderboard.map(([player, score]) => (
              <li key={player} className="text-lg">
                {player}: {score} points
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;