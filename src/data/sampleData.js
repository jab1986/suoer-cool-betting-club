// Constants
export const BET_TYPES = {
  FULL_TIME_RESULT: 'Full Time Result',
  BTTS: 'Both Teams To Score',
  OVER_UNDER: 'Over 2.5 Goals',
  HANDICAP: 'Handicap'
};

export const OUTCOMES = {
  HOME_WIN: 'Home Win',
  AWAY_WIN: 'Away Win',
  DRAW: 'Draw',
  YES: 'Yes',
  NO: 'No',
  OVER: 'Over',
  UNDER: 'Under'
};

// Current week
export const currentWeek = 1;

// Sample Players with initial stats
export const players = {
  Gaz: {
    points: 15,
    picksPerWeek: 2,
    totalBets: 20,
    wins: 15,
    winRate: 75,
    streak: { type: 'W', count: 3 },
    last5: [true, true, true, false, true],
    trend: 'UP',
    betTypes: {
      'Full Time Result': { total: 8, wins: 6 },
      'Both Teams To Score': { total: 5, wins: 4 },
      'Over 2.5 Goals': { total: 4, wins: 3 },
      'Handicap': { total: 3, wins: 2 }
    },
    weeklyPerformance: [2, 1, 2, 1, 2]
  },
  Joe: {
    points: 12,
    picksPerWeek: 1,
    totalBets: 18,
    wins: 12,
    winRate: 66.7,
    streak: { type: 'W', count: 2 },
    last5: [true, true, false, true, false],
    trend: 'UP',
    betTypes: {
      'Full Time Result': { total: 7, wins: 5 },
      'Both Teams To Score': { total: 5, wins: 3 },
      'Over 2.5 Goals': { total: 4, wins: 3 },
      'Handicap': { total: 2, wins: 1 }
    },
    weeklyPerformance: [1, 1, 2, 1, 1]
  },
  Sean: {
    points: 10,
    picksPerWeek: 1,
    totalBets: 16,
    wins: 10,
    winRate: 62.5,
    streak: { type: 'L', count: 1 },
    last5: [false, true, true, true, false],
    trend: 'STABLE',
    betTypes: {
      'Full Time Result': { total: 6, wins: 4 },
      'Both Teams To Score': { total: 4, wins: 2 },
      'Over 2.5 Goals': { total: 4, wins: 3 },
      'Handicap': { total: 2, wins: 1 }
    },
    weeklyPerformance: [1, 1, 1, 2, 0]
  },
  Dean: {
    points: 8,
    picksPerWeek: 1,
    totalBets: 15,
    wins: 8,
    winRate: 53.3,
    streak: { type: 'L', count: 2 },
    last5: [false, false, true, true, false],
    trend: 'DOWN',
    betTypes: {
      'Full Time Result': { total: 6, wins: 3 },
      'Both Teams To Score': { total: 4, wins: 2 },
      'Over 2.5 Goals': { total: 3, wins: 2 },
      'Handicap': { total: 2, wins: 1 }
    },
    weeklyPerformance: [1, 1, 1, 0, 0]
  }
};

// Sample Fixtures
export const fixtures = {
  1: [
    {
      id: 'w1f1',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester City',
      date: '2024-03-23T15:00:00Z',
      status: 'UPCOMING',
      result: null
    },
    {
      id: 'w1f2',
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester United',
      date: '2024-03-23T17:30:00Z',
      status: 'UPCOMING',
      result: null
    },
    {
      id: 'w1f3',
      homeTeam: 'Chelsea',
      awayTeam: 'Tottenham',
      date: '2024-03-24T14:00:00Z',
      status: 'UPCOMING',
      result: null
    }
  ]
};

// Sample Bets
export const bets = [
  {
    id: 'b1',
    player: 'Gaz',
    week: 1,
    fixtureId: 'w1f1',
    type: BET_TYPES.FULL_TIME_RESULT,
    prediction: OUTCOMES.HOME_WIN,
    result: null
  },
  {
    id: 'b2',
    player: 'Joe',
    week: 1,
    fixtureId: 'w1f2',
    type: BET_TYPES.BTTS,
    prediction: OUTCOMES.YES,
    result: null
  },
  {
    id: 'b3',
    player: 'Sean',
    week: 1,
    fixtureId: 'w1f3',
    type: BET_TYPES.OVER_UNDER,
    prediction: OUTCOMES.OVER,
    result: null
  }
];
