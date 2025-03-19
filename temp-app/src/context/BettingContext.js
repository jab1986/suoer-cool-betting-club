import React, { createContext, useContext, useState, useEffect } from 'react';
import { players as samplePlayers, fixtures as sampleFixtures, bets as sampleBets, currentWeek, BET_TYPES, OUTCOMES } from '../data/sampleData';

// Initial players data
const initialPlayers = {
  Gaz: {
    id: 1,
    points: 0,
    picksThisWeek: 1,
    totalWins: 0,
    totalBets: 0
  },
  Joe: {
    id: 2,
    points: 0,
    picksThisWeek: 1,
    totalWins: 0,
    totalBets: 0
  },
  Sean: {
    id: 3,
    points: 0,
    picksThisWeek: 1,
    totalWins: 0,
    totalBets: 0
  },
  Dean: {
    id: 4,
    points: 0,
    picksThisWeek: 1,
    totalWins: 0,
    totalBets: 0
  }
};

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

export const useBetting = () => useContext(BettingContext);

export const BettingProvider = ({ children }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [fixtures, setFixtures] = useState({});
  const [bets, setBets] = useState([]);
  const [week, setWeek] = useState(currentWeek);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from localStorage or use sample data
  useEffect(() => {
    try {
      const storedPlayers = localStorage.getItem('players');
      const storedFixtures = localStorage.getItem('fixtures');
      const storedBets = localStorage.getItem('bets');
      const storedWeek = localStorage.getItem('currentWeek');

      if (storedPlayers && storedFixtures && storedBets && storedWeek) {
        setPlayers(JSON.parse(storedPlayers));
        setFixtures(JSON.parse(storedFixtures));
        setBets(JSON.parse(storedBets));
        setWeek(parseInt(storedWeek));
      } else {
        // Use sample data if no stored data
        console.log('Using sample data');
        setPlayers(samplePlayers);
        setFixtures(sampleFixtures);
        setBets(sampleBets);
        setWeek(currentWeek);
        
        // Save sample data to localStorage
        localStorage.setItem('players', JSON.stringify(samplePlayers));
        localStorage.setItem('fixtures', JSON.stringify(sampleFixtures));
        localStorage.setItem('bets', JSON.stringify(sampleBets));
        localStorage.setItem('currentWeek', currentWeek.toString());
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
      setLoading(false);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('players', JSON.stringify(players));
      localStorage.setItem('fixtures', JSON.stringify(fixtures));
      localStorage.setItem('bets', JSON.stringify(bets));
      localStorage.setItem('currentWeek', week.toString());
    }
  }, [players, fixtures, bets, week, loading]);

  // Calculate player points based on bet outcomes
  useEffect(() => {
    const updatedPlayers = Object.entries(players).map(([id, player]) => {
      const playerBets = bets.filter(bet => bet.playerId === parseInt(id));
      const totalBets = playerBets.length;
      const correctBets = playerBets.filter(bet => bet.isCorrect === true).length;
      
      // Current week's picks calculation
      const thisWeekPicksCount = playerBets.filter(bet => bet.week === week).length;
      
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
    
    setPlayers(Object.fromEntries(updatedPlayers.map(player => [player.id, player])));
  }, [bets, week]);

  // Function to add a new bet
  const addBet = (playerName, fixtureId, betType, prediction) => {
    try {
      // Check if player has available picks
      const player = players[playerName];
      const weekBets = bets.filter(bet => bet.player === playerName && bet.week === week);
      
      if (weekBets.length >= player.picksPerWeek) {
        throw new Error(`${playerName} has already used all available picks for this week`);
      }
      
      // Create new bet
      const newBet = {
        id: `B${Date.now()}`,
        player: playerName,
        week: week,
        fixtureId,
        type: betType,
        prediction,
        result: null // Pending result
      };
      
      setBets(prevBets => [...prevBets, newBet]);
      return newBet;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Function to update fixture results
  const updateFixtureResult = (fixtureId, result, goalsHome, goalsAway) => {
    const updatedFixtures = Object.entries(fixtures).map(([id, fixture]) => {
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
    
    setFixtures(Object.fromEntries(updatedFixtures.map(fixture => [fixture.id, fixture])));
    
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
    setWeek(prevWeek => prevWeek + 1);
    
    // Logic for determining next week's picks based on this week's results
    const updatedPlayers = Object.entries(players).map(([id, player]) => {
      // Get player's bets from the current week
      const thisWeekBets = bets.filter(
        bet => bet.playerId === parseInt(id) && bet.week === week
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
    
    setPlayers(Object.fromEntries(updatedPlayers.map(player => [player.id, player])));
  };

  // Function to add a new fixture
  const addFixture = (homeTeam, awayTeam, date) => {
    try {
      const newFixture = {
        id: `F${Date.now()}`,
        week: week,
        homeTeam,
        awayTeam,
        date: new Date(date).toISOString(),
        completed: false,
        result: null
      };
      
      setFixtures(prevFixtures => {
        const updatedFixtures = {...prevFixtures};
        
        if (!updatedFixtures[week]) {
          updatedFixtures[week] = [];
        }
        
        updatedFixtures[week] = [...updatedFixtures[week], newFixture];
        return updatedFixtures;
      });
      
      return newFixture;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getPlayerById = (id) => {
    return players[id];
  };

  const getFixtureById = (fixtureId) => {
    for (const weekFixtures of Object.values(fixtures)) {
      const fixture = weekFixtures.find(f => f.id === fixtureId);
      if (fixture) return fixture;
    }
    return null;
  };

  const getPlayerBets = (playerId) => {
    return bets.filter(bet => bet.playerId === playerId);
  };

  const getCurrentWeekFixtures = () => {
    return Object.values(fixtures).filter(fixture => fixture.week === week);
  };

  const getCompletedFixtures = () => {
    return Object.values(fixtures).filter(fixture => fixture.status === 'completed');
  };

  // Complete a fixture and update results
  const completeFixture = (fixtureId, homeScore, awayScore) => {
    try {
      let targetFixture = null;
      let targetWeek = null;
      
      // Find the fixture
      Object.entries(fixtures).forEach(([weekNum, fixturesList]) => {
        const fixture = fixturesList.find(f => f.id === fixtureId);
        if (fixture) {
          targetFixture = fixture;
          targetWeek = parseInt(weekNum);
        }
      });
      
      if (!targetFixture) {
        throw new Error('Fixture not found');
      }
      
      // Calculate results
      const ftResult = 
        homeScore > awayScore ? "HOME" : 
        homeScore < awayScore ? "AWAY" : 
        "DRAW";
      
      const bttsResult = homeScore > 0 && awayScore > 0 ? "YES" : "NO";
      const overResult = homeScore + awayScore > 2.5 ? "YES" : "NO";
      const handicapResult = Math.random() > 0.5 ? "HOME" : "AWAY"; // Simplified for sample data
      
      // Update fixture
      setFixtures(prevFixtures => {
        const updatedFixtures = {...prevFixtures};
        const fixtureIndex = updatedFixtures[targetWeek].findIndex(f => f.id === fixtureId);
        
        updatedFixtures[targetWeek][fixtureIndex] = {
          ...targetFixture,
          completed: true,
          result: {
            homeScore,
            awayScore,
            FTR: ftResult,
            BTTS: bttsResult,
            OVER: overResult,
            HANDICAP: handicapResult
          }
        };
        
        return updatedFixtures;
      });
      
      // Update bet results
      const affectedBets = bets.filter(bet => bet.fixtureId === fixtureId);
      
      if (affectedBets.length > 0) {
        setBets(prevBets => {
          return prevBets.map(bet => {
            if (bet.fixtureId === fixtureId) {
              const resultValue = {
                FTR: ftResult,
                BTTS: bttsResult,
                OVER: overResult,
                HANDICAP: handicapResult
              }[bet.type];
              
              return {
                ...bet,
                result: resultValue === bet.prediction
              };
            }
            return bet;
          });
        });
        
        // Update player points
        setPlayers(prevPlayers => {
          const updatedPlayers = {...prevPlayers};
          
          affectedBets.forEach(bet => {
            const resultValue = {
              FTR: ftResult,
              BTTS: bttsResult,
              OVER: overResult,
              HANDICAP: handicapResult
            }[bet.type];
            
            if (resultValue === bet.prediction) {
              updatedPlayers[bet.player] = {
                ...updatedPlayers[bet.player],
                points: (updatedPlayers[bet.player].points || 0) + 1
              };
            }
          });
          
          return updatedPlayers;
        });
      }
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Move to next week
  const moveToNextWeek = () => {
    try {
      // Check if all fixtures for current week are completed
      const currentFixtures = fixtures[week] || [];
      const incompleteFixtures = currentFixtures.filter(f => !f.completed);
      
      if (incompleteFixtures.length > 0) {
        throw new Error('Cannot advance to next week: There are incomplete fixtures');
      }
      
      // Update picks per week for players based on this week's results
      setPlayers(prevPlayers => {
        const updatedPlayers = {...prevPlayers};
        
        Object.keys(updatedPlayers).forEach(playerName => {
          const playerBets = bets.filter(bet => 
            bet.player === playerName && 
            bet.week === week &&
            bet.result !== null
          );
          
          const totalBets = playerBets.length;
          const correctBets = playerBets.filter(bet => bet.result === true).length;
          
          // Double rule: If all picks correct (and at least 1 pick), get 2 picks next week, otherwise 1
          updatedPlayers[playerName].picksPerWeek = 
            (totalBets > 0 && correctBets === totalBets) ? 2 : 1;
        });
        
        return updatedPlayers;
      });
      
      // Advance to next week
      setWeek(prev => prev + 1);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Get fixtures for current week
  const getCurrentFixtures = () => {
    return fixtures[week] || [];
  };
  
  // Get bets for current week
  const getCurrentBets = () => {
    return bets.filter(bet => bet.week === week);
  };
  
  // Get pending bets for a player
  const getPendingBetsForPlayer = (playerName) => {
    return bets.filter(bet => 
      bet.player === playerName && 
      bet.week === week && 
      bet.result === null
    );
  };
  
  // Calculate remaining picks for a player this week
  const getRemainingPicks = (playerName) => {
    const player = players[playerName];
    if (!player) return 0;
    
    const usedPicks = bets.filter(bet => 
      bet.player === playerName && 
      bet.week === week
    ).length;
    
    return Math.max(0, player.picksPerWeek - usedPicks);
  };

  // Get player statistics
  const getPlayerStatistics = (playerName) => {
    // Add debugging to see what's happening
    console.log('Getting stats for player:', playerName);
    console.log('Players object:', players);
    
    const player = players[playerName];
    if (!player) {
      console.log('Player not found in players object');
      
      // Return default stats object instead of null
      return {
        points: 0,
        totalBets: 0,
        wins: 0,
        winRate: 0,
        streak: { type: '-', count: 0 },
        trend: 'STABLE',
        betTypeStats: {},
        weeklyPerformance: [],
        picksThisWeek: 1,
        form: 0
      };
    }

    // Get all bets for the player
    const playerBets = bets.filter(bet => bet.playerId === player.id);
    const completedBets = playerBets.filter(bet => bet.isCorrect !== null);
    const recentBets = completedBets.slice(-3);

    // Calculate basic stats
    const totalBets = completedBets.length;
    const wins = completedBets.filter(bet => bet.isCorrect).length;
    const winRate = totalBets > 0 ? Math.round((wins / totalBets) * 100) : 0;

    // Calculate streak
    let currentStreak = { type: null, count: 0 };
    for (let i = completedBets.length - 1; i >= 0; i--) {
      const bet = completedBets[i];
      if (currentStreak.type === null) {
        currentStreak.type = bet.isCorrect ? 'W' : 'L';
        currentStreak.count = 1;
      } else if ((bet.isCorrect && currentStreak.type === 'W') || 
                (!bet.isCorrect && currentStreak.type === 'L')) {
        currentStreak.count++;
      } else {
        break;
      }
    }

    // Calculate trend
    const recentWinRate = recentBets.length > 0 
      ? (recentBets.filter(bet => bet.isCorrect).length / recentBets.length) * 100 
      : 0;
    const trend = recentWinRate > winRate ? 'UP' : recentWinRate < winRate ? 'DOWN' : 'STABLE';

    // Calculate bet type stats
    const betTypeStats = {};
    Object.values(BET_TYPES).forEach(type => {
      const typeBets = completedBets.filter(bet => bet.betType === type);
      const typeWins = typeBets.filter(bet => bet.isCorrect).length;
      betTypeStats[type] = {
        total: typeBets.length,
        wins: typeWins,
        winRate: typeBets.length > 0 ? Math.round((typeWins / typeBets.length) * 100) : 0
      };
    });

    // Calculate weekly performance
    const weeklyPerformance = {};
    playerBets.forEach(bet => {
      if (bet.week) {
        if (!weeklyPerformance[bet.week]) {
          weeklyPerformance[bet.week] = {
            total: 0,
            wins: 0,
            points: 0
          };
        }
        if (bet.isCorrect !== null) {
          weeklyPerformance[bet.week].total++;
          if (bet.isCorrect) {
            weeklyPerformance[bet.week].wins++;
            weeklyPerformance[bet.week].points++;
          }
        }
      }
    });

    // Calculate form (last 5 weeks)
    const weekKeys = Object.keys(weeklyPerformance).map(Number).sort((a, b) => b - a);
    const lastFiveWeeks = weekKeys.slice(0, 5).map(week => ({
      week,
      ...weeklyPerformance[week]
    }));

    const formValue = lastFiveWeeks.length > 0 
      ? lastFiveWeeks.reduce((acc, week) => acc + week.points, 0) / lastFiveWeeks.length
      : 0;

    return {
      points: player.points,
      totalBets,
      wins,
      winRate,
      streak: currentStreak.type ? currentStreak : { type: '-', count: 0 },
      trend,
      betTypeStats,
      weeklyPerformance: lastFiveWeeks,
      picksThisWeek: player.picksThisWeek,
      form: formValue
    };
  };

  // Context value with all the functions and data
  const contextValue = {
    players,
    fixtures,
    bets,
    week,
    loading,
    error,
    BET_TYPES,
    OUTCOMES,
    getPlayerStatistics,
    getFixtureById,
    addBet,
    updateFixtureResult,
    advanceToNextWeek,
    addFixture,
    getPlayerById,
    getPlayerBets,
    getCurrentFixtures,
    getCompletedFixtures,
    completeFixture,
    moveToNextWeek,
    getCurrentBets,
    getPendingBetsForPlayer,
    getRemainingPicks
  };

  return (
    <BettingContext.Provider value={contextValue}>
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext; 