import React, { useState } from 'react';
import { Trophy, Target, Activity, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import { useBetting } from '../context/BettingContext';
import { Layout } from '../components/layout';

const Stats = () => {
  const { players, getPlayerStatistics } = useBetting();
  const [selectedPlayer, setSelectedPlayer] = useState(Object.keys(players)[0] || 'Gaz');
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Get player stats from context
  const playerStats = getPlayerStatistics(selectedPlayer);
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'betTypes', label: 'Bet Types', icon: PieChart },
    { id: 'weekly', label: 'Weekly Performance', icon: Activity }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-wwe-yellow mb-4 drop-shadow-lg">
            STATS CENTER
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Dive deep into player statistics, analyze performance trends, and track betting history
            in the Super Cool Betting Club's interactive statistics hub.
          </p>
        </div>
        
        {/* Player Selection */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {Object.keys(players).map(playerName => (
            <button
              key={playerName}
              className={`px-6 py-3 rounded-md font-bold whitespace-nowrap transition-colors ${selectedPlayer === playerName ? 'bg-wwe-red text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
              onClick={() => setSelectedPlayer(playerName)}
            >
              {playerName.toUpperCase()}
            </button>
          ))}
        </div>
        
        {/* Tab Selection */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-3 rounded-md font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${selectedTab === tab.id ? 'bg-wwe-red text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              <tab.icon size={16} />
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>
        
        {/* Stats Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800 rounded-lg p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <Trophy size={36} className="text-wwe-gold mx-auto mb-4" />
              <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">TOTAL POINTS</h3>
              <div className="text-4xl font-bold text-wwe-yellow my-4">{playerStats.points}</div>
              <p className="text-zinc-400">Current season points</p>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <Target size={36} className="text-wwe-gold mx-auto mb-4" />
              <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">WIN RATE</h3>
              <div className="text-4xl font-bold text-wwe-yellow my-4">{playerStats.winRate}%</div>
              <p className="text-zinc-400">{playerStats.wins} wins out of {playerStats.totalBets} bets</p>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <Activity size={36} className="text-wwe-gold mx-auto mb-4" />
              <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">CURRENT STREAK</h3>
              <div className="text-4xl font-bold text-wwe-yellow my-4">
                {playerStats.streak ? `${playerStats.streak.type}${playerStats.streak.count}` : 'N/A'}
              </div>
              <p className="text-zinc-400">
                {playerStats.streak ? `${playerStats.streak.type === 'W' ? 'Win' : 'Loss'} streak` : 'No streak'}
              </p>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <TrendingUp size={36} className="text-wwe-gold mx-auto mb-4" />
              <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">FORM</h3>
              <div className="text-4xl font-bold text-wwe-yellow my-4">
                {playerStats.form >= 1.2 ? '↗️ RISING' : 
                 playerStats.form <= 0.8 ? '↘️ FALLING' : 
                 '➡️ STABLE'}
              </div>
              <p className="text-zinc-400">Average {playerStats.form?.toFixed(1) || 0} points per week</p>
            </div>
          </div>
        )}
        
        {selectedTab === 'betTypes' && (
          <div className="bg-zinc-800 rounded-lg p-8">
            <h3 className="text-2xl text-center mb-8 font-bold text-wwe-yellow">BET TYPE PERFORMANCE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 rounded p-4 text-center">
                <h4 className="text-wwe-gold mb-2">Full Time Result</h4>
                <div className="text-xl text-green-500">75%</div>
                <p className="text-zinc-400 text-sm">6 / 8 successful</p>
              </div>
              <div className="bg-zinc-900 rounded p-4 text-center">
                <h4 className="text-wwe-gold mb-2">Both Teams To Score</h4>
                <div className="text-xl text-green-500">80%</div>
                <p className="text-zinc-400 text-sm">4 / 5 successful</p>
              </div>
              <div className="bg-zinc-900 rounded p-4 text-center">
                <h4 className="text-wwe-gold mb-2">Over 2.5 Goals</h4>
                <div className="text-xl text-green-500">75%</div>
                <p className="text-zinc-400 text-sm">3 / 4 successful</p>
              </div>
              <div className="bg-zinc-900 rounded p-4 text-center">
                <h4 className="text-wwe-gold mb-2">Handicap</h4>
                <div className="text-xl text-wwe-yellow">67%</div>
                <p className="text-zinc-400 text-sm">2 / 3 successful</p>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'weekly' && (
          <div className="bg-zinc-800 rounded-lg p-8">
            <h3 className="text-2xl text-center mb-8 font-bold text-wwe-yellow">WEEKLY PERFORMANCE</h3>
            <div className="flex flex-wrap justify-between gap-4 mt-4">
              {[5, 4, 3, 2, 1].map(week => (
                <div key={week} className="bg-zinc-900 p-4 rounded text-center min-w-[80px] flex-1">
                  <div className="text-sm text-zinc-400">Week {week}</div>
                  <div className="text-xl text-wwe-yellow font-bold">{Math.floor(Math.random() * 2) + 1}</div>
                  <div className="text-sm text-zinc-400">{Math.floor(Math.random() * 40) + 60}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Stats;
