import React, { useState } from 'react';
import { X, Calendar, Clock, Trophy, ChevronLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBetting } from '../context/BettingContext';
import { Layout } from '../components/layout';

const AddFixture = () => {
  const navigate = useNavigate();
  const { addFixture, currentWeek } = useBetting();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    competition: 'Premier League',
    week: currentWeek,
    status: 'upcoming'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new fixture
    const newFixture = {
      ...formData,
      id: Date.now().toString(), // Simple ID generation
      goalsHome: null,
      goalsAway: null
    };
    
    // Add fixture to context
    addFixture(newFixture);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      homeTeam: '',
      awayTeam: '',
      date: '',
      time: '',
      competition: 'Premier League',
      week: currentWeek,
      status: 'upcoming'
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-wwe-gold mb-4 md:mb-0">
            Add New Fixture
          </h1>
          
          <Link 
            to="/fixture-manager"
            className="flex items-center bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded font-bold transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back to Fixtures
          </Link>
        </div>
        
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-900 bg-opacity-20 border-2 border-green-500 rounded p-4 mb-6 flex items-center text-green-500">
            <CheckCircle size={20} className="mr-2" />
            Fixture has been added successfully!
          </div>
        )}
        
        {/* Form Card */}
        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-wwe-gold flex items-center mb-6">
            <Trophy size={24} className="mr-2 text-wwe-gold" />
            Fixture Details
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Teams Section */}
              <div>
                <div className="mb-4">
                  <label htmlFor="homeTeam" className="block font-bold mb-2 text-white">
                    Home Team
                  </label>
                  <input
                    type="text"
                    id="homeTeam"
                    name="homeTeam"
                    value={formData.homeTeam}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-zinc-900 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red transition-colors"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="awayTeam" className="block font-bold mb-2 text-white">
                    Away Team
                  </label>
                  <input
                    type="text"
                    id="awayTeam"
                    name="awayTeam"
                    value={formData.awayTeam}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-zinc-900 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red transition-colors"
                    required
                  />
                </div>
              </div>
              
              {/* Date/Time Section */}
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 mb-4">
                    <label htmlFor="date" className="block font-bold mb-2 text-white">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-3 bg-zinc-900 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red transition-colors"
                        required
                      />
                      <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="time" className="block font-bold mb-2 text-white">
                      Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-3 bg-zinc-900 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red transition-colors"
                        required
                      />
                      <Clock size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="competition" className="block font-bold mb-2 text-white">
                    Competition
                  </label>
                  <select
                    id="competition"
                    name="competition"
                    value={formData.competition}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-zinc-900 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red transition-colors"
                  >
                    <option value="Premier League">Premier League</option>
                    <option value="Champions League">Champions League</option>
                    <option value="FA Cup">FA Cup</option>
                    <option value="Europa League">Europa League</option>
                    <option value="Carabao Cup">Carabao Cup</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>
              
              {/* Week Section */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  <label htmlFor="week" className="block font-bold mb-2 text-white">
                    Week Number
                  </label>
                  <input
                    type="number"
                    id="week"
                    name="week"
                    value={formData.week}
                    onChange={handleChange}
                    className="w-full md:w-1/3 px-3 py-3 bg-zinc-900 border-2 border-zinc-700 rounded text-white focus:outline-none focus:border-wwe-red transition-colors"
                    required
                    min="1"
                  />
                  <p className="text-zinc-400 text-sm mt-1">Current betting week: {currentWeek}</p>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/fixture-manager')}
                  className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-wwe-red hover:bg-red-700 text-white font-bold rounded transition-colors"
                >
                  Add Fixture
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddFixture;
