import React, { createContext, useContext, useState, useEffect } from 'react';
import { players as samplePlayers, fixtures as sampleFixtures, bets as sampleBets, currentWeek, BET_TYPES, OUTCOMES } from '../data/sampleData';

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

export const useBetting = () => useContext(BettingContext);

export const BettingProvider = ({ children }) => {
  const [players, setPlayers] = useState({});
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

  const getFixtureById = (id) => {
    return fixtures[id];
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
    const player = players[playerName];
    if (!player) return null;
    
    const playerBets = bets.filter(bet => bet.player === playerName);
    const completedBets = playerBets.filter(bet => bet.result !== null);
    const wins = completedBets.filter(bet => bet.result === true).length;
    
    // Bets by week
    const betsByWeek = {};
    for (let w = 1; w <= week; w++) {
      const weekBets = playerBets.filter(bet => bet.week === w);
      const completedWeekBets = weekBets.filter(bet => bet.result !== null);
      const weekWins = completedWeekBets.filter(bet => bet.result === true).length;
      
      betsByWeek[w] = {
        total: weekBets.length,
        completed: completedWeekBets.length,
        wins: weekWins,
        points: weekWins
      };
    }
    
    // Bets by type
    const betsByType = {};
    Object.keys(BET_TYPES).forEach(type => {
      const typeBets = completedBets.filter(bet => bet.type === type);
      const typeWins = typeBets.filter(bet => bet.result === true).length;
      
      betsByType[type] = {
        total: typeBets.length,
        wins: typeWins,
        winRate: typeBets.length > 0 ? (typeWins / typeBets.length * 100).toFixed(1) : "0.0"
      };
    });
    
    return {
      ...player,
      totalBets: completedBets.length,
      wins,
      winRate: completedBets.length > 0 ? (wins / completedBets.length * 100).toFixed(1) : "0.0",
      betsByWeek,
      betsByType,
      pendingBets: getPendingBetsForPlayer(playerName),
      remainingPicks: getRemainingPicks(playerName)
    };
  };

  return (
    <BettingContext.Provider value={{
      players,
      fixtures,
      bets,
      week,
      loading,
      error,
      addBet,
      updateFixtureResult,
      advanceToNextWeek,
      addFixture,
      getPlayerById,
      getFixtureById,
      getPlayerBets,
      getCurrentFixtures,
      getCompletedFixtures,
      completeFixture,
      moveToNextWeek,
      getCurrentBets,
      getPendingBetsForPlayer,
      getRemainingPicks,
      getPlayerStatistics,
      betTypes: BET_TYPES,
      outcomes: OUTCOMES
    }}>
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext; 