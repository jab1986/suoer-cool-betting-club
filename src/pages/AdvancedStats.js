import React, { useState } from 'react';
import { useBetting } from '../context/BettingContext';
import { HeadToHead, PerformanceTrends, BettingInsights } from '../components/features/analytics';
import { 
  Trophy, Medal, Star, TrendingUp, TrendingDown, 
  BarChart2, PieChart as PieIcon, Activity, Calendar, Target,
  Zap, Award, Percent, Users, ChevronDown, ChevronUp
} from 'lucide-react';

const AdvancedStats = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('Gaz');
  const [activeTab, setActiveTab] = useState('overview');
  const { getAdvancedPlayerStatistics } = useBetting();

  const stats = getAdvancedPlayerStatistics(selectedPlayer);
  const players = ['Gaz', 'Joe', 'Sean', 'Dean'];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'insights', label: 'Betting Insights', icon: Target },
    { id: 'trends', label: 'Performance Trends', icon: TrendingUp },
    { id: 'headToHead', label: 'Head to Head', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-impact text-wwe-gold mb-4">ADVANCED ANALYTICS CENTER</h1>
          <p className="text-zinc-400">Deep dive into betting patterns, performance metrics, and predictive analytics</p>
        </header>

        {/* Player Selection */}
        <div className="flex flex-wrap gap-4 mb-8">
          {players.map(player => (
            <button
              key={player}
              onClick={() => setSelectedPlayer(player)}
              className={`px-6 py-3 font-bold ${
                selectedPlayer === player
                  ? 'bg-wwe-red text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              } transition-all duration-200 transform hover:scale-105`}
            >
              {player}
            </button>
          ))}
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Performance Index"
            value={stats.performanceIndex}
            trend="up"
            change="+0.3"
            icon={<Trophy className="w-8 h-8 text-wwe-gold" />}
          />
          <StatCard
            title="Value Rating"
            value={stats.valueRating}
            trend="up"
            change="+0.5"
            icon={<Award className="w-8 h-8 text-wwe-gold" />}
          />
          <StatCard
            title="Consistency Score"
            value={stats.consistency.toFixed(1)}
            trend="neutral"
            change="0.0"
            icon={<Activity className="w-8 h-8 text-wwe-gold" />}
          />
          <StatCard
            title="Hot Streak"
            value={`${stats.hotStreak} Wins`}
            trend="up"
            change=""
            icon={<Zap className="w-8 h-8 text-wwe-gold" />}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 font-bold space-x-2 ${
                activeTab === tab.id
                  ? 'bg-wwe-gold text-black'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Summary */}
              <div className="wwe-card p-6">
                <h3 className="text-xl font-impact text-wwe-gold mb-6">PERFORMANCE SUMMARY</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Win Rate</span>
                    <span className="text-wwe-gold">{stats.predictionAccuracy.overall}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Recent Form (Last 5)</span>
                    <span className="text-wwe-gold">{stats.predictionAccuracy.last5}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Best Bet Type</span>
                    <span className="text-wwe-gold">
                      {Object.entries(stats.betTypeEfficiency)
                        .sort((a, b) => parseFloat(b[1].winRate) - parseFloat(a[1].winRate))[0][0]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Risk Profile</span>
                    <span className={`px-3 py-1 rounded ${
                      stats.riskProfile.label === 'High Risk' ? 'bg-red-500/20 text-red-400' :
                      stats.riskProfile.label === 'Moderate Risk' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {stats.riskProfile.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Performance */}
              <div className="wwe-card p-6">
                <h3 className="text-xl font-impact text-wwe-gold mb-6">RECENT PERFORMANCE</h3>
                <div className="space-y-6">
                  <div className="flex space-x-2">
                    {stats.form.map((result, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 flex items-center justify-center font-bold ${
                          result ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {result ? 'W' : 'L'}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-zinc-400">Current Streak</p>
                      <p className="text-2xl font-impact">{stats.hotStreak} Wins</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Momentum</p>
                      <p className="text-2xl font-impact">{stats.momentum}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <BettingInsights stats={stats} />
          )}

          {activeTab === 'trends' && (
            <PerformanceTrends playerName={selectedPlayer} />
          )}

          {activeTab === 'headToHead' && (
            <HeadToHead />
          )}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, trend, change, icon }) => {
  return (
    <div className="wwe-card p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider">{title}</h3>
          <p className="text-3xl font-impact text-white mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${
              trend === 'up' ? 'text-green-400' :
              trend === 'down' ? 'text-red-400' :
              'text-zinc-400'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className="bg-zinc-800/50 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdvancedStats; 