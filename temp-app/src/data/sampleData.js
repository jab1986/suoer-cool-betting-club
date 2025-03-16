// Sample data covering 10 weeks of betting activity for the Super Cool Betting Club

// Bet types
const BET_TYPES = {
  FTR: "Full Time Result",
  BTTS: "Both Teams To Score",
  OVER: "Over 2.5 Goals",
  HANDICAP: "Handicap"
};

// Possible outcomes for each bet type
const OUTCOMES = {
  FTR: ["HOME", "DRAW", "AWAY"],
  BTTS: ["YES", "NO"],
  OVER: ["YES", "NO"],
  HANDICAP: ["HOME", "AWAY"]
};

// Generate fixtures for all 10 weeks
const generateFixtures = () => {
  const teams = [
    "Arsenal", "Aston Villa", "Bournemouth", "Brentford", 
    "Brighton", "Burnley", "Chelsea", "Crystal Palace", 
    "Everton", "Fulham", "Liverpool", "Manchester City", 
    "Manchester United", "Newcastle", "Nottingham Forest", 
    "Sheffield United", "Tottenham", "West Ham", "Wolves", "Southampton"
  ];
  
  const fixtures = {};
  
  // Create 10 fixtures for each of the 10 weeks
  for (let week = 1; week <= 10; week++) {
    fixtures[week] = [];
    
    for (let i = 0; i < 10; i++) {
      // Select two different teams randomly
      const homeIndex = Math.floor(Math.random() * teams.length);
      let awayIndex;
      do {
        awayIndex = Math.floor(Math.random() * teams.length);
      } while (awayIndex === homeIndex);
      
      const fixture = {
        id: `W${week}-${i+1}`,
        week: week,
        homeTeam: teams[homeIndex],
        awayTeam: teams[awayIndex],
        date: new Date(2023, 7 + Math.floor(week/4), 1 + (week-1)*7 + i).toISOString(),
        completed: week < 10,
        result: week < 10 ? {
          homeScore: Math.floor(Math.random() * 4),
          awayScore: Math.floor(Math.random() * 3),
          BTTS: null, // Will be calculated
          OVER: null, // Will be calculated
          HANDICAP: Math.random() > 0.5 ? "HOME" : "AWAY"
        } : null
      };
      
      // Calculate derived results for completed fixtures
      if (fixture.completed) {
        fixture.result.BTTS = fixture.result.homeScore > 0 && fixture.result.awayScore > 0 ? "YES" : "NO";
        fixture.result.OVER = fixture.result.homeScore + fixture.result.awayScore > 2.5 ? "YES" : "NO";
        fixture.result.FTR = 
          fixture.result.homeScore > fixture.result.awayScore ? "HOME" : 
          fixture.result.homeScore < fixture.result.awayScore ? "AWAY" : "DRAW";
      }
      
      fixtures[week].push(fixture);
    }
  }
  
  return fixtures;
};

// Initialize player data
const initializePlayers = () => {
  return {
    "Gaz": { 
      name: "Gaz", 
      points: 0, 
      picksPerWeek: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gaz&mouth=smile",
      bio: "Liverpool supporter with a penchant for backing underdogs."
    },
    "Joe": { 
      name: "Joe", 
      points: 0, 
      picksPerWeek: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joe&mouth=serious",
      bio: "Arsenal fan who relies on statistics to make his predictions."
    },
    "Sean": { 
      name: "Sean", 
      points: 0, 
      picksPerWeek: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sean&mouth=default",
      bio: "Chelsea supporter with years of fantasy football experience."
    },
    "Dean": { 
      name: "Dean", 
      points: 0, 
      picksPerWeek: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dean&mouth=surprised",
      bio: "Manchester City fan who trusts his gut instinct above all else."
    }
  };
};

