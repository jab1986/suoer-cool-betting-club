import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';

const Fixtures = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFixture, setExpandedFixture] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    leagues: [],
    teams: [],
    betTypes: []
  });

  // Mock data - in a real app this would come from an API
  const leagues = [
    { id: 1, name: 'Premier League', country: 'England' },
    { id: 2, name: 'La Liga', country: 'Spain' },
    { id: 3, name: 'Serie A', country: 'Italy' },
    { id: 4, name: 'Bundesliga', country: 'Germany' }
  ];

  const upcomingFixtures = [
    {
      id: 1,
      date: '2023-11-28T15:00:00',
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester City',
      league: 'Premier League',
      leagueId: 1,
      odds: {
        homeWin: 2.1,
        draw: 3.5,
        awayWin: 2.7,
        btts: 1.6,
        over25: 1.5
      },
      picks: [
        { player: 'Sean', prediction: 'homeWin', betType: 'Full Time Result' },
        { player: 'Gaz', prediction: 'btts', betType: 'Both Teams To Score' }
      ]
    },
    {
      id: 2,
      date: '2023-11-28T17:30:00',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      league: 'La Liga',
      leagueId: 2,
      odds: {
        homeWin: 1.9,
        draw: 3.2,
        awayWin: 3.1,
        btts: 1.5,
        over25: 1.7
      },
      picks: [
        { player: 'Joe', prediction: 'awayWin', betType: 'Full Time Result' }
      ]
    },
    {
      id: 3,
      date: '2023-11-29T19:45:00',
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      league: 'Serie A',
      leagueId: 3,
      odds: {
        homeWin: 2.3,
        draw: 3.1,
        awayWin: 2.5,
        btts: 1.8,
        over25: 1.9
      },
      picks: [
        { player: 'Dean', prediction: 'over25', betType: 'Over 2.5 Goals' },
        { player: 'Sean', prediction: 'draw', betType: 'Full Time Result' }
      ]
    },
    {
      id: 4,
      date: '2023-11-30T14:30:00',
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      league: 'Bundesliga',
      leagueId: 4,
      odds: {
        homeWin: 1.7,
        draw: 3.8,
        awayWin: 3.2,
        btts: 1.4,
        over25: 1.3
      },
      picks: []
    }
  ];

  const pastFixtures = [
    {
      id: 101,
      date: '2023-11-21T15:00:00',
      homeTeam: 'Arsenal',
      awayTeam: 'Tottenham',
      league: 'Premier League',
      leagueId: 1,
      result: {
        homeScore: 2,
        awayScore: 1,
        outcome: 'homeWin',
        btts: true,
        over25: true
      },
      picks: [
        { player: 'Sean', prediction: 'homeWin', betType: 'Full Time Result', correct: true },
        { player: 'Gaz', prediction: 'btts', betType: 'Both Teams To Score', correct: true },
        { player: 'Joe', prediction: 'awayWin', betType: 'Full Time Result', correct: false }
      ]
    },
    {
      id: 102,
      date: '2023-11-20T19:45:00',
      homeTeam: 'Atletico Madrid',
      awayTeam: 'Valencia',
      league: 'La Liga',
      leagueId: 2,
      result: {
        homeScore: 0,
        awayScore: 0,
        outcome: 'draw',
        btts: false,
        over25: false
      },
      picks: [
        { player: 'Dean', prediction: 'homeWin', betType: 'Full Time Result', correct: false },
        { player: 'Sean', prediction: 'over25', betType: 'Over 2.5 Goals', correct: false }
      ]
    },
    {
      id: 103,
      date: '2023-11-19T14:30:00',
      homeTeam: 'Inter Milan',
      awayTeam: 'Napoli',
      league: 'Serie A',
      leagueId: 3,
      result: {
        homeScore: 3,
        awayScore: 1,
        outcome: 'homeWin',
        btts: true,
        over25: true
      },
      picks: [
        { player: 'Gaz', prediction: 'btts', betType: 'Both Teams To Score', correct: true },
        { player: 'Joe', prediction: 'over25', betType: 'Over 2.5 Goals', correct: true }
      ]
    }
  ];

  // Filter fixtures based on search query and filters
  const filteredUpcomingFixtures = upcomingFixtures.filter(fixture => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      `${fixture.homeTeam} vs ${fixture.awayTeam} ${fixture.league}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    // League filter
    const matchesLeague = filters.leagues.length === 0 || 
      filters.leagues.includes(fixture.leagueId);
    
    // Team filter
    const matchesTeam = filters.teams.length === 0 || 
      filters.teams.includes(fixture.homeTeam) || filters.teams.includes(fixture.awayTeam);
    
    return matchesSearch && matchesLeague && matchesTeam;
  });

  const filteredPastFixtures = pastFixtures.filter(fixture => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      `${fixture.homeTeam} vs ${fixture.awayTeam} ${fixture.league}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    // League filter
    const matchesLeague = filters.leagues.length === 0 || 
      filters.leagues.includes(fixture.leagueId);
    
    // Team filter
    const matchesTeam = filters.teams.length === 0 || 
      filters.teams.includes(fixture.homeTeam) || filters.teams.includes(fixture.awayTeam);
    
    return matchesSearch && matchesLeague && matchesTeam;
  });

  // Toggle expand fixture details
  const toggleExpandFixture = (fixtureId) => {
    if (expandedFixture === fixtureId) {
      setExpandedFixture(null);
    } else {
      setExpandedFixture(fixtureId);
    }
  };

  // Format date to display
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

  // Get prediction display
  const getPredictionDisplay = (prediction) => {
    switch (prediction) {
      case 'homeWin': return 'Home Win';
      case 'draw': return 'Draw';
      case 'awayWin': return 'Away Win';
      case 'btts': return 'Both Teams To Score';
      case 'over25': return 'Over 2.5 Goals';
      default: return prediction;
    }
  };

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-title text-primary mb-8">FIXTURES & RESULTS</h1>
      
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`py-3 px-6 font-bold transition duration-200 ${
            activeTab === 'upcoming'
              ? 'bg-primary text-white'
              : 'bg-metal-gray bg-opacity-30 hover:bg-opacity-50'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          UPCOMING FIXTURES
        </button>
        <button
          className={`py-3 px-6 font-bold transition duration-200 ${
            activeTab === 'past'
              ? 'bg-primary text-white'
              : 'bg-metal-gray bg-opacity-30 hover:bg-opacity-50'
          }`}
          onClick={() => setActiveTab('past')}
        >
          PAST RESULTS
        </button>
      </div>
      
      {/* Search and filter */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-metal-gray rounded-sm bg-metal-gray bg-opacity-10 focus:ring-primary focus:border-primary"
              placeholder="Search fixtures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button
              className="flex items-center gap-2 py-2 px-4 bg-metal-gray bg-opacity-20 rounded-sm"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {filterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-black border border-metal-gray rounded-sm shadow-lg z-10 p-4">
                <h4 className="font-bold mb-2">Leagues</h4>
                <div className="space-y-1 mb-4">
                  {leagues.map(league => (
                    <label key={league.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.leagues.includes(league.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              leagues: [...filters.leagues, league.id]
                            });
                          } else {
                            setFilters({
                              ...filters,
                              leagues: filters.leagues.filter(id => id !== league.id)
                            });
                          }
                        }}
                      />
                      {league.name}
                    </label>
                  ))}
                </div>
                
                <button
                  className="w-full py-1 px-2 bg-primary text-white font-bold rounded-sm"
                  onClick={() => setFilters({ leagues: [], teams: [], betTypes: [] })}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Fixtures list */}
      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          filteredUpcomingFixtures.length > 0 ? (
            filteredUpcomingFixtures.map(fixture => (
              <div key={fixture.id} className="card overflow-hidden">
                <div 
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleExpandFixture(fixture.id)}
                >
                  <div>
                    <div className="text-sm text-metal-gray flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(fixture.date)}
                    </div>
                    <div className="font-bold text-xl mt-1">
                      {fixture.homeTeam} vs {fixture.awayTeam}
                    </div>
                    <div className="text-sm mt-1">{fixture.league}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="mb-1 bg-primary bg-opacity-10 py-1 px-2 rounded-sm text-sm">
                      {fixture.picks.length} picks
                    </div>
                    {expandedFixture === fixture.id ? 
                      <ChevronUp className="h-5 w-5" /> : 
                      <ChevronDown className="h-5 w-5" />
                    }
                  </div>
                </div>
                
                {expandedFixture === fixture.id && (
                  <div className="p-4 pt-0 border-t border-metal-gray border-opacity-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold mb-2">Odds</h3>
                        <table className="w-full">
                          <tbody>
                            <tr className="border-b border-metal-gray border-opacity-20">
                              <td className="py-2">{fixture.homeTeam} Win</td>
                              <td className="py-2 font-bold text-right">{fixture.odds.homeWin}</td>
                            </tr>
                            <tr className="border-b border-metal-gray border-opacity-20">
                              <td className="py-2">Draw</td>
                              <td className="py-2 font-bold text-right">{fixture.odds.draw}</td>
                            </tr>
                            <tr className="border-b border-metal-gray border-opacity-20">
                              <td className="py-2">{fixture.awayTeam} Win</td>
                              <td className="py-2 font-bold text-right">{fixture.odds.awayWin}</td>
                            </tr>
                            <tr className="border-b border-metal-gray border-opacity-20">
                              <td className="py-2">Both Teams To Score</td>
                              <td className="py-2 font-bold text-right">{fixture.odds.btts}</td>
                            </tr>
                            <tr>
                              <td className="py-2">Over 2.5 Goals</td>
                              <td className="py-2 font-bold text-right">{fixture.odds.over25}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div>
                        <h3 className="font-bold mb-2">Picks</h3>
                        {fixture.picks.length > 0 ? (
                          <div className="space-y-2">
                            {fixture.picks.map((pick, index) => (
                              <div key={index} className="bg-metal-gray bg-opacity-10 p-3 rounded-sm">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-2">
                                    {pick.player.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-bold">{pick.player}</div>
                                    <div className="text-sm">
                                      {pick.betType}: {getPredictionDisplay(pick.prediction)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <Clock className="w-6 h-6 mx-auto mb-2 text-metal-gray" />
                            <p>No picks yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <p className="text-xl">No upcoming fixtures found</p>
            </div>
          )
        ) : (
          // Past fixtures
          filteredPastFixtures.length > 0 ? (
            filteredPastFixtures.map(fixture => (
              <div key={fixture.id} className="card overflow-hidden">
                <div 
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleExpandFixture(fixture.id)}
                >
                  <div>
                    <div className="text-sm text-metal-gray flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(fixture.date)}
                    </div>
                    <div className="font-bold text-xl mt-1">
                      {fixture.homeTeam} {fixture.result.homeScore} - {fixture.result.awayScore} {fixture.awayTeam}
                    </div>
                    <div className="text-sm mt-1">{fixture.league}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="mb-1 bg-primary bg-opacity-10 py-1 px-2 rounded-sm text-sm">
                      {fixture.picks.filter(p => p.correct).length}/{fixture.picks.length} correct
                    </div>
                    {expandedFixture === fixture.id ? 
                      <ChevronUp className="h-5 w-5" /> : 
                      <ChevronDown className="h-5 w-5" />
                    }
                  </div>
                </div>
                
                {expandedFixture === fixture.id && (
                  <div className="p-4 pt-0 border-t border-metal-gray border-opacity-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold mb-2">Match Details</h3>
                        <table className="w-full">
                          <tbody>
                            <tr className="border-b border-metal-gray border-opacity-20">
                              <td className="py-2">Result</td>
                              <td className="py-2 font-bold text-right">
                                {fixture.result.outcome === 'homeWin' ? fixture.homeTeam : 
                                 fixture.result.outcome === 'awayWin' ? fixture.awayTeam : 'Draw'}
                              </td>
                            </tr>
                            <tr className="border-b border-metal-gray border-opacity-20">
                              <td className="py-2">Score</td>
                              <td className="py-2 font-bold text-right">
                                {fixture.result.homeScore} - {fixture.result.awayScore}
                              </td>
                            </tr>
                            <tr className="border-b border-metal-gray border-opacity-20">
                              <td className="py-2">Both Teams Scored</td>
                              <td className="py-2 font-bold text-right">
                                {fixture.result.btts ? 'Yes' : 'No'}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2">Over 2.5 Goals</td>
                              <td className="py-2 font-bold text-right">
                                {fixture.result.over25 ? 'Yes' : 'No'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div>
                        <h3 className="font-bold mb-2">Picks</h3>
                        {fixture.picks.length > 0 ? (
                          <div className="space-y-2">
                            {fixture.picks.map((pick, index) => (
                              <div key={index} className="bg-metal-gray bg-opacity-10 p-3 rounded-sm">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-2">
                                      {pick.player.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="font-bold">{pick.player}</div>
                                      <div className="text-sm">
                                        {pick.betType}: {getPredictionDisplay(pick.prediction)}
                                      </div>
                                    </div>
                                  </div>
                                  {pick.correct ? 
                                    <CheckCircle className="w-6 h-6 text-green-500" /> : 
                                    <XCircle className="w-6 h-6 text-red-500" />
                                  }
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <p>No picks for this match</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <p className="text-xl">No past fixtures found</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Fixtures; 