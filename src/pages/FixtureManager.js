import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, Plus, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBetting } from '../context/BettingContext';
import { Layout } from '../components/layout';
import { AddBetForm, UpdateResultForm } from '../components/features/betting';

const FixtureManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAddBetForm, setShowAddBetForm] = useState(false);
  const [showUpdateResultForm, setShowUpdateResultForm] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const { 
    currentWeek, 
    fixtures, 
    bets, 
    advanceToNextWeek, 
    getPlayerById 
  } = useBetting();

  const handlePreviousWeek = () => {
    // In a real app, you'd want to validate that there's data for the previous week
    // advanceToPreviousWeek();
  };

  const handleNextWeek = () => {
    advanceToNextWeek();
  };
  
  const openAddBetForm = () => {
    setShowAddBetForm(true);
  };
  
  const closeAddBetForm = () => {
    setShowAddBetForm(false);
  };
  
  const openUpdateResultForm = (fixture) => {
    setSelectedFixture(fixture);
    setShowUpdateResultForm(true);
  };
  
  const closeUpdateResultForm = () => {
    setShowUpdateResultForm(false);
    setSelectedFixture(null);
  };
  
  // Filter fixtures based on the active tab and current week
  const filteredFixtures = fixtures.filter(fixture => {
    const isCurrentWeek = fixture.week === currentWeek;
    const isUpcoming = fixture.status === 'upcoming';
    return isCurrentWeek && (activeTab === 'upcoming' ? isUpcoming : !isUpcoming);
  });
  
  // Group fixtures by date for better display
  const groupedFixtures = filteredFixtures.reduce((acc, fixture) => {
    if (!acc[fixture.date]) {
      acc[fixture.date] = [];
    }
    acc[fixture.date].push(fixture);
    return acc;
  }, {});
  
  // Format date from YYYY-MM-DD to more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get fixture predictions
  const getFixturePredictions = (fixtureId) => {
    return bets
      .filter(bet => bet.fixtureId === fixtureId)
      .map(bet => {
        const player = getPlayerById(bet.playerId);
        return {
          playerId: bet.playerId,
          playerName: player.name,
          prediction: bet.prediction,
          betType: bet.betType,
          isCorrect: bet.isCorrect
        };
      });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-wwe-yellow mb-4 md:mb-0">
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
        <div className="bg-zinc-800 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePreviousWeek}
              className="bg-wwe-red text-white px-4 py-2 rounded-md flex items-center hover:bg-red-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-wwe-gold mr-2" />
              <h2 className="text-2xl font-bold text-wwe-gold">
                Week {currentWeek}
              </h2>
            </div>
            
            <button 
              onClick={handleNextWeek}
              className="bg-wwe-red text-white px-4 py-2 rounded-md flex items-center hover:bg-red-700 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>

        {/* Fixtures List */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-wwe-gold">
              {activeTab === 'upcoming' ? 'Upcoming Fixtures' : 'Completed Fixtures'}
            </h2>
            
            <div className="flex gap-2">
              <button className="flex items-center bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-2 rounded transition-colors">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filter</span>
              </button>
              {activeTab === 'upcoming' && (
                <>
                  <button 
                    onClick={openAddBetForm}
                    className="flex items-center bg-wwe-red hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add Bet</span>
                  </button>
                  <Link 
                    to="/add-fixture"
                    className="flex items-center bg-wwe-gold hover:bg-yellow-600 text-black px-3 py-2 rounded font-bold transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add Fixture</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Display fixtures if available */}
          {Object.keys(groupedFixtures).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-zinc-900">
                    <th className="py-3 px-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">Time</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">Home</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">Away</th>
                    {activeTab === 'completed' && (
                      <>
                        <th className="py-3 px-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">Result</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">Predictions</th>
                      </>
                    )}
                    <th className="py-3 px-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-700">
                  {Object.entries(groupedFixtures).map(([date, fixtures]) => (
                    <React.Fragment key={date}>
                      {/* Date header row */}
                      <tr>
                        <td colSpan={activeTab === 'upcoming' ? 5 : 7} className="py-2 px-4 bg-zinc-900 bg-opacity-40">
                          <strong>{formatDate(date)}</strong>
                        </td>
                      </tr>
                      
                      {/* Fixture rows */}
                      {fixtures.map(fixture => {
                        const predictions = getFixturePredictions(fixture.id);
                        
                        return (
                          <tr key={fixture.id} className="hover:bg-zinc-700 transition-colors">
                            <td className="py-3 px-4">{new Date(fixture.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{fixture.time}</td>
                            <td className="py-3 px-4 font-medium text-white">{fixture.homeTeam}</td>
                            <td className="py-3 px-4 font-medium text-white">{fixture.awayTeam}</td>
                            
                            {activeTab === 'completed' && (
                              <>
                                <td className="py-3 px-4 font-bold text-wwe-yellow">
                                  {fixture.goalsHome}-{fixture.goalsAway}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    {predictions.map((pred, idx) => (
                                      <div key={idx} className="relative group">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${pred.isCorrect ? 'bg-green-800' : 'bg-red-800'}`}>
                                          {pred.playerName.charAt(0)}
                                          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white text-xs p-2 rounded shadow-lg hidden group-hover:block z-10 w-32">
                                            <p className="mb-1"><strong>{pred.playerName}</strong></p>
                                            <p className="mb-1">{pred.betType}: {pred.prediction}</p>
                                            <p className={pred.isCorrect ? 'text-green-400' : 'text-red-400'}>
                                              {pred.isCorrect ? 'Correct' : 'Incorrect'}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                              </>
                            )}
                            
                            <td className="py-3 px-4">
                              {activeTab === 'upcoming' ? (
                                <div className="flex gap-2">
                                  <button 
                                    className="bg-wwe-gold hover:bg-yellow-600 text-black font-bold px-3 py-1 text-xs rounded transition-colors"
                                    onClick={() => openAddBetForm()}
                                  >
                                    Make Prediction
                                  </button>
                                  <button 
                                    className="bg-zinc-600 hover:bg-zinc-500 text-white font-bold px-3 py-1 text-xs rounded transition-colors"
                                    onClick={() => openUpdateResultForm(fixture)}
                                  >
                                    Add Result
                                  </button>
                                </div>
                              ) : (
                                <button className="bg-zinc-600 hover:bg-zinc-500 text-white font-bold px-3 py-1 text-xs rounded transition-colors">
                                  Details
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto mb-4 text-zinc-600" />
              <h3 className="text-xl text-zinc-400 mb-2">No Fixtures Found</h3>
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
      
      {/* Add Bet Modal */}
      {showAddBetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeAddBetForm}
              className="absolute top-4 right-4 text-white bg-transparent hover:bg-white hover:bg-opacity-10 w-8 h-8 rounded-full flex items-center justify-center z-10"
            >
              <X size={24} />
            </button>
            <AddBetForm onClose={closeAddBetForm} />
          </div>
        </div>
      )}
      
      {/* Update Result Modal */}
      {showUpdateResultForm && selectedFixture && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeUpdateResultForm}
              className="absolute top-4 right-4 text-white bg-transparent hover:bg-white hover:bg-opacity-10 w-8 h-8 rounded-full flex items-center justify-center z-10"
            >
              <X size={24} />
            </button>
            <UpdateResultForm fixture={selectedFixture} onClose={closeUpdateResultForm} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FixtureManager;