// Generate bets for all 10 weeks
const generateBets = (fixtures, players) => {
  const playerNames = Object.keys(players);
  const bets = [];
  const playerDataBuild = {...players};
  
  // Historical record for each player (last 5 games)
  const playerHistory = {
    "Gaz": [],
    "Joe": [],
    "Sean": [],
    "Dean": []
  };
  
  // For each week
  for (let week = 1; week < 10; week++) {
    // Determine picks per week for each player
    const picksThisWeek = {...playerDataBuild};
    
    // For each player
    for (const playerName of playerNames) {
      // Get current picks per week
      const numPicks = picksThisWeek[playerName].picksPerWeek;
      
      // Generate bets for this player for this week
      for (let pick = 0; pick < numPicks; pick++) {
        // Select a random fixture
        const fixtureIndex = Math.floor(Math.random() * fixtures[week].length);
        const fixture = fixtures[week][fixtureIndex];
        
        // Select random bet type
        const betType = Object.keys(BET_TYPES)[Math.floor(Math.random() * Object.keys(BET_TYPES).length)];
        
        // Select random prediction
        const prediction = OUTCOMES[betType][Math.floor(Math.random() * OUTCOMES[betType].length)];
        
        // Create the bet
        const bet = {
          id: `B${week}-${playerName}-${pick}`,
          player: playerName,
          week: week,
          fixtureId: fixture.id,
          type: betType,
          prediction: prediction,
          result: fixture.completed ? (fixture.result[betType] === prediction) : null
        };
        
        bets.push(bet);
        
        // Update player history and points for completed weeks
        if (fixture.completed) {
          const isCorrect = fixture.result[betType] === prediction;
          playerHistory[playerName].push(isCorrect);
          
          // Keep only last 5 results
          if (playerHistory[playerName].length > 5) {
            playerHistory[playerName].shift();
          }
          
          // Update points
          if (isCorrect) {
            playerDataBuild[playerName].points += 1;
          }
        }
      }
      
      // For completed weeks, determine picks for next week
      if (week < 9) {
        const betsThisWeek = bets.filter(bet => bet.player === playerName && bet.week === week);
        const correctBets = betsThisWeek.filter(bet => bet.result === true);
        
        // Double rule: If all picks correct, get 2 picks next week, otherwise 1
        playerDataBuild[playerName].picksPerWeek = 
          (betsThisWeek.length > 0 && correctBets.length === betsThisWeek.length) ? 2 : 1;
      }
    }
  }
  
  // Week 10 - current week with pending bets
  for (const playerName of playerNames) {
    const numPicks = playerDataBuild[playerName].picksPerWeek;
    
    for (let pick = 0; pick < numPicks; pick++) {
      // 50% chance the player has already placed a bet for week 10
      if (Math.random() > 0.5) {
        const fixtureIndex = Math.floor(Math.random() * fixtures[10].length);
        const fixture = fixtures[10][fixtureIndex];
        
        const betType = Object.keys(BET_TYPES)[Math.floor(Math.random() * Object.keys(BET_TYPES).length)];
        const prediction = OUTCOMES[betType][Math.floor(Math.random() * OUTCOMES[betType].length)];
        
        const bet = {
          id: `B10-${playerName}-${pick}`,
          player: playerName,
          week: 10,
          fixtureId: fixture.id,
          type: betType,
          prediction: prediction,
          result: null // Pending
        };
        
        bets.push(bet);
      }
    }
  }
  
  // Calculate player statistics
  for (const playerName of playerNames) {
    const playerBets = bets.filter(bet => bet.player === playerName && bet.result !== null);
    const wins = playerBets.filter(bet => bet.result === true).length;
    
    playerDataBuild[playerName].totalBets = playerBets.length;
    playerDataBuild[playerName].wins = wins;
    playerDataBuild[playerName].winRate = playerBets.length > 0 ? (wins / playerBets.length * 100).toFixed(1) : "0.0";
    
    // Calculate streak
    let currentStreak = 0;
    let streakType = null;
    
    const chronologicalBets = [...playerBets].sort((a, b) => a.week - b.week);
    
    for (const bet of chronologicalBets) {
      if (streakType === null) {
        streakType = bet.result;
        currentStreak = 1;
      } else if (bet.result === streakType) {
        currentStreak += 1;
      } else {
        streakType = bet.result;
        currentStreak = 1;
      }
    }
    
    playerDataBuild[playerName].streak = {
      count: currentStreak,
      type: streakType ? "W" : "L"
    };
    
    // Last 5 results
    playerDataBuild[playerName].last5 = playerHistory[playerName];
    
    // Calculate trend (positive if win rate in last 3 bets > overall win rate)
    const last3Bets = chronologicalBets.slice(-3);
    const last3Wins = last3Bets.filter(bet => bet.result === true).length;
    const last3WinRate = last3Bets.length > 0 ? (last3Wins / last3Bets.length * 100) : 0;
    const overallWinRate = parseFloat(playerDataBuild[playerName].winRate);
    
    playerDataBuild[playerName].trend = last3WinRate > overallWinRate ? "UP" : 
                                       last3WinRate < overallWinRate ? "DOWN" : "STABLE";
                                       
    // Favorite bet type (most used)
    const betTypeCount = {};
    playerBets.forEach(bet => {
      betTypeCount[bet.type] = (betTypeCount[bet.type] || 0) + 1;
    });
    
    let maxCount = 0;
    let favoriteBetType = null;
    
    for (const [type, count] of Object.entries(betTypeCount)) {
      if (count > maxCount) {
        maxCount = count;
        favoriteBetType = type;
      }
    }
    
    playerDataBuild[playerName].favoriteBetType = favoriteBetType ? BET_TYPES[favoriteBetType] : "None";
    
    // Success by bet type
    playerDataBuild[playerName].betTypeSuccess = {};
    
    for (const betType of Object.keys(BET_TYPES)) {
      const typeBets = playerBets.filter(bet => bet.type === betType);
      const typeWins = typeBets.filter(bet => bet.result === true).length;
      
      playerDataBuild[playerName].betTypeSuccess[betType] = {
        total: typeBets.length,
        wins: typeWins,
        winRate: typeBets.length > 0 ? (typeWins / typeBets.length * 100).toFixed(1) : "0.0"
      };
    }
  }
  
  return { bets, players: playerDataBuild };
};

// Create the data
const fixtures = generateFixtures();
const initialPlayers = initializePlayers();
const { bets, players } = generateBets(fixtures, initialPlayers);

// Current week
const currentWeek = 10;

export { 
  players, 
  fixtures, 
  bets, 
  currentWeek, 
  BET_TYPES, 
  OUTCOMES 
}; 