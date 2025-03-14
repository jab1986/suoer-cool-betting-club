import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial players data
const initialPlayers = [
  { id: 1, name: 'Gaz', points: 0, picksThisWeek: 1, totalWins: 0, totalBets: 0 },
  { id: 2, name: 'Joe', points: 0, picksThisWeek: 1, totalWins: 0, totalBets: 0 },
  { id: 3, name: 'Sean', points: 0, picksThisWeek: 1, totalWins: 0, totalBets: 0 },
  { id: 4, name: 'Dean', points: 0, picksThisWeek: 1, totalWins: 0, totalBets: 0 },
];

// Initial fixtures data
const initialFixtures = [
  {
    id: 1,
    homeTeam: 'Liverpool',
    awayTeam: 'Arsenal',
    date: '2023-12-10',
    time: '15:00',
    week: 24,
    status: 'upcoming', // upcoming, in-progress, completed
    result: null, // null, 'home', 'away', 'draw'
    goalsHome: null,
    goalsAway: null,
    btts: null, // both teams to score (true/false)
    over25: null, // over 2.5 goals (true/false)
  },
  {
    id: 2,
    homeTeam: 'Man City',
    awayTeam: 'Chelsea',
    date: '2023-12-10',
    time: '17:30',
    week: 24,
    status: 'upcoming',
    result: null,
    goalsHome: null,
    goalsAway: null,
    btts: null,
    over25: null,
  },
  {
    id: 3,
    homeTeam: 'Tottenham',
    awayTeam: 'Man Utd',
    date: '2023-12-11',
    time: '14:00',
    week: 24,
    status: 'upcoming',
    result: null,
    goalsHome: null,
    goalsAway: null,
    btts: null,
    over25: null,
  },
  {
    id: 4,
    homeTeam: 'Newcastle',
    awayTeam: 'Brighton',
    date: '2023-12-11',
    time: '16:30',
    week: 24,
    status: 'upcoming',
    result: null,
    goalsHome: null,
    goalsAway: null,
    btts: null,
    over25: null,
  },
  {
    id: 5,
    homeTeam: 'Aston Villa',
    awayTeam: 'Wolves',
    date: '2023-12-12',
    time: '20:00',
    week: 24,
    status: 'upcoming',
    result: null,
    goalsHome: null,
    goalsAway: null,
    btts: null,
    over25: null,
  },
  // Previously completed fixtures
  {
    id: 6,
    homeTeam: 'Man Utd',
    awayTeam: 'Liverpool',
    date: '2023-12-03',
    time: '16:30',
    week: 23,
    status: 'completed',
    result: 'home',
    goalsHome: 2,
    goalsAway: 1,
    btts: true,
    over25: true,
  },
  {
    id: 7,
    homeTeam: 'Arsenal',
    awayTeam: 'Tottenham',
    date: '2023-12-03',
    time: '14:00',
    week: 23,
    status: 'completed',
    result: 'draw',
    goalsHome: 2,
    goalsAway: 2,
    btts: true,
    over25: true,
  },
];

// Initial bets data
const initialBets = [
  {
    id: 1,
    playerId: 3, // Sean
    fixtureId: 1,
    betType: 'Full Time Result',
    prediction: 'home', // home, away, draw
    isCorrect: null, // null, true, false
    week: 24,
  },
  {
    id: 2,
    playerId: 3, // Sean
    fixtureId: 2,
    betType: 'Over/Under',
    prediction: 'over',
    isCorrect: null,
    week: 24,
  },
  {
    id: 3,
    playerId: 1, // Gaz
    fixtureId: 3,
    betType: 'Full Time Result',
    prediction: 'home',
    isCorrect: null,
    week: 24,
  },
  {
    id: 4,
    playerId: 2, // Joe
    fixtureId: 4,
    betType: 'Both Teams To Score',
    prediction: 'yes',
    isCorrect: null,
    week: 24,
  },
  {
    id: 5,
    playerId: 4, // Dean
    fixtureId: 5,
    betType: 'Handicap',
    prediction: 'home -1',
    isCorrect: null,
    week: 24,
  },
  {
    id: 6,
    playerId: 4, // Dean
    fixtureId: 2,
    betType: 'Over/Under',
    prediction: 'under',
    isCorrect: null,
    week: 24,
  },
  // Previous week's bets that have been evaluated
  {
    id: 7,
    playerId: 1, // Gaz
    fixtureId: 6,
    betType: 'Full Time Result',
    prediction: 'home',
    isCorrect: true,
    week: 23,
  },
  {
    id: 8,
    playerId: 2, // Joe
    fixtureId: 7,
    betType: 'Both Teams To Score',
    prediction: 'yes',
    isCorrect: true,
    week: 23,
  },
  {
    id: 9,
    playerId: 3, // Sean
    fixtureId: 6,
    betType: 'Over/Under',
    prediction: 'over',
    isCorrect: true,
    week: 23,
  },
  {
    id: 10,
    playerId: 4, // Dean
    fixtureId: 7,
    betType: 'Full Time Result',
    prediction: 'away',
    isCorrect: false,
    week: 23,
  },
];

// Create the context
const BettingContext = createContext();

