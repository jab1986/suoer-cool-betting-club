import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CurrentWeekBets = () => {
  // Mock data - would come from API in production
  const weekNumber = 29;
  const picks = [
    { 
      id: 1, 
      player: 'Sean', 
      match: 'Liverpool vs Manchester City', 
      prediction: 'Liverpool Win', 
      type: 'Full Time Result',
      date: '2023-11-28T15:00:00'
    },
    { 
      id: 2, 
      player: 'Gaz', 
      match: 'Liverpool vs Manchester City', 
      prediction: 'Both Teams To Score', 
      type: 'Both Teams To Score',
      date: '2023-11-28T15:00:00'
    },
    { 
      id: 3, 
      player: 'Joe', 
      match: 'Real Madrid vs Barcelona', 
      prediction: 'Barcelona Win', 
      type: 'Full Time Result',
      date: '2023-11-28T17:30:00'
    },
    { 
      id: 4, 
      player: 'Dean', 
      match: 'Juventus vs AC Milan', 
      prediction: 'Over 2.5', 
      type: 'Over 2.5 Goals',
      date: '2023-11-29T19:45:00'
    },
    { 
      id: 5, 
      player: 'Sean', 
      match: 'Juventus vs AC Milan', 
      prediction: 'Draw', 
      type: 'Full Time Result',
      date: '2023-11-29T19:45:00'
    }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Group picks by date
  const groupedPicks = picks.reduce((acc, pick) => {
    const date = formatDate(pick.date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(pick);
    return acc;
  }, {});

  return (
    <div>
      <div className="bg-primary bg-opacity-10 px-4 py-2 mb-4 flex justify-between items-center">
        <h3 className="font-bold">Week {weekNumber}</h3>
        <span className="text-sm">{picks.length} total picks</span>
      </div>
      
      {Object.entries(groupedPicks).map(([date, dayPicks]) => (
        <div key={date} className="mb-4 last:mb-0">
          <div className="font-bold text-metal-gray mb-2">{date}</div>
          
          <div className="space-y-2">
            {dayPicks.map((pick) => (
              <div key={pick.id} className="bg-metal-gray bg-opacity-10 p-3">
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs mr-2">
                    {pick.player.charAt(0)}
                  </div>
                  <span className="font-bold">{pick.player}</span>
                </div>
                
                <div className="ml-8">
                  <div className="text-sm mb-1">{pick.match}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-metal-gray bg-opacity-30 px-2 py-1 rounded-sm mr-2">
                        {pick.type}
                      </span>
                      <span className="font-bold">{pick.prediction}</span>
                    </div>
                    
                    <Link 
                      to={`/fixtures?match=${encodeURIComponent(pick.match)}`}
                      className="text-secondary hover:text-primary transition-colors duration-200"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-4 text-right">
        <Link to="/fixtures" className="text-secondary font-bold hover:underline">
          View all picks &rarr;
        </Link>
      </div>
    </div>
  );
};

export default CurrentWeekBets; 