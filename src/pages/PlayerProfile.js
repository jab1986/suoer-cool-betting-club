import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBetting } from '../context/BettingContext';
import { Layout } from '../components/layout';
import {
  BarChart3,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Percent,
  Target,
  History
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PlayerProfile = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const { 
    getPlayerById, 
    getPlayerStats, 
    getPlayerBets, 
    getWinRate, 
    getPlayerCurrentStreak,
    getRecentResults,
    getPlayerPerformanceData,
    getBetTypeDistribution,
    getPlayerMonthlyPerformance
  } = useBetting();
  
  // Get player data
  const player = getPlayerById(playerId);
  if (!player) {
    return <div>Player not found</div>;
  }
  
  const stats = getPlayerStats(playerId);
  const bets = getPlayerBets(playerId).slice(0, 10); // Get last 10 bets
  const winRate = getWinRate(playerId);
  const streak = getPlayerCurrentStreak(playerId);
  const recentResults = getRecentResults(playerId, 10);
  const performanceData = getPlayerPerformanceData(playerId);
  const betTypeDistribution = getBetTypeDistribution(playerId);
  const monthlyPerformance = getPlayerMonthlyPerformance(playerId);
  
  // COLORS for charts
  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'];
  const WIN_COLOR = '#10b981';
  const LOSS_COLOR = '#ef4444';
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get trend direction
  const getTrendDirection = () => {
    if (performanceData.length < 2) return 'STABLE';
    
    const last = performanceData[performanceData.length - 1].winRate;
    const secondLast = performanceData[performanceData.length - 2].winRate;
    
    if (last > secondLast) return 'UP';
    if (last < secondLast) return 'DOWN';
    return 'STABLE';
  };
  
  const trendDirection = getTrendDirection();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-colors rounded-md"
        >
          <ChevronLeft size={20} />
          Back to Stats
        </button>
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
          {/* Avatar */}
          <div 
            className="w-36 h-36 rounded-lg border-4 border-wwe-red bg-zinc-800 flex items-center justify-center text-4xl font-bold text-wwe-gold"
          >
            {player.name.charAt(0)}
          </div>
          
          <div className="flex-1">
            {/* Player Name */}
            <h1 className="text-4xl font-bold text-wwe-gold mb-2">{player.name}</h1>
            
            {/* Player Bio */}
            <p className="text-lg text-zinc-300 mb-4">{player.bio || "WWE Betting Club Member"}</p>
            
            {/* Stats Summary */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg min-w-[100px]">
                <div className="text-3xl font-bold text-wwe-gold">{stats.totalBets}</div>
                <div className="text-sm text-zinc-400">Total Bets</div>
              </div>
              
              <div className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg min-w-[100px]">
                <div className="text-3xl font-bold text-wwe-gold">{stats.wins}</div>
                <div className="text-sm text-zinc-400">Wins</div>
              </div>
              
              <div className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg min-w-[100px]">
                <div className="text-3xl font-bold text-wwe-gold">{stats.points}</div>
                <div className="text-sm text-zinc-400">Points</div>
              </div>
              
              <div className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg min-w-[100px]">
                <div className="text-3xl font-bold text-wwe-gold flex items-center">
                  {winRate}%
                  <div className="ml-2">
                    {trendDirection === 'UP' && <TrendingUp size={16} className="text-green-500" />}
                    {trendDirection === 'DOWN' && <TrendingUp size={16} className="text-red-500 rotate-180" />}
                  </div>
                </div>
                <div className="text-sm text-zinc-400">Win Rate</div>
              </div>
              
              <div className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg min-w-[100px]">
                <div className="text-3xl font-bold text-wwe-gold flex items-center gap-2">
                  {streak.count}
                  <span className={`text-sm font-normal ${streak.type === 'W' ? 'text-green-500' : 'text-red-500'}`}>
                    {streak.type === 'W' ? 'WIN' : 'LOSS'}
                  </span>
                </div>
                <div className="text-sm text-zinc-400">Current Streak</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Form */}
        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-wwe-gold mb-4">
            <History size={24} />
            Recent Form
          </h2>
          
          <div className="flex gap-2 mb-4">
            {recentResults.map((result, index) => (
              <div 
                key={index} 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${result ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                title={result ? 'Win' : 'Loss'}
              >
                {result ? 'W' : 'L'}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Current Streak:</span>
            <span className={`px-2 py-1 rounded font-bold ${streak.type === 'W' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {streak.count} {streak.type === 'W' ? 'WIN' : 'LOSS'}
            </span>
          </div>
        </div>
        
        {/* Performance Charts */}
        <h2 className="flex items-center gap-3 text-2xl font-bold text-wwe-gold mb-4">
          <BarChart3 size={24} />
          Performance Analytics
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Win Rate Trend */}
          <div className="bg-zinc-800 rounded-lg p-6 h-96">
            <h3 className="text-xl font-bold text-wwe-yellow mb-4">Win Rate Trend</h3>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46' }}
                  labelStyle={{ color: '#f4f4f5' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="winRate" 
                  name="Win Rate %"
                  stroke="#f59e0b" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Bet Type Distribution */}
          <div className="bg-zinc-800 rounded-lg p-6 h-96">
            <h3 className="text-xl font-bold text-wwe-yellow mb-4">Bet Type Distribution</h3>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={betTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {betTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46' }}
                  labelStyle={{ color: '#f4f4f5' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Monthly Performance */}
          <div className="bg-zinc-800 rounded-lg p-6 h-96">
            <h3 className="text-xl font-bold text-wwe-yellow mb-4">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46' }}
                  labelStyle={{ color: '#f4f4f5' }}
                />
                <Legend />
                <Bar dataKey="wins" name="Wins" fill={WIN_COLOR} />
                <Bar dataKey="losses" name="Losses" fill={LOSS_COLOR} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Win Rate by Bet Type */}
          <div className="bg-zinc-800 rounded-lg p-6 h-96">
            <h3 className="text-xl font-bold text-wwe-yellow mb-4">Win Rate by Bet Type</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={betTypeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46' }}
                  labelStyle={{ color: '#f4f4f5' }}
                />
                <Legend />
                <Bar dataKey="winRate" name="Win Rate %" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Bets */}
        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-wwe-gold mb-6">
            <Target size={24} />
            Recent Bets
          </h2>
          
          {bets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bets.map(bet => (
                <div 
                  key={bet.id} 
                  className={`bg-zinc-900 rounded-lg p-4 border-l-4 ${bet.isCorrect ? 'border-green-500' : 'border-red-500'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-white">{bet.fixture.homeTeam} vs {bet.fixture.awayTeam}</div>
                    <div 
                      className={`px-2 py-1 text-xs rounded-full ${bet.isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}
                    >
                      {bet.isCorrect ? 'WIN' : 'LOSS'}
                    </div>
                  </div>
                  
                  <div className="text-sm text-zinc-400 mb-2">{formatDate(bet.fixture.date)}</div>
                  
                  <div className="flex items-center gap-2 mb-1 text-zinc-300">
                    <div className="font-medium">{bet.betType}:</div>
                    <div>{bet.prediction}</div>
                  </div>
                  
                  <div className="text-sm text-zinc-500">
                    Result: {bet.fixture.result || `${bet.fixture.goalsHome}-${bet.fixture.goalsAway}`}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-zinc-400">
              No bets found for this player
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PlayerProfile;
