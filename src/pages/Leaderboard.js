import React from 'react';
import { Trophy, Medal, Star, TrendingUp, TrendingDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBetting } from '../context/BettingContext';
import Layout from '../components/layout/Layout';

const Leaderboard = () => {
  const { players, loading, getPlayerStatistics } = useBetting();
  
  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get player statistics for each player
  const playersArray = Object.keys(players).map(playerName => {
    const stats = getPlayerStatistics(playerName);
    return stats;
  }).filter(Boolean); // Remove any null values
  
  // Sort players by points (descending)
  const sortedPlayers = [...playersArray].sort((a, b) => b.points - a.points);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-4">
            Leaderboard
          </h1>
          <p className="text-zinc-400">
            Season standings for the 4 players in the Super Cool Betting Club
          </p>
        </div>

        {/* Main leaderboard */}
        <div className="bg-zinc-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent">
              <thead className="border-b border-zinc-700">
                <tr>
                  <th className="w-16 py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Rank</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Player</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Points</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Wins</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Bets</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Win Rate</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Streak</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Last 5</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Trend</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {sortedPlayers.map((player, index) => (
                  <tr key={player.name} className="hover:bg-zinc-700 transition-colors cursor-pointer">
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-4 font-bold text-lg text-white">{player.name}</td>
                    <td className="py-4 px-4 font-bold text-lg text-wwe-yellow">{player.points}</td>
                    <td className="py-4 px-4">{player.wins}</td>
                    <td className="py-4 px-4">{player.totalBets}</td>
                    <td className="py-4 px-4">{player.winRate}%</td>
                    <td className="py-4 px-4">
                      {player.streak ? (
                        <span className={`px-2 py-1 rounded text-xs font-bold ${player.streak.type === 'W' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                          {player.streak.type}{player.streak.count}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-1 justify-center">
                        {player.last5 && player.last5.map((result, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${result ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                        ))}
                        {(!player.last5 || player.last5.length === 0) && '-'}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {player.trend === 'UP' ? (
                        <TrendingUp className="text-green-500 h-5 w-5 inline" />
                      ) : player.trend === 'DOWN' ? (
                        <TrendingDown className="text-red-500 h-5 w-5 inline" />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Link 
                        to={`/player/${player.name}`}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-wwe-red hover:bg-wwe-red/80 text-white rounded font-bold text-sm transition-colors"
                      >
                        <User size={14} />
                        VIEW
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional information cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-zinc-800 rounded-lg shadow-lg p-8 text-center">
            <Star className="h-12 w-12 text-wwe-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-wwe-gold mb-2">SEASON STATS</h2>
            <p className="text-zinc-400">
              Track your performance across different bet types and weekly results.
            </p>
          </div>
          
          <div className="bg-zinc-800 rounded-lg shadow-lg p-8 text-center">
            <TrendingUp className="h-12 w-12 text-wwe-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-wwe-gold mb-2">PERFORMANCE TRENDS</h2>
            <p className="text-zinc-400">
              See who's hot and who's not with our detailed performance analytics.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;