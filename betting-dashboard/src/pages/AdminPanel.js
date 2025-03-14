import React, { useState } from 'react';
import { 
  Plus, Save, Trash2, Upload, Download, 
  CheckCircle, AlertCircle, Lock, Unlock, 
  ChevronDown, ChevronUp
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('fixtures');
  const [expandedSection, setExpandedSection] = useState('addFixture');
  const [fixtureFormData, setFixtureFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    league: '',
    date: '',
    time: '',
    homeWinOdds: '',
    drawOdds: '',
    awayWinOdds: '',
    bttsOdds: '',
    over25Odds: ''
  });
  const [resultFormData, setResultFormData] = useState({
    fixtureId: '',
    homeScore: '',
    awayScore: ''
  });
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Mock data - would come from API in real app
  const fixtures = [
    {
      id: 1,
      date: '2023-11-28T15:00:00',
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester City',
      league: 'Premier League',
      status: 'upcoming',
      picks: 2
    },
    {
      id: 2,
      date: '2023-11-28T17:30:00',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      league: 'La Liga',
      status: 'upcoming',
      picks: 1
    },
    {
      id: 3,
      date: '2023-11-29T19:45:00',
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      league: 'Serie A',
      status: 'upcoming',
      picks: 2
    },
    {
      id: 101,
      date: '2023-11-21T15:00:00',
      homeTeam: 'Arsenal',
      awayTeam: 'Tottenham',
      league: 'Premier League',
      status: 'completed',
      result: '2-1',
      picks: 3
    }
  ];

  const leagues = [
    { id: 1, name: 'Premier League' },
    { id: 2, name: 'La Liga' },
    { id: 3, name: 'Serie A' },
    { id: 4, name: 'Bundesliga' }
  ];

  const teams = {
    'Premier League': ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester City', 'Manchester United', 'Tottenham'],
    'La Liga': ['Atletico Madrid', 'Barcelona', 'Real Madrid', 'Sevilla', 'Valencia'],
    'Serie A': ['AC Milan', 'Inter Milan', 'Juventus', 'Napoli', 'Roma'],
    'Bundesliga': ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen']
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Handle fixture form input changes
  const handleFixtureFormChange = (e) => {
    const { name, value } = e.target;
    setFixtureFormData({
      ...fixtureFormData,
      [name]: value
    });
  };

  // Handle result form input changes
  const handleResultFormChange = (e) => {
    const { name, value } = e.target;
    setResultFormData({
      ...resultFormData,
      [name]: value
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  // Submit fixture form
  const handleFixtureSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setNotification({
        type: 'success',
        message: 'Fixture added successfully!'
      });
      
      // Clear form
      setFixtureFormData({
        homeTeam: '',
        awayTeam: '',
        league: '',
        date: '',
        time: '',
        homeWinOdds: '',
        drawOdds: '',
        awayWinOdds: '',
        bttsOdds: '',
        over25Odds: ''
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  // Submit result form
  const handleResultSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setNotification({
        type: 'success',
        message: 'Result added successfully!'
      });
      
      // Clear form
      setResultFormData({
        fixtureId: '',
        homeScore: '',
        awayScore: ''
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  // Import fixtures from file
  const handleImportFixtures = () => {
    setNotification({
      type: 'info',
      message: 'Importing fixtures...'
    });
    
    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Fixtures imported successfully!'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1500);
  };

  // Export fixtures to file
  const handleExportFixtures = () => {
    setNotification({
      type: 'info',
      message: 'Exporting fixtures...'
    });
    
    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Fixtures exported successfully!'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-title text-primary mb-8">ADMIN PANEL</h1>
      
      {/* Notification */}
      {notification && (
        <div className={`p-4 mb-6 flex items-center ${
          notification.type === 'success' ? 'bg-green-600' : 
          notification.type === 'error' ? 'bg-red-600' : 
          'bg-blue-600'
        } text-white`}>
          {notification.type === 'success' ? <CheckCircle className="mr-2" /> : 
           notification.type === 'error' ? <AlertCircle className="mr-2" /> : 
           <AlertCircle className="mr-2" />}
          {notification.message}
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`py-3 px-6 font-bold transition duration-200 ${
            activeTab === 'fixtures'
              ? 'bg-primary text-white'
              : 'bg-metal-gray bg-opacity-30 hover:bg-opacity-50'
          }`}
          onClick={() => setActiveTab('fixtures')}
        >
          MANAGE FIXTURES
        </button>
        <button
          className={`py-3 px-6 font-bold transition duration-200 ${
            activeTab === 'players'
              ? 'bg-primary text-white'
              : 'bg-metal-gray bg-opacity-30 hover:bg-opacity-50'
          }`}
          onClick={() => setActiveTab('players')}
        >
          MANAGE PLAYERS
        </button>
        <button
          className={`py-3 px-6 font-bold transition duration-200 ${
            activeTab === 'settings'
              ? 'bg-primary text-white'
              : 'bg-metal-gray bg-opacity-30 hover:bg-opacity-50'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          SETTINGS
        </button>
      </div>
      
      {/* Fixtures Management */}
      {activeTab === 'fixtures' && (
        <div>
          {/* Import/Export buttons */}
          <div className="flex gap-4 mb-6">
            <button 
              className="flex items-center bg-metal-gray bg-opacity-30 py-2 px-4 hover:bg-opacity-50 transition duration-200"
              onClick={handleImportFixtures}
            >
              <Upload className="mr-2 h-5 w-5" />
              IMPORT FIXTURES
            </button>
            <button 
              className="flex items-center bg-metal-gray bg-opacity-30 py-2 px-4 hover:bg-opacity-50 transition duration-200"
              onClick={handleExportFixtures}
            >
              <Download className="mr-2 h-5 w-5" />
              EXPORT FIXTURES
            </button>
          </div>
          
          {/* Add Fixture Section */}
          <div className="card mb-6">
            <div 
              className="p-4 cursor-pointer flex justify-between items-center bg-metal-gray bg-opacity-20"
              onClick={() => toggleSection('addFixture')}
            >
              <div className="flex items-center">
                <Plus className="mr-2" />
                <h2 className="text-xl font-title">ADD NEW FIXTURE</h2>
              </div>
              {expandedSection === 'addFixture' ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSection === 'addFixture' && (
              <div className="p-6">
                <form onSubmit={handleFixtureSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-bold">League</label>
                      <select 
                        name="league"
                        value={fixtureFormData.league}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                      >
                        <option value="">Select League</option>
                        {leagues.map(league => (
                          <option key={league.id} value={league.name}>{league.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-bold">Date</label>
                        <input 
                          type="date"
                          name="date"
                          value={fixtureFormData.date}
                          onChange={handleFixtureFormChange}
                          className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-bold">Time</label>
                        <input 
                          type="time"
                          name="time"
                          value={fixtureFormData.time}
                          onChange={handleFixtureFormChange}
                          className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-bold">Home Team</label>
                      <select 
                        name="homeTeam"
                        value={fixtureFormData.homeTeam}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                        disabled={!fixtureFormData.league}
                      >
                        <option value="">Select Home Team</option>
                        {fixtureFormData.league && teams[fixtureFormData.league].map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-bold">Away Team</label>
                      <select 
                        name="awayTeam"
                        value={fixtureFormData.awayTeam}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                        disabled={!fixtureFormData.league}
                      >
                        <option value="">Select Away Team</option>
                        {fixtureFormData.league && teams[fixtureFormData.league].map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-bold">Home Win Odds</label>
                      <input 
                        type="number"
                        step="0.01"
                        min="1"
                        name="homeWinOdds"
                        value={fixtureFormData.homeWinOdds}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-bold">Draw Odds</label>
                      <input 
                        type="number"
                        step="0.01"
                        min="1"
                        name="drawOdds"
                        value={fixtureFormData.drawOdds}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-bold">Away Win Odds</label>
                      <input 
                        type="number"
                        step="0.01"
                        min="1"
                        name="awayWinOdds"
                        value={fixtureFormData.awayWinOdds}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-bold">BTTS Odds</label>
                      <input 
                        type="number"
                        step="0.01"
                        min="1"
                        name="bttsOdds"
                        value={fixtureFormData.bttsOdds}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-bold">Over 2.5 Goals Odds</label>
                      <input 
                        type="number"
                        step="0.01"
                        min="1"
                        name="over25Odds"
                        value={fixtureFormData.over25Odds}
                        onChange={handleFixtureFormChange}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      type="submit"
                      className="flex items-center bg-primary text-white py-2 px-6 font-bold hover:bg-red-700 transition duration-200"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Save className="mr-2" />
                          SAVE FIXTURE
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Add Result Section */}
          <div className="card mb-6">
            <div 
              className="p-4 cursor-pointer flex justify-between items-center bg-metal-gray bg-opacity-20"
              onClick={() => toggleSection('addResult')}
            >
              <div className="flex items-center">
                <Plus className="mr-2" />
                <h2 className="text-xl font-title">ADD MATCH RESULT</h2>
              </div>
              {expandedSection === 'addResult' ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSection === 'addResult' && (
              <div className="p-6">
                <form onSubmit={handleResultSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block mb-2 font-bold">Select Fixture</label>
                      <select 
                        name="fixtureId"
                        value={resultFormData.fixtureId}
                        onChange={(e) => {
                          handleResultFormChange(e);
                          const fixture = fixtures.find(f => f.id === parseInt(e.target.value));
                          setSelectedFixture(fixture);
                        }}
                        className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                        required
                      >
                        <option value="">Select Fixture</option>
                        {fixtures.filter(f => f.status === 'upcoming').map(fixture => (
                          <option key={fixture.id} value={fixture.id}>
                            {fixture.homeTeam} vs {fixture.awayTeam} ({formatDate(fixture.date)})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {selectedFixture && (
                      <>
                        <div>
                          <label className="block mb-2 font-bold">{selectedFixture.homeTeam} Score</label>
                          <input 
                            type="number"
                            min="0"
                            name="homeScore"
                            value={resultFormData.homeScore}
                            onChange={handleResultFormChange}
                            className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block mb-2 font-bold">{selectedFixture.awayTeam} Score</label>
                          <input 
                            type="number"
                            min="0"
                            name="awayScore"
                            value={resultFormData.awayScore}
                            onChange={handleResultFormChange}
                            className="w-full p-2 bg-metal-gray bg-opacity-10 border border-metal-gray"
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      type="submit"
                      className="flex items-center bg-primary text-white py-2 px-6 font-bold hover:bg-red-700 transition duration-200"
                      disabled={isProcessing || !selectedFixture}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Save className="mr-2" />
                          SAVE RESULT
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Fixtures List */}
          <div className="card">
            <div className="p-4 bg-metal-gray bg-opacity-20">
              <h2 className="text-xl font-title">FIXTURES LIST</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-metal-gray bg-opacity-30">
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Match</th>
                    <th className="p-3 text-left">League</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Picks</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fixtures.map((fixture) => (
                    <tr key={fixture.id} className="border-b border-metal-gray border-opacity-20">
                      <td className="p-3">{formatDate(fixture.date)}</td>
                      <td className="p-3 font-bold">
                        {fixture.homeTeam} {fixture.result ? `${fixture.result}` : 'vs'} {fixture.awayTeam}
                      </td>
                      <td className="p-3">{fixture.league}</td>
                      <td className="p-3">
                        <span className={`py-1 px-2 rounded-sm text-white text-sm ${
                          fixture.status === 'upcoming' ? 'bg-blue-600' : 'bg-green-600'
                        }`}>
                          {fixture.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                      </td>
                      <td className="p-3">{fixture.picks}</td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button className="p-1 bg-yellow-500 text-white rounded-sm">
                            <Lock className="h-4 w-4" />
                          </button>
                          <button className="p-1 bg-red-600 text-white rounded-sm">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Players Management */}
      {activeTab === 'players' && (
        <div className="card p-6">
          <h2 className="text-xl font-title mb-4">PLAYER MANAGEMENT</h2>
          <p>Player management functionality would go here.</p>
        </div>
      )}
      
      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="card p-6">
          <h2 className="text-xl font-title mb-4">SETTINGS</h2>
          <p>Settings functionality would go here.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 