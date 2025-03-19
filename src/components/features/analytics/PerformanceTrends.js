import React, { useState } from 'react';
import { useBetting } from '../context/BettingContext';
import {
  LineChart, Line, BarChart, Bar, ComposedChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar, Filter } from 'lucide-react';

const PerformanceTrends = ({ playerName }) => {
  const [timeRange, setTimeRange] = useState('all');
  const [metric, setMetric] = useState('winRate');
  const { getAdvancedPlayerStatistics } = useBetting();
  
  const stats = getAdvancedPlayerStatistics(playerName);
  
  // Generate weekly performance data
  const weeklyData = Array.from({ length: 10 }, (_, i) => ({
    week: `Week ${i + 1}`,
    winRate: Math.random() * 30 + 50, // Replace with actual data
    points: Math.floor(Math.random() * 3), // Replace with actual data
    value: Math.random() * 2 + 8, // Replace with actual data
    consistency: Math.random() * 2 + 7 // Replace with actual data
  }));

  const metrics = [
    { id: 'winRate', label: 'Win Rate %' },
    { id: 'points', label: 'Points' },
    { id: 'value', label: 'Value Rating' },
    { id: 'consistency', label: 'Consistency' }
  ];

  const timeRanges = [
    { id: 'all', label: 'All Time' },
    { id: 'last5', label: 'Last 5 Weeks' },
    { id: 'last10', label: 'Last 10 Weeks' },
    { id: 'thisMonth', label: 'This Month' }
  ];

  return (
    <div className="wwe-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-impact text-wwe-gold">PERFORMANCE TRENDS</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-zinc-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-zinc-800 text-white p-2 border border-zinc-700"
            >
              {timeRanges.map(range => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-zinc-400" />
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="bg-zinc-800 text-white p-2 border border-zinc-700"
            >
              {metrics.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-[400px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="week" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#222',
                border: '1px solid #444'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey={metric}
              fill="#FF0000"
              stroke="#FF0000"
              fillOpacity={0.3}
            />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="#FFD700"
              strokeWidth={2}
              dot={{ fill: '#FFD700' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Win Rate Distribution */}
        <div>
          <h3 className="text-lg font-impact text-wwe-gold mb-4">WIN RATE DISTRIBUTION</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.betTypePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#222',
                    border: '1px solid #444'
                  }}
                />
                <Bar dataKey="winRate" fill="#FF0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Value Rating Trends */}
        <div>
          <h3 className="text-lg font-impact text-wwe-gold mb-4">VALUE RATING TRENDS</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="week" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#222',
                    border: '1px solid #444'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FFD700"
                  strokeWidth={2}
                  dot={{ fill: '#FFD700' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-8">
        <h3 className="text-lg font-impact text-wwe-gold mb-4">PERFORMANCE INSIGHTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InsightCard
            title="Strongest Bet Type"
            value={Object.entries(stats.betTypePerformance)
              .sort((a, b) => b[1].winRate - a[1].winRate)[0][0]}
            trend="up"
          />
          <InsightCard
            title="Best Winning Streak"
            value="4 Weeks"
            trend="up"
          />
          <InsightCard
            title="Current Momentum"
            value={stats.momentum}
            trend={stats.momentum.includes('POSITIVE') ? 'up' : 'down'}
          />
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ title, value, trend }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded">
      <h4 className="text-sm text-zinc-400 uppercase">{title}</h4>
      <p className="text-xl font-impact mt-2">{value}</p>
      <p className={`text-sm mt-1 ${
        trend === 'up' ? 'text-green-400' : 'text-red-400'
      }`}>
        {trend === 'up' ? '↗️ Improving' : '↘️ Declining'}
      </p>
    </div>
  );
};

export default PerformanceTrends; 