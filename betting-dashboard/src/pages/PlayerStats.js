import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { CircleDollarSign, Goal, Percent, Flame, ChevronDown, ChevronUp } from 'lucide-react';

const PlayerStats = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('Sean');
  const [expandedSection, setExpandedSection] = useState(null);

  // Mock data - would come from an API in production
  const players = ['Sean', 'Gaz', 'Joe', 'Dean'];
  const COLORS = ['#FF0000', '#FFBB28', '#00C49F', '#0088FE'];

  // Weekly performance data
  const weeklyData = [
    { week: 1, Sean: 1, Gaz: 0, Joe: 1, Dean: 0 },
    { week: 2, Sean: 2, Gaz: 1, Joe: 0, Dean: 1 },
    { week: 3, Sean: 0, Gaz: 2, Joe: 2, Dean: 0 },
    { week: 4, Sean: 1, Gaz: 1, Joe: 1, Dean: 0 },
    { week: 5, Sean: 2, Gaz: 2, Joe: 0, Dean: 1 },
    { week: 6, Sean: 1, Gaz: 0, Joe: 2, Dean: 2 },
    { week: 7, Sean: 0, Gaz: 1, Joe: 1, Dean: 1 },
    { week: 8, Sean: 2, Gaz: 1, Joe: 1, Dean: 0 },
    { week: 9, Sean: 1, Gaz: 2, Joe: 0, Dean: 1 },
    { week: 10, Sean: 1, Gaz: 1, Joe: 1, Dean: 0 },
  ];

  // Bet type distribution data
  const betTypesData = {
    Sean: [
      { name: 'Full Time Result', value: 12 },
      { name: 'Both Teams To Score', value: 5 },
      { name: 'Over 2.5 Goals', value: 3 },
      { name: 'Handicap', value: 1 }
    ],
    Gaz: [
      { name: 'Full Time Result', value: 8 },
      { name: 'Both Teams To Score', value: 7 },
      { name: 'Over 2.5 Goals', value: 4 },
      { name: 'Handicap', value: 0 }
    ],
    Joe: [
      { name: 'Full Time Result', value: 9 },
      { name: 'Both Teams To Score', value: 4 },
      { name: 'Over 2.5 Goals', value: 5 },
      { name: 'Handicap', value: 1 }
    ],
    Dean: [
      { name: 'Full Time Result', value: 7 },
      { name: 'Both Teams To Score', value: 3 },
      { name: 'Over 2.5 Goals', value: 6 },
      { name: 'Handicap', value: 3 }
    ]
  };

  // Player statistics summary
  const playerStats = {
    Sean: { 
      points: 34, 
      bets: 21, 
      wins: 11, 
      winRate: 52.4, 
      doubles: 4,
      recentForm: [1, 0, 1, 1, 0]
    },
    Gaz: { 
      points: 32, 
      bets: 19, 
      wins: 13, 
      winRate: 68.4, 
      doubles: 3,
      recentForm: [1, 1, 1, 0, 1]
    },
    Joe: { 
      points: 31, 
      bets: 19, 
      wins: 12, 
      winRate: 63.2, 
      doubles: 5,
      recentForm: [1, 0, 1, 1, 0]
    },
    Dean: { 
      points: 17, 
      bets: 19, 
      wins: 10, 
      winRate: 52.6, 
      doubles: 2,
      recentForm: [0, 0, 1, 0, 0]
    }
  };

  // Get accumulated points data for the line chart
  const getAccumulatedData = () => {
    const result = [];
    let seanTotal = 0;
    let gazTotal = 0;
    let joeTotal = 0;
    let deanTotal = 0;

    weeklyData.forEach(week => {
      seanTotal += week.Sean;
      gazTotal += week.Gaz;
      joeTotal += week.Joe;
      deanTotal += week.Dean;

      result.push({
        week: week.week,
        Sean: seanTotal,
        Gaz: gazTotal,
        Joe: joeTotal,
        Dean: deanTotal
      });
    });

    return result;
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-title text-primary mb-8">PLAYER STATS</h1>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {players.map((player) => (
            <button
              key={player}
              className={`py-2 px-4 rounded-sm ${
                selectedPlayer === player
                  ? 'bg-primary text-white'
                  : 'bg-metal-gray bg-opacity-30 hover:bg-opacity-50'
              } font-bold transition duration-200`}
              onClick={() => setSelectedPlayer(player)}
            >
              {player}
            </button>
          ))}
        </div>
      </div>

      {/* Player summary stats */}
      <div className="card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-metal-gray bg-opacity-10 p-4 rounded-sm border-l-4 border-primary">
            <div className="flex items-center">
              <CircleDollarSign className="text-primary mr-2" />
              <h3 className="font-bold text-lg">Total Points</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{playerStats[selectedPlayer].points}</p>
          </div>
          <div className="bg-metal-gray bg-opacity-10 p-4 rounded-sm border-l-4 border-yellow-500">
            <div className="flex items-center">
              <Goal className="text-yellow-500 mr-2" />
              <h3 className="font-bold text-lg">Win Rate</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{playerStats[selectedPlayer].winRate}%</p>
          </div>
          <div className="bg-metal-gray bg-opacity-10 p-4 rounded-sm border-l-4 border-green-500">
            <div className="flex items-center">
              <Percent className="text-green-500 mr-2" />
              <h3 className="font-bold text-lg">Bets Won</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{playerStats[selectedPlayer].wins}/{playerStats[selectedPlayer].bets}</p>
          </div>
          <div className="bg-metal-gray bg-opacity-10 p-4 rounded-sm border-l-4 border-red-500">
            <div className="flex items-center">
              <Flame className="text-red-500 mr-2" />
              <h3 className="font-bold text-lg">Doubles</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{playerStats[selectedPlayer].doubles}</p>
          </div>
        </div>
      </div>

      {/* Recent form */}
      <div className="card p-6 mb-8">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('form')}
        >
          <h2 className="text-2xl font-title">RECENT FORM</h2>
          {expandedSection === 'form' ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSection === 'form' && (
          <div className="mt-4">
            <div className="flex space-x-2 mt-4">
              {playerStats[selectedPlayer].recentForm.map((result, index) => (
                <div 
                  key={index} 
                  className={`w-10 h-10 flex items-center justify-center 
                    ${result === 1 ? 'bg-green-500' : 'bg-red-500'} text-white font-bold`}
                >
                  {result === 1 ? 'W' : 'L'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Weekly performance chart */}
      <div className="card p-6 mb-8">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('weekly')}
        >
          <h2 className="text-2xl font-title">WEEKLY PERFORMANCE</h2>
          {expandedSection === 'weekly' ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSection === 'weekly' && (
          <div className="mt-4" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={selectedPlayer} fill="#FF0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Points over time chart */}
      <div className="card p-6 mb-8">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('pointsOverTime')}
        >
          <h2 className="text-2xl font-title">POINTS OVER TIME</h2>
          {expandedSection === 'pointsOverTime' ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSection === 'pointsOverTime' && (
          <div className="mt-4" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getAccumulatedData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                {players.map((player, index) => (
                  <Line 
                    key={player}
                    type="monotone" 
                    dataKey={player} 
                    stroke={COLORS[index]} 
                    strokeWidth={player === selectedPlayer ? 3 : 1}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Bet types distribution */}
      <div className="card p-6 mb-8">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('betTypes')}
        >
          <h2 className="text-2xl font-title">BET TYPES DISTRIBUTION</h2>
          {expandedSection === 'betTypes' ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {expandedSection === 'betTypes' && (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={betTypesData[selectedPlayer]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {betTypesData[selectedPlayer].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Bet Type Breakdown</h3>
                <div className="space-y-4">
                  {betTypesData[selectedPlayer].map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-4 h-4 mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <span>{entry.name}</span>
                          <span className="font-bold">{entry.value}</span>
                        </div>
                        <div className="w-full bg-metal-gray bg-opacity-30 h-2 mt-1">
                          <div 
                            className="h-full" 
                            style={{ 
                              width: `${(entry.value / betTypesData[selectedPlayer].reduce((a, b) => a + b.value, 0)) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStats; 