import React, { useState } from 'react';
import { useBetting } from '../context/BettingContext';
import {
  Trophy, Target, Percent, TrendingUp,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react';

const HeadToHead = () => {
  const [player1, setPlayer1] = useState('Gaz');
  const [player2, setPlayer2] = useState('Joe');
  const { getAdvancedPlayerStatistics, comparePlayerPerformance } = useBetting();
  
  const stats1 = getAdvancedPlayerStatistics(player1);
  const stats2 = getAdvancedPlayerStatistics(player2);
  const comparison = comparePlayerPerformance(player1, player2);
  
  const ComparisonIndicator = ({ value, reverse = false }) => {
    if (Math.abs(value) < 0.1) return <Minus className="w-4 h-4 text-zinc-400" />;
    const isPositive = reverse ? value < 0 : value > 0;
    return isPositive ? 
      <ArrowUp className="w-4 h-4 text-green-400" /> : 
      <ArrowDown className="w-4 h-4 text-red-400" />;
  };

  const players = ['Gaz', 'Joe', 'Sean', 'Dean'];

  return (
    <div className="wwe-card p-6">
      <h2 className="text-2xl font-impact text-wwe-gold mb-6">HEAD TO HEAD</h2>
      
      {/* Player Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">PLAYER 1</label>
          <select 
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-full bg-zinc-800 text-white p-2 border border-zinc-700"
          >
            {players.map(player => (
              <option key={player} value={player}>{player}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-2">PLAYER 2</label>
          <select
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="w-full bg-zinc-800 text-white p-2 border border-zinc-700"
          >
            {players.map(player => (
              <option key={player} value={player}>{player}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-right">
          <p className="text-2xl font-impact">{stats1.performanceIndex}</p>
          <p className="text-sm text-zinc-400">Performance Index</p>
        </div>
        <div className="flex items-center justify-center">
          <Trophy className="w-6 h-6 text-wwe-gold" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-impact">{stats2.performanceIndex}</p>
          <p className="text-sm text-zinc-400">Performance Index</p>
        </div>
      </div>

      {/* Detailed Stats Comparison */}
      <div className="space-y-4">
        <ComparisonRow
          label="Win Rate"
          value1={`${stats1.winRate}%`}
          value2={`${stats2.winRate}%`}
          difference={comparison.winRate}
          icon={<Percent className="w-5 h-5 text-wwe-gold" />}
        />
        
        <ComparisonRow
          label="Total Points"
          value1={stats1.points}
          value2={stats2.points}
          difference={comparison.totalPoints}
          icon={<Target className="w-5 h-5 text-wwe-gold" />}
        />
        
        <ComparisonRow
          label="Recent Form"
          value1={`${stats1.form.filter(r => r).length}/5`}
          value2={`${stats2.form.filter(r => r).length}/5`}
          difference={comparison.recentForm}
          icon={<TrendingUp className="w-5 h-5 text-wwe-gold" />}
        />
      </div>

      {/* Form Comparison */}
      <div className="mt-6">
        <h3 className="text-lg font-impact text-wwe-gold mb-4">RECENT FORM</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex space-x-1">
              {stats1.form.map((result, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center ${
                    result ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {result ? 'W' : 'L'}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex space-x-1">
              {stats2.form.map((result, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center ${
                    result ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {result ? 'W' : 'L'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonRow = ({ label, value1, value2, difference, icon }) => {
  return (
    <div className="grid grid-cols-3 items-center">
      <div className="text-right">
        <p className="text-xl font-impact">{value1}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm text-zinc-400">{label}</span>
        </div>
        <ComparisonIndicator value={difference} />
      </div>
      <div className="text-left">
        <p className="text-xl font-impact">{value2}</p>
      </div>
    </div>
  );
};

export default HeadToHead; 