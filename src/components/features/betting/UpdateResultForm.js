import React, { useState } from 'react';
import { CheckCircle, X, Trophy } from 'lucide-react';
import { useBetting } from '../context/BettingContext';

const UpdateResultForm = ({ fixture, onClose }) => {
  const { updateFixtureResult } = useBetting();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    goalsHome: fixture.goalsHome || '',
    goalsAway: fixture.goalsAway || '',
    hasBTTS: false,
    hasOver25: false,
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate BTTS and Over 2.5 based on goals if not explicitly set
    const goalsHome = parseInt(formData.goalsHome);
    const goalsAway = parseInt(formData.goalsAway);
    let hasBTTS = formData.hasBTTS;
    let hasOver25 = formData.hasOver25;
    
    // If goals are valid numbers, calculate these values
    if (!isNaN(goalsHome) && !isNaN(goalsAway)) {
      hasBTTS = goalsHome > 0 && goalsAway > 0;
      hasOver25 = goalsHome + goalsAway > 2.5;
    }
    
    // Determine the winner for Full Time Result
    let result = 'draw';
    if (goalsHome > goalsAway) {
      result = 'home';
    } else if (goalsAway > goalsHome) {
      result = 'away';
    }
    
    // Update the fixture with the result
    updateFixtureResult(fixture.id, {
      goalsHome,
      goalsAway,
      status: 'completed',
      results: {
        fullTimeResult: result,
        btts: hasBTTS,
        over25: hasOver25
      }
    });
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message and close form after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };
  
  return (
    <div className="bg-zinc-900 border-3 border-wwe-red rounded relative p-6">
      {/* WWE-style border effect */}
      <div className="absolute -inset-1.5 border-2 border-wwe-gold rounded -z-10"></div>
      
      <h2 className="flex items-center mb-6 text-wwe-gold uppercase tracking-wider text-2xl font-bold">
        <Trophy size={24} className="mr-2" />
        Update Match Result
      </h2>
      
      {/* Match details */}
      <div className="bg-zinc-800 p-4 rounded mb-6 text-center">
        <div className="flex justify-center items-center mb-4 text-xl font-bold">
          <span>{fixture.homeTeam}</span>
          <span className="px-4 text-zinc-400">vs</span>
          <span>{fixture.awayTeam}</span>
        </div>
        <div className="text-sm text-zinc-400">
          {fixture.competition} • {fixture.date}, {fixture.time}
        </div>
      </div>
      
      {showSuccess && (
        <div className="bg-green-500 bg-opacity-20 border-2 border-green-500 rounded p-4 my-6 text-green-500 flex items-center">
          <CheckCircle size={20} className="mr-2" />
          Match result updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-2">
              <label className="block font-bold mb-2">{fixture.homeTeam} Goals</label>
              <input 
                type="number" 
                name="goalsHome"
                min="0"
                value={formData.goalsHome}
                onChange={handleChange}
                className="w-full p-3 bg-zinc-800 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red"
                required
              />
            </div>
            
            <div className="mb-2 flex items-center">
              <input 
                type="checkbox" 
                id="hasBTTS"
                name="hasBTTS"
                checked={formData.hasBTTS}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="hasBTTS">Both Teams Scored</label>
            </div>
          </div>
          
          <div>
            <div className="mb-2">
              <label className="block font-bold mb-2">{fixture.awayTeam} Goals</label>
              <input 
                type="number" 
                name="goalsAway"
                min="0"
                value={formData.goalsAway}
                onChange={handleChange}
                className="w-full p-3 bg-zinc-800 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red"
                required
              />
            </div>
            
            <div className="mb-2 flex items-center">
              <input 
                type="checkbox" 
                id="hasOver25"
                name="hasOver25"
                checked={formData.hasOver25}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="hasOver25">Over 2.5 Goals</label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={onClose}
            className="bg-zinc-700 text-white font-bold py-3 px-6 rounded hover:bg-zinc-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-wwe-red text-white font-bold py-3 px-6 rounded hover:bg-red-700 transition-colors"
          >
            Update Result
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateResultForm;
