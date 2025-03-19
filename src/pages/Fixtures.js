import React, { useState } from 'react';
import { Calendar, Clock, Trophy } from 'lucide-react';
import { useBetting } from '../context/BettingContext';
import { Layout } from '../components/layout';

const Fixtures = () => {
  const { fixtures, currentWeek } = useBetting();
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  
  // Filter fixtures based on selected week
  const weekFixtures = fixtures.filter(fixture => 
    fixture.week === selectedWeek
  );
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-wwe-yellow mb-4 drop-shadow-lg">
            FIXTURES
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            View all upcoming matches and results from previous weeks.
            Check the schedule and plan your bets.
          </p>
        </div>
        
        {/* Week Selection */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-wwe-red scrollbar-track-zinc-800">
          {Array.from({ length: currentWeek + 3 }, (_, i) => (
            <button
              key={i + 1}
              className={`px-6 py-3 rounded-md font-bold whitespace-nowrap transition-colors ${selectedWeek === i + 1 ? 'bg-wwe-red text-white hover:bg-red-700' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
              onClick={() => setSelectedWeek(i + 1)}
            >
              WEEK {i + 1}
            </button>
          ))}
        </div>
        
        {/* Fixtures Grid */}
        {weekFixtures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekFixtures.map(fixture => (
              <div key={fixture.id} className="bg-zinc-800 rounded-lg p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 text-wwe-gold mb-4">
                  <Calendar size={20} />
                  <span>Week {selectedWeek}</span>
                </div>
                
                <div className="flex justify-between items-center w-full my-4">
                  <div className="text-center w-2/5">
                    <div className="font-bold text-white text-xl">{fixture.homeTeam}</div>
                  </div>
                  <div className="text-2xl text-wwe-red font-bold">VS</div>
                  <div className="text-center w-2/5">
                    <div className="font-bold text-white text-xl">{fixture.awayTeam}</div>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-zinc-400 flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(fixture.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    <span>{fixture.time || "TBD"}</span>
                  </div>
                </div>
                
                {fixture.status === 'completed' && (
                  <div className="mt-4 py-2 px-6 bg-zinc-900 rounded-full text-wwe-yellow font-bold text-xl">
                    {fixture.goalsHome} - {fixture.goalsAway}
                  </div>
                )}
                
                {fixture.status === 'upcoming' && (
                  <button className="mt-4 bg-wwe-gold hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-colors">
                    Make Prediction
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-800 rounded-lg p-8 text-center">
            <Trophy size={48} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-xl text-zinc-400">No fixtures found for Week {selectedWeek}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Fixtures;
