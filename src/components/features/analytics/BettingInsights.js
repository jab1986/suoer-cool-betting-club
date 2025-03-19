import React from 'react';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import {
  Target, TrendingUp, AlertTriangle, DollarSign,
  BarChart2, PieChart, Activity
} from 'lucide-react';

const BettingInsights = ({ stats }) => {
  const {
    betTypeEfficiency,
    riskProfile,
    predictionAccuracy,
    seasonalPerformance
  } = stats;

  // Transform bet type efficiency data for visualization
  const betTypeData = Object.entries(betTypeEfficiency).map(([type, data]) => ({
    name: type,
    winRate: parseFloat(data.winRate),
    roi: parseFloat(data.roi),
    avgOdds: parseFloat(data.avgOdds)
  }));

  // Risk assessment data for radar chart
  const riskData = [
    { metric: 'Win Rate', value: parseFloat(predictionAccuracy.overall) },
    { metric: 'ROI', value: Math.max(...Object.values(betTypeEfficiency).map(d => parseFloat(d.roi))) },
    { metric: 'Risk Score', value: parseFloat(riskProfile.score) * 10 },
    { metric: 'Consistency', value: stats.consistency * 10 },
    { metric: 'Form', value: parseFloat(predictionAccuracy.last5) }
  ];

  return (
    <div className="space-y-8">
      {/* Risk Profile Section */}
      <div className="wwe-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-impact text-wwe-gold">RISK PROFILE</h3>
          <div className={`px-4 py-2 rounded ${
            riskProfile.label === 'High Risk' ? 'bg-red-500/20 text-red-400' :
            riskProfile.label === 'Moderate Risk' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {riskProfile.label}
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={riskData}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey="metric" stroke="#888" />
              <PolarRadiusAxis stroke="#888" />
              <Radar
                name="Risk Profile"
                dataKey="value"
                stroke="#FF0000"
                fill="#FF0000"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bet Type Performance */}
      <div className="wwe-card p-6">
        <h3 className="text-xl font-impact text-wwe-gold mb-6">BET TYPE PERFORMANCE</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={betTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#222',
                  border: '1px solid #444'
                }}
              />
              <Legend />
              <Bar dataKey="winRate" name="Win Rate %" fill="#FF0000" />
              <Bar dataKey="roi" name="ROI %" fill="#FFD700" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Seasonal Performance */}
      <div className="wwe-card p-6">
        <h3 className="text-xl font-impact text-wwe-gold mb-6">SEASONAL PERFORMANCE</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={seasonalPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#222',
                  border: '1px solid #444'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="winRate"
                name="Win Rate %"
                stroke="#FF0000"
                strokeWidth={2}
                dot={{ fill: '#FF0000' }}
              />
              <Line
                type="monotone"
                dataKey="points"
                name="Points"
                stroke="#FFD700"
                strokeWidth={2}
                dot={{ fill: '#FFD700' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Prediction Accuracy"
          value={`${predictionAccuracy.overall}%`}
          subValue={`Last 5: ${predictionAccuracy.last5}%`}
          icon={<Target className="w-6 h-6 text-wwe-gold" />}
          trend={
            parseFloat(predictionAccuracy.last5) > parseFloat(predictionAccuracy.overall)
              ? 'up'
              : 'down'
          }
        />
        
        <MetricCard
          title="Best ROI"
          value={`${Math.max(...Object.values(betTypeEfficiency).map(d => parseFloat(d.roi)))}%`}
          subValue="Return on Investment"
          icon={<DollarSign className="w-6 h-6 text-wwe-gold" />}
          trend="up"
        />
        
        <MetricCard
          title="Risk Score"
          value={riskProfile.score}
          subValue={riskProfile.label}
          icon={<AlertTriangle className="w-6 h-6 text-wwe-gold" />}
          trend="neutral"
        />
        
        <MetricCard
          title="Form Rating"
          value={`${predictionAccuracy.last5}%`}
          subValue="Last 5 Predictions"
          icon={<Activity className="w-6 h-6 text-wwe-gold" />}
          trend={
            parseFloat(predictionAccuracy.last5) > parseFloat(predictionAccuracy.last10)
              ? 'up'
              : 'down'
          }
        />
      </div>

      {/* Betting Recommendations */}
      <div className="wwe-card p-6">
        <h3 className="text-xl font-impact text-wwe-gold mb-4">BETTING RECOMMENDATIONS</h3>
        <div className="space-y-4">
          {Object.entries(betTypeEfficiency)
            .sort((a, b) => parseFloat(b[1].roi) - parseFloat(a[1].roi))
            .map(([type, data]) => (
              <div key={type} className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">{type}</h4>
                  <p className="text-sm text-zinc-400">
                    Win Rate: {data.winRate}% | ROI: {data.roi}%
                  </p>
                </div>
                <div className={`px-3 py-1 rounded ${
                  parseFloat(data.roi) > 20 ? 'bg-green-500/20 text-green-400' :
                  parseFloat(data.roi) > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {parseFloat(data.roi) > 20 ? 'Highly Recommended' :
                   parseFloat(data.roi) > 0 ? 'Consider' : 'Avoid'}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subValue, icon, trend }) => {
  return (
    <div className="wwe-card p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm text-zinc-400 uppercase">{title}</h4>
          <p className="text-2xl font-impact mt-1">{value}</p>
          <p className="text-sm text-zinc-400 mt-1">{subValue}</p>
        </div>
        <div className="bg-zinc-800/50 p-2 rounded-full">
          {icon}
        </div>
      </div>
      {trend && (
        <div className={`mt-2 text-sm ${
          trend === 'up' ? 'text-green-400' :
          trend === 'down' ? 'text-red-400' :
          'text-zinc-400'
        }`}>
          {trend === 'up' ? '↗️ Improving' :
           trend === 'down' ? '↘️ Declining' :
           '➡️ Stable'}
        </div>
      )}
    </div>
  );
};

export default BettingInsights; 