import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const FixtureManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentWeek, setCurrentWeek] = useState(24);

  // Sample fixture data
  const fixtures = {
    upcoming: [
      { id: 1, date: '2023-12-10', time: '15:00', home: 'Liverpool', away: 'Arsenal', competition: 'Premier League' },
      { id: 2, date: '2023-12-10', time: '17:30', home: 'Man City', away: 'Chelsea', competition: 'Premier League' },
      { id: 3, date: '2023-12-11', time: '14:00', home: 'Tottenham', away: 'Man Utd', competition: 'Premier League' },
      { id: 4, date: '2023-12-11', time: '16:30', home: 'Newcastle', away: 'Brighton', competition: 'Premier League' },
      { id: 5, date: '2023-12-12', time: '20:00', home: 'Aston Villa', away: 'Wolves', competition: 'Premier League' },
    ],
    completed: [
      { 
        id: 6, 
        date: '2023-12-03', 
        time: '16:30', 
        home: 'Everton', 
        away: 'Leeds', 
        competition: 'Premier League',
        result: '2-1',
        predictions: [
          { player: 'Sean', prediction: 'Everton Win', result: 'win' },
          { player: 'Gaz', prediction: 'Draw', result: 'loss' },
          { player: 'Joe', prediction: 'BTTS', result: 'win' },
          { player: 'Dean', prediction: 'Under 2.5', result: 'loss' },
        ] 
      },
      { 
        id: 7, 
        date: '2023-12-03', 
        time: '14:00', 
        home: 'West Ham', 
        away: 'Crystal Palace', 
        competition: 'Premier League',
        result: '0-0',
        predictions: [
          { player: 'Sean', prediction: 'West Ham Win', result: 'loss' },
          { player: 'Gaz', prediction: 'BTTS', result: 'loss' },
          { player: 'Joe', prediction: 'Over 2.5', result: 'loss' },
          { player: 'Dean', prediction: 'Draw', result: 'win' },
        ] 
      },
    ]
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(prev => prev - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => prev + 1);
  };

  return (
    <div className="wwe-container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-impact uppercase tracking-wider mb-4 md:mb-0">
          Fixture Manager
        </h1>
        
        <div className="flex items-center bg-zinc-800 rounded p-1">
          <button 
            className={`px-4 py-2 rounded font-bold ${activeTab === 'upcoming' ? 'bg-wwe-red text-white' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`px-4 py-2 rounded font-bold ${activeTab === 'completed' ? 'bg-wwe-red text-white' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Week Selector */}
      <div className="wwe-card p-4 mb-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={handlePreviousWeek}
            className="wwe-button flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-wwe-gold mr-2" />
            <h2 className="text-2xl font-impact text-wwe-gold">
              Week {currentWeek}
            </h2>
          </div>
          
          <button 
            onClick={handleNextWeek}
            className="wwe-button flex items-center"
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>

      {/* Fixtures List */}
      <div className="wwe-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-impact text-wwe-gold">
            {activeTab === 'upcoming' ? 'Upcoming Fixtures' : 'Completed Fixtures'}
          </h2>
          
          <div className="flex gap-2">
            <button className="flex items-center bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded">
              <Filter className="h-4 w-4 mr-1" />
              <span>Filter</span>
            </button>
            {activeTab === 'upcoming' && (
              <button className="flex items-center bg-wwe-red hover:bg-red-700 text-white px-3 py-1 rounded">
                <Plus className="h-4 w-4 mr-1" />
                <span>Add Fixture</span>
              </button>
            )}
          </div>
        </div>

        {/* Fixtures */}
        <div className="overflow-x-auto">
          <table className="wwe-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Home</th>
                <th>Away</th>
                <th>Competition</th>
                {activeTab === 'completed' && (
                  <>
                    <th>Result</th>
                    <th>Predictions</th>
                  </>
                )}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fixtures[activeTab].map(fixture => (
                <tr key={fixture.id} className="hover:bg-zinc-800">
                  <td>{fixture.date}</td>
                  <td>{fixture.time}</td>
                  <td className="font-bold text-white">{fixture.home}</td>
                  <td className="font-bold text-white">{fixture.away}</td>
                  <td>{fixture.competition}</td>
                  
                  {activeTab === 'completed' && (
                    <>
                      <td className="font-bold text-wwe-yellow">{fixture.result}</td>
                      <td>
                        <div className="flex space-x-2">
                          {fixture.predictions.map((pred, idx) => (
                            <div key={idx} 
                              className="relative group"
                              title={`${pred.player}: ${pred.prediction} (${pred.result})`}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                pred.result === 'win' ? 'bg-green-800' : 'bg-red-800'
                              }`}>
                                {pred.player.charAt(0)}
                              </div>
                              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white text-xs p-2 rounded shadow-lg hidden group-hover:block z-10 w-32">
                                <p><span className="font-bold">{pred.player}:</span> {pred.prediction}</p>
                                <p className={pred.result === 'win' ? 'text-green-400' : 'text-red-400'}>
                                  {pred.result === 'win' ? 'Correct' : 'Incorrect'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </>
                  )}
                  
                  <td>
                    <div className="flex space-x-2">
                      {activeTab === 'upcoming' ? (
                        <button className="bg-wwe-gold hover:bg-yellow-500 text-black font-bold px-3 py-1 text-xs rounded">
                          Make Prediction
                        </button>
                      ) : (
                        <button className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold px-3 py-1 text-xs rounded">
                          Details
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state if no fixtures */}
        {fixtures[activeTab].length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-impact text-zinc-400 mb-2">No Fixtures Found</h3>
            <p className="text-zinc-500">
              {activeTab === 'upcoming' 
                ? 'There are no upcoming fixtures for this week.' 
                : 'There are no completed fixtures to display.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixtureManager; 