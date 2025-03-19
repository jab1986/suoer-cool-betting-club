import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { useBetting } from '../context/BettingContext';

const AddBetForm = ({ onClose }) => {
  const { players, fixtures, currentWeek, addBet, getPlayerById, getFixtureById } = useBetting();
  
  // Form state
  const [playerId, setPlayerId] = useState('');
  const [fixtureId, setFixtureId] = useState('');
  const [betType, setBetType] = useState('');
  const [prediction, setPrediction] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Get current week's fixtures that are upcoming
  const availableFixtures = fixtures.filter(
    fixture => fixture.week === currentWeek && fixture.status === 'upcoming'
  );
  
  // Filter players who still have picks available
  const availablePlayers = players.filter(player => {
    const playerBets = player.picksThisWeek || 0;
    const usedBets = fixtures
      .filter(fixture => fixture.week === currentWeek)
      .filter(fixture => 
        fixture.bets?.some(bet => bet.playerId === player.id)
      ).length;
    
    return usedBets < playerBets;
  });
  
  // Reset form
  const resetForm = () => {
    setPlayerId('');
    setFixtureId('');
    setBetType('');
    setPrediction('');
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!playerId || !fixtureId || !betType || !prediction) {
      return; // Form validation failed
    }
    
    // Add the bet
    addBet(parseInt(playerId, 10), parseInt(fixtureId, 10), betType, prediction);
    
    // Show success message
    setSuccess(true);
    
    // Reset form
    resetForm();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };
  
  // Get prediction options based on bet type
  const getPredictionOptions = () => {
    if (!betType) return [];
    
    const fixture = fixtureId ? getFixtureById(parseInt(fixtureId, 10)) : null;
    
    switch (betType) {
      case 'Full Time Result':
        return [
          { value: 'home', label: fixture ? `${fixture.homeTeam} Win` : 'Home Win' },
          { value: 'away', label: fixture ? `${fixture.awayTeam} Win` : 'Away Win' },
          { value: 'draw', label: 'Draw' }
        ];
      case 'Both Teams To Score':
        return [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ];
      case 'Over/Under':
        return [
          { value: 'over', label: 'Over 2.5 Goals' },
          { value: 'under', label: 'Under 2.5 Goals' }
        ];
      case 'Handicap':
        return [
          { value: 'home -1', label: fixture ? `${fixture.homeTeam} -1` : 'Home -1' },
          { value: 'away -1', label: fixture ? `${fixture.awayTeam} -1` : 'Away -1' },
          { value: 'home -2', label: fixture ? `${fixture.homeTeam} -2` : 'Home -2' },
          { value: 'away -2', label: fixture ? `${fixture.awayTeam} -2` : 'Away -2' }
        ];
      default:
        return [];
    }
  };
  
  const getFixtureText = (fixture) => {
    return `${fixture.homeTeam} vs ${fixture.awayTeam} - ${fixture.date}, ${fixture.time}`;
  };

  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-wwe-gold mb-6 flex items-center">
          <PlusCircle className="mr-2" size={24} />
          ADD NEW BET
        </h3>
        
        {success && (
          <div className="p-4 mb-6 bg-opacity-20 bg-green-500 border-l-4 border-green-500 text-white flex items-center justify-between">
            <span>Bet added successfully!</span>
            <button onClick={() => setSuccess(false)} className="text-white">
              <X size={18} />
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-wwe-yellow font-bold">Select Player</label>
                <select 
                  className="w-full p-3 bg-zinc-900 text-white border-2 border-zinc-700 rounded focus:outline-none focus:border-wwe-red"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  required
                >
                  <option value="">Select a player</option>
                  {availablePlayers.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-wwe-yellow font-bold">Select Fixture</label>
                <select 
                  className="w-full p-3 bg-zinc-900 text-white border-2 border-zinc-700 rounded focus:outline-none focus:border-wwe-red"
                  value={fixtureId}
                  onChange={(e) => setFixtureId(e.target.value)}
                  required
                >
                  <option value="">Select a fixture</option>
                  {availableFixtures.map(fixture => (
                    <option key={fixture.id} value={fixture.id}>
                      {getFixtureText(fixture)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-wwe-yellow font-bold">Bet Type</label>
                <select 
                  className="w-full p-3 bg-zinc-900 text-white border-2 border-zinc-700 rounded focus:outline-none focus:border-wwe-red"
                  value={betType}
                  onChange={(e) => setBetType(e.target.value)}
                  required
                >
                  <option value="">Select bet type</option>
                  <option>Full Time Result</option>
                  <option>Both Teams To Score</option>
                  <option>Over/Under</option>
                  <option>Handicap</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-wwe-yellow font-bold">Prediction</label>
                <select 
                  className="w-full p-3 bg-zinc-900 text-white border-2 border-zinc-700 rounded focus:outline-none focus:border-wwe-red"
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  disabled={!betType}
                  required
                >
                  <option value="">Select prediction</option>
                  {getPredictionOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="border-2 border-zinc-500 text-zinc-300 py-3 px-6 uppercase font-bold hover:text-white hover:border-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-wwe-red text-white py-3 px-6 uppercase font-bold hover:bg-red-700 transition-colors"
            >
              Save Bet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBetForm;
