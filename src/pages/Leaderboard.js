import React from 'react';
import { Trophy, Medal, Star, TrendingUp, TrendingDown } from 'lucide-react';

const Leaderboard = () => {
  // Sample data for full season leaderboard
  const players = [
    { 
      name: 'Sean', 
      points: 32, 
      wins: 32, 
      total: 56, 
      winRate: '57.1%', 
      streak: 'W2',
      trend: 'up',
      lastFive: [true, false, true, true, false]
    },
    { 
      name: 'Gaz', 
      points: 30, 
      wins: 30, 
      total: 54, 
      winRate: '55.6%',
      streak: 'L1',
      trend: 'down',
      lastFive: [false, true, true, false, true]
    },
    { 
      name: 'Joe', 
      points: 27, 
      wins: 27, 
      total: 52, 
      winRate: '51.9%',
      streak: 'W3',
      trend: 'up',
      lastFive: [true, true, true, false, false]
    },
    { 
      name: 'Dean', 
      points: 25, 
      wins: 25, 
      total: 50, 
      winRate: '50.0%',
      streak: 'L2',
      trend: 'down',
      lastFive: [false, false, true, true, true]
    },
  ];

  return (
    <div className="wwe-container py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-impact uppercase tracking-wider mb-4">
          Leaderboard
        </h1>
        <p className="text-zinc-400">
          Season standings for the 4 players in the Super Cool Betting Club
        </p>
      </div>

      {/* Main leaderboard */}
      <div className="wwe-card p-6 mb-8">
        <div className="overflow-x-auto">
          <table className="wwe-table">
            <thead>
              <tr>
                <th className="w-16">Rank</th>
                <th>Player</th>
                <th>Points</th>
                <th>Wins</th>
                <th>Total Bets</th>
                <th>Win Rate</th>
                <th>Streak</th>
                <th>Last 5</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.name} className="hover:bg-zinc-800">
                  <td>
                    <div className="flex items-center justify-center">
                      {index === 0 ? (
                        <Trophy className="h-6 w-6 text-wwe-gold" />
                      ) : index === 1 ? (
                        <Medal className="h-6 w-6 text-wwe-silver" />
                      ) : index === 2 ? (
                        <Medal className="h-6 w-6 text-amber-700" />
                      ) : (
                        <span className="text-lg font-bold text-zinc-500">{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="font-impact text-lg text-white">{player.name}</td>
                  <td className="font-bold text-wwe-yellow">{player.points}</td>
                  <td>{player.wins}</td>
                  <td>{player.total}</td>
                  <td>{player.winRate}</td>
                  <td>{player.streak}</td>
                  <td>
                    <div className="flex space-x-1">
                      {player.lastFive.map((win, i) => (
                        <div 
                          key={i} 
                          className={`w-3 h-3 rounded-full ${win ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    {player.trend === 'up' ? (
                      <TrendingUp className="text-green-500 h-5 w-5" />
                    ) : (
                      <TrendingDown className="text-red-500 h-5 w-5" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coming soon: more detailed stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="wwe-card p-6 text-center">
          <Star className="h-12 w-12 text-wwe-gold mx-auto mb-4" />
          <h2 className="text-2xl font-impact text-wwe-gold mb-2">Season Stats</h2>
          <p className="text-zinc-400">
            Detailed player statistics coming soon!
          </p>
        </div>
        <div className="wwe-card p-6 text-center">
          <TrendingUp className="h-12 w-12 text-wwe-gold mx-auto mb-4" />
          <h2 className="text-2xl font-impact text-wwe-gold mb-2">Performance Trends</h2>
          <p className="text-zinc-400">
            Detailed trend analysis coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 