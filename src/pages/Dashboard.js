import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  ChevronRight, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Target
} from 'lucide-react';

const Dashboard = () => {
  // Sample data for stats
  const stats = [
    { 
      title: 'Total Bets', 
      value: '256', 
      icon: <Target className="h-8 w-8 text-wwe-gold" />,
      change: '+24 this month',
      trend: 'up'
    },
    { 
      title: 'Total Wins', 
      value: '148', 
      icon: <CheckCircle className="h-8 w-8 text-wwe-gold" />,
      change: '+12 this month',
      trend: 'up'
    },
    { 
      title: 'Win Rate', 
      value: '57.8%', 
      icon: <BarChart3 className="h-8 w-8 text-wwe-gold" />,
      change: '+2.4% from last month',
      trend: 'up'
    },
    { 
      title: 'Current Week', 
      value: '24', 
      icon: <Calendar className="h-8 w-8 text-wwe-gold" />,
      change: 'Picks due Friday',
      trend: 'neutral'
    },
  ];

  // Sample data for leaderboard
  const leaderboard = [
    { name: 'Sean', points: 32, picksThisWeek: 2, trend: 'up' },
    { name: 'Gaz', points: 30, picksThisWeek: 1, trend: 'down' },
    { name: 'Joe', points: 27, picksThisWeek: 1, trend: 'up' },
    { name: 'Dean', points: 25, picksThisWeek: 2, trend: 'down' },
  ];

  // Sample data for current bets
  const currentBets = [
    { player: 'Sean', fixture: 'Liverpool vs Arsenal', prediction: 'Liverpool Win', type: 'Full Time Result' },
    { player: 'Sean', fixture: 'Man City vs Chelsea', prediction: 'Over 2.5', type: 'Over/Under' },
    { player: 'Gaz', fixture: 'Tottenham vs Man Utd', prediction: 'Tottenham Win', type: 'Full Time Result' },
    { player: 'Joe', fixture: 'Newcastle vs Brighton', prediction: 'BTTS', type: 'Both Teams To Score' },
    { player: 'Dean', fixture: 'Aston Villa vs Wolves', prediction: 'Aston Villa -1', type: 'Handicap' },
    { player: 'Dean', fixture: 'Everton vs Leeds', prediction: 'Under 2.5', type: 'Over/Under' },
  ];

  return (
    <div className="wwe-container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-impact uppercase tracking-wider mb-4 md:mb-0">
          Betting Dashboard
        </h1>
        <div className="flex space-x-4">
          <Link 
            to="/fixtures" 
            className="wwe-button flex items-center"
          >
            <Calendar className="mr-2 h-5 w-5" />
            <span>Week 24 Fixtures</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="wwe-card p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-zinc-400 uppercase text-sm font-bold tracking-wider">{stat.title}</p>
                <p className="text-3xl font-impact text-white mt-1">{stat.value}</p>
                <p className={`text-xs mt-2 ${
                  stat.trend === 'up' ? 'text-green-400' : 
                  stat.trend === 'down' ? 'text-red-400' : 'text-zinc-400'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="bg-wwe-black/50 p-3 rounded-full">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <div className="wwe-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-impact text-wwe-gold">Leaderboard</h2>
            <Link to="/leaderboard" className="text-wwe-red hover:text-wwe-gold flex items-center text-sm">
              <span>Full Standings</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {leaderboard.map((player, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    index === 0 ? 'bg-wwe-gold text-black' : 
                    index === 1 ? 'bg-wwe-silver text-black' : 
                    index === 2 ? 'bg-amber-700 text-white' : 
                    'bg-zinc-700 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <p className="font-impact text-white">{player.name}</p>
                    <p className="text-xs text-zinc-400">Picks this week: {player.picksThisWeek}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-impact text-wwe-yellow">{player.points}</p>
                  <p className="text-xs text-zinc-400">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Week's Bets */}
        <div className="wwe-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-impact text-wwe-gold">Week 24 Bets</h2>
            <Link to="/fixtures" className="text-wwe-red hover:text-wwe-gold flex items-center text-sm">
              <span>All Bets</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[320px]">
            {currentBets.map((bet, index) => (
              <div key={index} className="border-b border-zinc-700 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`w-1 h-10 rounded-full mr-3 ${
                      bet.player === 'Sean' ? 'bg-blue-500' : 
                      bet.player === 'Gaz' ? 'bg-green-500' : 
                      bet.player === 'Joe' ? 'bg-yellow-500' : 
                      'bg-purple-500'
                    }`} />
                    <div>
                      <p className="font-impact text-white">{bet.player}</p>
                      <p className="text-xs text-zinc-400">{bet.fixture}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-wwe-yellow">{bet.prediction}</p>
                    <p className="text-xs text-zinc-400">{bet.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Fixtures */}
        <div className="wwe-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-impact text-wwe-gold">Upcoming Fixtures</h2>
            <Link to="/fixtures" className="text-wwe-red hover:text-wwe-gold flex items-center text-sm">
              <span>All Fixtures</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            <div className="border-b border-zinc-700 pb-3">
              <p className="text-xs text-zinc-400 uppercase font-bold">Saturday, 10 Dec</p>
              <div className="mt-2 space-y-3">
                <div className="flex justify-between">
                  <p className="text-white">Liverpool vs Arsenal</p>
                  <p className="text-zinc-400 text-sm">15:00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-white">Man City vs Chelsea</p>
                  <p className="text-zinc-400 text-sm">17:30</p>
                </div>
              </div>
            </div>
            <div className="border-b border-zinc-700 pb-3">
              <p className="text-xs text-zinc-400 uppercase font-bold">Sunday, 11 Dec</p>
              <div className="mt-2 space-y-3">
                <div className="flex justify-between">
                  <p className="text-white">Tottenham vs Man Utd</p>
                  <p className="text-zinc-400 text-sm">14:00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-white">Newcastle vs Brighton</p>
                  <p className="text-zinc-400 text-sm">16:30</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase font-bold">Monday, 12 Dec</p>
              <div className="mt-2 space-y-3">
                <div className="flex justify-between">
                  <p className="text-white">Aston Villa vs Wolves</p>
                  <p className="text-zinc-400 text-sm">20:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 