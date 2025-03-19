import React from 'react';
import { render, screen } from '../test-utils';
import { BettingInsights } from '../../components/features/analytics';

// Mock the BettingContext hook
jest.mock('../../context/BettingContext', () => {
  const originalModule = jest.requireActual('../../context/BettingContext');
  return {
    ...originalModule,
    useBetting: () => ({
      players: {
        player1: {
          id: 'player1',
          name: 'John',
          totalBets: 10,
          wonBets: 6,
          lostBets: 4,
          points: 18
        },
        player2: {
          id: 'player2',
          name: 'Jane',
          totalBets: 8,
          wonBets: 5,
          lostBets: 3,
          points: 15
        }
      },
      getPlayerStatsForInsights: () => ({
        totalBets: 18,
        wonBets: 11,
        lostBets: 7,
        successRate: 61
      })
    })
  };
});

describe('BettingInsights Component', () => {
  test('renders overall betting statistics', () => {
    render(<BettingInsights />);
    
    // Check for component title
    expect(screen.getByText('Betting Insights')).toBeInTheDocument();
    
    // Check that stats are displayed
    expect(screen.getByText(/Total Bets/i)).toBeInTheDocument();
    expect(screen.getByText(/18/)).toBeInTheDocument(); // Total bets count
    expect(screen.getByText(/Success Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/61%/)).toBeInTheDocument(); // Success rate
  });

  test('displays player-specific information', () => {
    render(<BettingInsights />);
    
    // Check for player names
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    
    // Check for player stats
    expect(screen.getByText('18')).toBeInTheDocument(); // Points for John
    expect(screen.getByText('15')).toBeInTheDocument(); // Points for Jane
  });

  test('renders a visual chart or graph element', () => {
    render(<BettingInsights />);
    
    // Check for chart container elements
    expect(screen.getByTestId('insights-chart')).toBeInTheDocument();
  });
});
