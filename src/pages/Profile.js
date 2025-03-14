import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Trophy, 
  Award, 
  Star, 
  BarChart3,
  Target,
  CheckCircle,
  XCircle,
  TrendingUp,
  Edit
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Profile = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('Sean');

  // Sample player data
  const players = {
    Sean: {
      name: 'Sean',
      points: 32,
      wins: 32,
      total: 56,
      winRate: 57.1,
      currentPicks: 2,
      avatar: '😎',
      favoriteTeam: 'Liverpool',
      favoriteBet: 'Full Time Result',
      mostSuccessfulBet: 'Full Time Result (62%)',
      leastSuccessfulBet: 'Both Teams To Score (43%)',
      bestCompetition: 'Premier League',
      longestStreak: 'W4',
      pickHistory: [
        { week: 'Week 19', result: 'win', bet: 'Liverpool Win' },
        { week: 'Week 20', result: 'loss', bet: 'BTTS - Yes' },
        { week: 'Week 21', result: 'win', bet: 'Over 2.5' },
        { week: 'Week 22', result: 'win', bet: 'Man City Win' },
        { week: 'Week 23', result: 'loss', bet: 'Chelsea Win' },
      ],
      betTypeData: [
        { name: 'Full Time Result', value: 32 },
        { name: 'Both Teams To Score', value: 12 },
        { name: 'Over/Under', value: 8 },
        { name: 'Handicap', value: 4 },
      ],
      weeklyPerformance: [
        { week: 'W18', winRate: 50 },
        { week: 'W19', winRate: 100 },
        { week: 'W20', winRate: 0 },
        { week: 'W21', winRate: 100 },
        { week: 'W22', winRate: 100 },
        { week: 'W23', winRate: 50 },
      ]
    },
    Gaz: {
      name: 'Gaz',
      points: 30,
      wins: 30,
      total: 54,
      winRate: 55.6,
      currentPicks: 1,
      avatar: '🧢',
      favoriteTeam: 'Arsenal',
      favoriteBet: 'Both Teams To Score',
      mostSuccessfulBet: 'Handicap (60%)',
      leastSuccessfulBet: 'Over/Under (45%)',
      bestCompetition: 'Champions League',
      longestStreak: 'W3',
      pickHistory: [
        { week: 'Week 19', result: 'win', bet: 'Arsenal Win' },
        { week: 'Week 20', result: 'win', bet: 'BTTS - Yes' },
        { week: 'Week 21', result: 'win', bet: 'Under 2.5' },
        { week: 'Week 22', result: 'loss', bet: 'Tottenham Win' },
        { week: 'Week 23', result: 'loss', bet: 'BTTS - Yes' },
      ],
      betTypeData: [
        { name: 'Full Time Result', value: 20 },
        { name: 'Both Teams To Score', value: 24 },
        { name: 'Over/Under', value: 6 },
        { name: 'Handicap', value: 4 },
      ],
      weeklyPerformance: [
        { week: 'W18', winRate: 100 },
        { week: 'W19', winRate: 100 },
        { week: 'W20', winRate: 100 },
        { week: 'W21', winRate: 100 },
        { week: 'W22', winRate: 0 },
        { week: 'W23', winRate: 0 },
      ]
    },
    Joe: {
      name: 'Joe',
      points: 27,
      wins: 27,
      total: 52,
      winRate: 51.9,
      currentPicks: 1,
      avatar: '🎮',
      favoriteTeam: 'Chelsea',
      favoriteBet: 'Over/Under',
      mostSuccessfulBet: 'Both Teams To Score (58%)',
      leastSuccessfulBet: 'Full Time Result (47%)',
      bestCompetition: 'FA Cup',
      longestStreak: 'W3',
      pickHistory: [
        { week: 'Week 19', result: 'loss', bet: 'Chelsea Win' },
        { week: 'Week 20', result: 'win', bet: 'Over 2.5' },
        { week: 'Week 21', result: 'win', bet: 'BTTS - Yes' },
        { week: 'Week 22', result: 'win', bet: 'Over 2.5' },
        { week: 'Week 23', result: 'win', bet: 'Man City Win' },
      ],
      betTypeData: [
        { name: 'Full Time Result', value: 15 },
        { name: 'Both Teams To Score', value: 12 },
        { name: 'Over/Under', value: 22 },
        { name: 'Handicap', value: 3 },
      ],
      weeklyPerformance: [
        { week: 'W18', winRate: 50 },
        { week: 'W19', winRate: 0 },
        { week: 'W20', winRate: 100 },
        { week: 'W21', winRate: 100 },
        { week: 'W22', winRate: 100 },
        { week: 'W23', winRate: 100 },
      ]
    },
    Dean: {
      name: 'Dean',
      points: 25,
      wins: 25,
      total: 50,
      winRate: 50.0,
      currentPicks: 2,
      avatar: '🏆',
      favoriteTeam: 'Man Utd',
      favoriteBet: 'Handicap',
      mostSuccessfulBet: 'Full Time Result (54%)',
      leastSuccessfulBet: 'Handicap (46%)',
      bestCompetition: 'Europa League',
      longestStreak: 'W2',
      pickHistory: [
        { week: 'Week 19', result: 'win', bet: 'Man Utd Win' },
        { week: 'Week 20', result: 'win', bet: 'Handicap -1' },
        { week: 'Week 21', result: 'loss', bet: 'Under 2.5' },
        { week: 'Week 22', result: 'loss', bet: 'Man Utd Win' },
        { week: 'Week 23', result: 'win', bet: 'BTTS - No' },
      ],
      betTypeData: [
        { name: 'Full Time Result', value: 22 },
        { name: 'Both Teams To Score', value: 8 },
        { name: 'Over/Under', value: 10 },
        { name: 'Handicap', value: 10 },
      ],
      weeklyPerformance: [
        { week: 'W18', winRate: 0 },
        { week: 'W19', winRate: 100 },
        { week: 'W20', winRate: 100 },
        { week: 'W21', winRate: 0 },
        { week: 'W22', winRate: 0 },
        { week: 'W23', winRate: 100 },
      ]
    }
  };

  const COLORS = ['#FF0000', '#FFD700', '#1E88E5', '#7B1FA2'];

  const currentPlayer = players[selectedPlayer];

  return (
    <div className="wwe-container py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-impact uppercase tracking-wider mb-4">
          Player Profile
        </h1>
        <p className="text-zinc-400">
          View detailed stats and performance for each player
        </p>
      </div>

      {/* Player Selector */}
      <div className="wwe-card p-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.keys(players).map(player => (
            <button
              key={player}
              className={`px-6 py-3 rounded font-impact uppercase tracking-wider transition-all ${
                selectedPlayer === player 
                  ? 'bg-wwe-red text-white transform scale-105 shadow-lg' 
                  : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}
              onClick={() => setSelectedPlayer(player)}
            >
              {player}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Header */}
      <div className="wwe-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar */}
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-wwe">
            {currentPlayer.avatar}
          </div>

          {/* Player Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
              <div>
                <h2 className="text-4xl font-impact text-wwe-gold mb-2">{currentPlayer.name}</h2>
                <p className="text-zinc-400 flex items-center">
                  <Star className="h-4 w-4 text-wwe-yellow mr-1" />
                  <span>Favorite Team: <span className="text-white">{currentPlayer.favoriteTeam}</span></span>
                </p>
              </div>
              <button className="wwe-button mt-4 md:mt-0 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-zinc-800/50 p-3 rounded">
                <p className="text-xs text-zinc-500 uppercase font-bold">Points</p>
                <p className="text-2xl font-impact text-wwe-yellow">{currentPlayer.points}</p>
              </div>
              <div className="bg-zinc-800/50 p-3 rounded">
                <p className="text-xs text-zinc-500 uppercase font-bold">Win Rate</p>
                <p className="text-2xl font-impact text-green-400">{currentPlayer.winRate}%</p>
              </div>
              <div className="bg-zinc-800/50 p-3 rounded">
                <p className="text-xs text-zinc-500 uppercase font-bold">Current Picks</p>
                <p className="text-2xl font-impact text-blue-400">{currentPlayer.currentPicks}</p>
              </div>
              <div className="bg-zinc-800/50 p-3 rounded">
                <p className="text-xs text-zinc-500 uppercase font-bold">Longest Streak</p>
                <p className="text-2xl font-impact text-purple-400">{currentPlayer.longestStreak}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Picks */}
        <div className="wwe-card p-6">
          <div className="flex items-center mb-4">
            <Trophy className="h-6 w-6 text-wwe-gold mr-2" />
            <h2 className="text-2xl font-impact text-wwe-gold">Recent Picks</h2>
          </div>
          <div className="space-y-4">
            {currentPlayer.pickHistory.map((pick, index) => (
              <div key={index} className="flex items-center justify-between border-b border-zinc-700 pb-2 last:border-0">
                <div className="flex items-center">
                  {pick.result === 'win' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <div>
                    <p className="text-white">{pick.bet}</p>
                    <p className="text-xs text-zinc-500">{pick.week}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  pick.result === 'win' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                }`}>
                  {pick.result === 'win' ? 'WIN' : 'LOSS'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="wwe-card p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-wwe-gold mr-2" />
            <h2 className="text-2xl font-impact text-wwe-gold">Weekly Performance</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={currentPlayer.weeklyPerformance}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="week" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="winRate" 
                  stroke="#FF0000" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#FFD700', stroke: '#FF0000', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#FF0000' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Betting Distribution */}
        <div className="wwe-card p-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-6 w-6 text-wwe-gold mr-2" />
            <h2 className="text-2xl font-impact text-wwe-gold">Bet Type Distribution</h2>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentPlayer.betTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {currentPlayer.betTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="wwe-card p-6">
          <h3 className="text-xl font-impact text-wwe-gold mb-4">Performance Summary</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Target className="h-5 w-5 text-wwe-red mr-2 mt-0.5" />
              <div>
                <p className="text-white font-bold">Favorite Bet Type</p>
                <p className="text-zinc-400">{currentPlayer.favoriteBet}</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <p className="text-white font-bold">Most Successful Bet</p>
                <p className="text-zinc-400">{currentPlayer.mostSuccessfulBet}</p>
              </div>
            </li>
            <li className="flex items-start">
              <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <p className="text-white font-bold">Least Successful Bet</p>
                <p className="text-zinc-400">{currentPlayer.leastSuccessfulBet}</p>
              </div>
            </li>
            <li className="flex items-start">
              <Award className="h-5 w-5 text-wwe-gold mr-2 mt-0.5" />
              <div>
                <p className="text-white font-bold">Best Competition</p>
                <p className="text-zinc-400">{currentPlayer.bestCompetition}</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="wwe-card p-6">
          <h3 className="text-xl font-impact text-wwe-gold mb-4">Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 mb-1">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-3 py-2 rounded"
                value={currentPlayer.name}
                readOnly
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Favorite Team</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 text-white px-3 py-2 rounded">
                <option>{currentPlayer.favoriteTeam}</option>
                <option>Arsenal</option>
                <option>Chelsea</option>
                <option>Liverpool</option>
                <option>Man City</option>
                <option>Man Utd</option>
                <option>Tottenham</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Notification Settings</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="notify-fixtures" className="mr-2" checked />
                  <label htmlFor="notify-fixtures" className="text-white">New fixture alerts</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="notify-results" className="mr-2" checked />
                  <label htmlFor="notify-results" className="text-white">Results notifications</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="notify-reminders" className="mr-2" checked />
                  <label htmlFor="notify-reminders" className="text-white">Pick reminders</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 