import React, { createContext, useContext, useState, useEffect } from 'react';
import { players as samplePlayers, fixtures as sampleFixtures, bets as sampleBets, currentWeek, BET_TYPES, OUTCOMES } from '../data/sampleData';

// Create context
const BettingContext = createContext();

// Custom hook for using the betting context
export const useBetting = () => {
  const context = useContext(BettingContext);
  if (!context) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
};

// Provider component
export const BettingProvider = ({ children }) => {
  // State management
  const [players, setPlayers] = useState(samplePlayers);
  const [fixtures, setFixtures] = useState(sampleFixtures);
  const [bets, setBets] = useState(sampleBets);
  const [week, setWeek] = useState(currentWeek);
  
  // Helper functions
  const getPlayerStats = (playerName) => {
    return players[playerName] || null;
  };
  
  const getFixturesForWeek = (weekNumber) => {
    return fixtures[weekNumber] || [];
  };
  
  const getPlayerBets = (playerName, weekNumber = null) => {
    return bets.filter(bet => 
      bet.player === playerName && 
      (weekNumber === null || bet.week === weekNumber)
    );
  };
  
  // Advanced analytics functions
  const calculatePerformanceIndex = (playerStats) => {
    const { winRate, last5 } = playerStats;
    const formFactor = last5.reduce((acc, result) => acc + (result ? 1 : 0), 0) / last5.length;
    return ((winRate * 0.7) + (formFactor * 30)).toFixed(1);
  };
  
  const calculateConsistencyScore = (playerBets) => {
    if (playerBets.length < 3) return 0;
    
    let variations = 0;
    for (let i = 1; i < playerBets.length; i++) {
      if ((playerBets[i].result === true) !== (playerBets[i-1].result === true)) {
        variations++;
      }
    }
    
    const consistencyScore = 10 - ((variations / (playerBets.length - 1)) * 10);
    return Math.max(0, Math.min(10, consistencyScore));
  };
  
  const getAdvancedPlayerStatistics = (playerName) => {
    const player = players[playerName];
    if (!player) return null;
    
    const playerBets = getPlayerBets(playerName);
    const consistency = calculateConsistencyScore(playerBets);
    const performanceIndex = calculatePerformanceIndex(player);
    
    return {
      ...player,
      consistency,
      performanceIndex,
      // Add more advanced metrics as needed
    };
  };
  
  // Action functions
  const placeBet = (playerName, fixtureId, betType, prediction) => {
    const newBet = {
      id: `b${bets.length + 1}`,
      player: playerName,
      week: week,
      fixtureId,
      type: betType,
      prediction,
      result: null
    };
    
    setBets(prevBets => [...prevBets, newBet]);
    return newBet;
  };
  
  const resolveFixture = (fixtureId, outcome) => {
    // Update fixture result
    setFixtures(prevFixtures => {
      const updatedFixtures = { ...prevFixtures };
      const weekKey = Object.keys(updatedFixtures).find(weekNum => 
        updatedFixtures[weekNum].some(fixture => fixture.id === fixtureId)
      );
      
      if (weekKey) {
        updatedFixtures[weekKey] = updatedFixtures[weekKey].map(fixture => {
          if (fixture.id === fixtureId) {
            return { ...fixture, status: 'COMPLETED', result: outcome };
          }
          return fixture;
        });
      }
      
      return updatedFixtures;
    });
    
    // Update bets with results
    setBets(prevBets => {
      return prevBets.map(bet => {
        if (bet.fixtureId === fixtureId) {
          const isCorrect = bet.prediction === outcome;
          return { ...bet, result: isCorrect };
        }
        return bet;
      });
    });
    
    // Update player points based on bet results
    setPlayers(prevPlayers => {
      const updatedPlayers = { ...prevPlayers };
      
      bets.forEach(bet => {
        if (bet.fixtureId === fixtureId && bet.result !== null) {
          const playerName = bet.player;
          
          if (updatedPlayers[playerName]) {
            updatedPlayers[playerName] = {
              ...updatedPlayers[playerName],
              points: updatedPlayers[playerName].points + (bet.result ? 1 : 0),
              wins: updatedPlayers[playerName].wins + (bet.result ? 1 : 0),
              last5: [
                bet.result,
                ...updatedPlayers[playerName].last5.slice(0, 4)
              ]
            };
          }
        }
      });
      
      return updatedPlayers;
    });
  };
  
  const addFixture = (homeTeam, awayTeam, date) => {
    const newFixture = {
      id: `w${week}f${Object.values(fixtures).flat().length + 1}`,
      homeTeam,
      awayTeam,
      date,
      status: 'UPCOMING',
      result: null
    };
    
    setFixtures(prevFixtures => {
      const updatedFixtures = { ...prevFixtures };
      
      if (!updatedFixtures[week]) {
        updatedFixtures[week] = [];
      }
      
      updatedFixtures[week] = [...updatedFixtures[week], newFixture];
      return updatedFixtures;
    });
    
    return newFixture;
  };
  
  const getLeaderboard = () => {
    return Object.entries(players)
      .map(([name, data]) => ({
        name,
        points: data.points,
        winRate: data.winRate,
        streak: data.streak,
        trend: data.trend
      }))
      .sort((a, b) => b.points - a.points);
  };
  
  const getFixtureById = (fixtureId) => {
    for (const weekNum in fixtures) {
      const fixture = fixtures[weekNum].find(f => f.id === fixtureId);
      if (fixture) return fixture;
    }
    return null;
  };
  
  // Expose context values
  const contextValue = {
    // State
    players,
    fixtures,
    bets,
    currentWeek: week,
    
    // Getters
    getPlayerStats,
    getFixturesForWeek,
    getPlayerBets,
    getAdvancedPlayerStatistics,
    getLeaderboard,
    getFixtureById,
    
    // Actions
    placeBet,
    resolveFixture,
    addFixture,
    setWeek
  };
  
  return (
    <BettingContext.Provider value={contextValue}>
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;