export const BettingProvider = ({ children }) => {
  // States for our data
  const [players, setPlayers] = useState(() => {
    const storedPlayers = localStorage.getItem('players');
    return storedPlayers ? JSON.parse(storedPlayers) : initialPlayers;
  });
  
  const [fixtures, setFixtures] = useState(() => {
    const storedFixtures = localStorage.getItem('fixtures');
    return storedFixtures ? JSON.parse(storedFixtures) : initialFixtures;
  });
  
  const [bets, setBets] = useState(() => {
    const storedBets = localStorage.getItem('bets');
    return storedBets ? JSON.parse(storedBets) : initialBets;
  });
  
  const [currentWeek, setCurrentWeek] = useState(() => {
    const storedWeek = localStorage.getItem('currentWeek');
    return storedWeek ? parseInt(storedWeek, 10) : 24;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('fixtures', JSON.stringify(fixtures));
    localStorage.setItem('bets', JSON.stringify(bets));
    localStorage.setItem('currentWeek', currentWeek.toString());
  }, [players, fixtures, bets, currentWeek]);

  // Calculate player points based on bet outcomes
  useEffect(() => {
    const updatedPlayers = players.map(player => {
      const playerBets = bets.filter(bet => bet.playerId === player.id);
      const totalBets = playerBets.length;
      const correctBets = playerBets.filter(bet => bet.isCorrect === true).length;
      
      // Current week's picks calculation
      const thisWeekPicksCount = playerBets.filter(bet => bet.week === currentWeek).length;
      
      // Calculate points (1 point per correct bet)
      const points = correctBets;
      
      return {
        ...player,
        points,
        totalBets,
        totalWins: correctBets,
        picksThisWeek: thisWeekPicksCount
      };
    });
    
    setPlayers(updatedPlayers);
  }, [bets, currentWeek]);

  // Function to add a new bet
  const addBet = (playerId, fixtureId, betType, prediction) => {
    const newBet = {
      id: bets.length + 1,
      playerId,
      fixtureId,
      betType,
      prediction,
      isCorrect: null,
      week: currentWeek,
    };
    
    setBets([...bets, newBet]);
  };

  // Function to update fixture results
  const updateFixtureResult = (fixtureId, result, goalsHome, goalsAway) => {
    const updatedFixtures = fixtures.map(fixture => {
      if (fixture.id === fixtureId) {
        const btts = goalsHome > 0 && goalsAway > 0;
        const over25 = goalsHome + goalsAway > 2;
        
        return {
          ...fixture,
          result,
          goalsHome,
          goalsAway,
          status: 'completed',
          btts,
          over25,
        };
      }
      return fixture;
    });
    
    setFixtures(updatedFixtures);
    
    // Update bet outcomes based on fixture results
    const updatedBets = bets.map(bet => {
      if (bet.fixtureId === fixtureId) {
        const fixture = updatedFixtures.find(f => f.id === fixtureId);
        let isCorrect = false;
        
        if (bet.betType === 'Full Time Result') {
          isCorrect = bet.prediction === fixture.result;
        } else if (bet.betType === 'Both Teams To Score') {
          isCorrect = (bet.prediction === 'yes' && fixture.btts) || 
                     (bet.prediction === 'no' && !fixture.btts);
        } else if (bet.betType === 'Over/Under') {
          isCorrect = (bet.prediction === 'over' && fixture.over25) || 
                     (bet.prediction === 'under' && !fixture.over25);
        }
        // Note: Handicap bets would need more complex logic
        
        return { ...bet, isCorrect };
      }
      return bet;
    });
    
    setBets(updatedBets);
  };

  // Function to advance to the next week
  const advanceToNextWeek = () => {
    setCurrentWeek(prevWeek => prevWeek + 1);
    
    // Logic for determining next week's picks based on this week's results
    const updatedPlayers = players.map(player => {
      // Get player's bets from the current week
      const thisWeekBets = bets.filter(
        bet => bet.playerId === player.id && bet.week === currentWeek
      );
      
      // Count correct predictions this week
      const correctPredictions = thisWeekBets.filter(bet => bet.isCorrect === true).length;
      
      // If player got all picks correct this week (and had at least 2 picks), they get 2 picks next week
      const picksNextWeek = (correctPredictions === thisWeekBets.length && thisWeekBets.length >= 2) ? 2 : 1;
      
      return {
        ...player,
        picksThisWeek: picksNextWeek
      };
    });
    
    setPlayers(updatedPlayers);
  };

  // Function to add a new fixture
  const addFixture = (homeTeam, awayTeam, date, time) => {
    const newFixture = {
      id: fixtures.length + 1,
      homeTeam,
      awayTeam,
      date,
      time,
      week: currentWeek,
      status: 'upcoming',
      result: null,
      goalsHome: null,
      goalsAway: null,
      btts: null,
      over25: null,
    };
    
    setFixtures([...fixtures, newFixture]);
  };

  const getPlayerById = (id) => {
    return players.find(player => player.id === id);
  };

  const getFixtureById = (id) => {
    return fixtures.find(fixture => fixture.id === id);
  };

  const getPlayerBets = (playerId) => {
    return bets.filter(bet => bet.playerId === playerId);
  };

  const getCurrentWeekFixtures = () => {
    return fixtures.filter(fixture => fixture.week === currentWeek);
  };

  const getCompletedFixtures = () => {
    return fixtures.filter(fixture => fixture.status === 'completed');
  };

  return (
    <BettingContext.Provider
      value={{
        players,
        fixtures,
        bets,
        currentWeek,
        addBet,
        updateFixtureResult,
        advanceToNextWeek,
        addFixture,
        getPlayerById,
        getFixtureById,
        getPlayerBets,
        getCurrentWeekFixtures,
        getCompletedFixtures,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

// Custom hook to use the betting context
export const useBetting = () => {
  const context = useContext(BettingContext);
  if (context === undefined) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
}; 