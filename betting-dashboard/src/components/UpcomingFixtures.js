import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingFixtures = () => {
  // Mock data - would come from API in production
  const fixtures = [
    {
      id: 1,
      date: '2023-11-28T15:00:00',
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester City',
      league: 'Premier League'
    },
    {
      id: 2,
      date: '2023-11-28T17:30:00',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      league: 'La Liga'
    },
    {
      id: 3,
      date: '2023-11-29T19:45:00',
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      league: 'Serie A'
    }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      {fixtures.map((fixture) => (
        <div key={fixture.id} className="border-b border-metal-gray border-opacity-30 py-3 last:border-b-0">
          <div className="flex items-center text-sm text-metal-gray mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(fixture.date)}</span>
            <span className="mx-2">•</span>
            <span>{fixture.league}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold">{fixture.homeTeam}</span>
              <span className="text-metal-gray">vs</span>
              <span className="font-bold">{fixture.awayTeam}</span>
            </div>
            
            <Link 
              to={`/fixtures?id=${fixture.id}`}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      ))}
      
      <div className="mt-4 text-right">
        <Link to="/fixtures" className="text-secondary font-bold hover:underline">
          View all fixtures &rarr;
        </Link>
      </div>
    </div>
  );
};

export default UpcomingFixtures; 