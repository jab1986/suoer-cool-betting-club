import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import { HeadToHead } from '../../components/features/analytics';

// Mock the BettingContext hook
jest.mock('../../context/BettingContext', () => {
  const originalModule = jest.requireActual('../../context/BettingContext');
  return {
    ...originalModule,
    useBetting: () => ({
      players: {
        player1: {
          id: 'player1',
          name: 'Roman Reigns',
          totalBets: 15,
          wonBets: 10,
          lostBets: 5,
          points: 30,
          favoriteFixtures: ['WrestleMania', 'SummerSlam']
        },
        player2: {
          id: 'player2',
          name: 'Brock Lesnar',
          totalBets: 12,
          wonBets: 8,
          lostBets: 4,
          points: 24,
          favoriteFixtures: ['Royal Rumble', 'SummerSlam']
        }
      },
      getHeadToHeadStats: (player1Id, player2Id) => ({
        player1Wins: 3,
        player2Wins: 2,
        draws: 1,
        lastFive: ['player1', 'player2', 'draw', 'player1', 'player1']
      })
    })
  };
});

describe('HeadToHead Component', () => {
  test('renders player selection dropdowns', () => {
    render(<HeadToHead />);
    
    // Check for component title
    expect(screen.getByText('Head-to-Head Comparison')).toBeInTheDocument();
    
    // Check that player selection exists
    const playerSelects = screen.getAllByRole('combobox');
    expect(playerSelects.length).toBe(2); // Two dropdowns for selecting players
  });

  test('displays head-to-head stats when players are selected', () => {
    render(<HeadToHead />);
    
    // Select players from dropdowns
    const [player1Select, player2Select] = screen.getAllByRole('combobox');
    
    fireEvent.change(player1Select, { target: { value: 'player1' } });
    fireEvent.change(player2Select, { target: { value: 'player2' } });
    
    // Check that comparison stats are displayed
    expect(screen.getByText('Roman Reigns')).toBeInTheDocument();
    expect(screen.getByText('Brock Lesnar')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // player1 wins
    expect(screen.getByText('2')).toBeInTheDocument(); // player2 wins
    expect(screen.getByText('1')).toBeInTheDocument(); // draws
  });

  test('displays player stats side by side', () => {
    render(<HeadToHead />);
    
    // Select players
    const [player1Select, player2Select] = screen.getAllByRole('combobox');
    
    fireEvent.change(player1Select, { target: { value: 'player1' } });
    fireEvent.change(player2Select, { target: { value: 'player2' } });
    
    // Check for player stats comparison
    expect(screen.getByText('30')).toBeInTheDocument(); // Roman's points
    expect(screen.getByText('24')).toBeInTheDocument(); // Brock's points
    expect(screen.getByText('15')).toBeInTheDocument(); // Roman's total bets
    expect(screen.getByText('12')).toBeInTheDocument(); // Brock's total bets
    
    // Check for favorite fixtures
    expect(screen.getByText('WrestleMania')).toBeInTheDocument();
    expect(screen.getByText('Royal Rumble')).toBeInTheDocument();
    expect(screen.getAllByText('SummerSlam').length).toBe(2); // Both have this as favorite
  });
});
