import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const Leaderboard = () => {
  const [sortBy, setSortBy] = useState('points');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mock data - would come from API in real app
  const players = [
    { 
      id: 1, 
      name: 'Sean', 
      avatar: 'S',
      points: 34, 
      bets: 21, 
      wins: 11, 
      winRate: 52.4, 
      streak: 'W W L W W',
      form: 'up'
    },
    { 
      id: 2, 
      name: 'Gaz', 
      avatar: 'G',
      points: 32, 
      bets: 19, 
      wins: 13, 
      winRate: 68.4, 
      streak: 'W W W L W',
      form: 'up'
    },
    { 
      id: 3, 
      name: 'Joe', 
      avatar: 'J',
      points: 31, 
      bets: 19, 
      wins: 12, 
      winRate: 63.2, 
      streak: 'W L W W L',
      form: 'neutral'
    },
    { 
      id: 4, 
      name: 'Dean', 
      avatar: 'D',
      points: 17, 
      bets: 19, 
      wins: 10, 
      winRate: 52.6, 
      streak: 'L L W L L',
      form: 'down'
    }
  ];

  // Sort players
  const sortedPlayers = [...players].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

  // Handle column header click to change sort
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  // Get the position badge color
  const getPositionColor = (position) => {
    switch (position) {
      case 1: return 'bg-yellow-500'; // Gold
      case 2: return 'bg-gray-300'; // Silver
      case 3: return 'bg-amber-700'; // Bronze
      default: return 'bg-metal-gray';
    }
  };

  // Get form icon
  const getFormIcon = (form) => {
    switch (form) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <Trophy className="w-10 h-10 text-secondary mr-4" />
        <h1 className="text-4xl md:text-5xl font-title text-primary">LEADERBOARD</h1>
      </div>

      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b-2 border-primary">
                <th className="py-4 px-4 font-title text-lg uppercase">Position</th>
                <th className="py-4 px-4 font-title text-lg uppercase">Player</th>
                <th 
                  className={`py-4 px-4 font-title text-lg uppercase cursor-pointer ${sortBy === 'points' ? 'text-primary' : ''}`}
                  onClick={() => handleSort('points')}
                >
                  Points {sortBy === 'points' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className={`py-4 px-4 font-title text-lg uppercase cursor-pointer ${sortBy === 'bets' ? 'text-primary' : ''}`}
                  onClick={() => handleSort('bets')}
                >
                  Bets {sortBy === 'bets' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className={`py-4 px-4 font-title text-lg uppercase cursor-pointer ${sortBy === 'wins' ? 'text-primary' : ''}`}
                  onClick={() => handleSort('wins')}
                >
                  Wins {sortBy === 'wins' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className={`py-4 px-4 font-title text-lg uppercase cursor-pointer ${sortBy === 'winRate' ? 'text-primary' : ''}`}
                  onClick={() => handleSort('winRate')}
                >
                  Win Rate {sortBy === 'winRate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-4 px-4 font-title text-lg uppercase">Streak</th>
                <th className="py-4 px-4 font-title text-lg uppercase">Form</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr 
                  key={player.id} 
                  className={index % 2 === 0 ? 'bg-metal-gray bg-opacity-10' : ''}
                >
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${getPositionColor(index + 1)}`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                        {player.avatar}
                      </div>
                      <span className="font-bold">{player.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-xl">
                    {player.points}
                  </td>
                  <td className="py-4 px-4">
                    {player.bets}
                  </td>
                  <td className="py-4 px-4">
                    {player.wins}
                  </td>
                  <td className="py-4 px-4 font-bold">
                    {player.winRate.toFixed(1)}%
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-1">
                      {player.streak.split(' ').map((result, idx) => (
                        <div 
                          key={idx} 
                          className={`w-6 h-6 flex items-center justify-center rounded-sm 
                            ${result === 'W' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getFormIcon(player.form)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 