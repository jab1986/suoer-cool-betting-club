import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddBetForm } from '../../components/features/betting';
import { BettingProvider } from '../../context/BettingContext';

// Mock the useBetting hook
jest.mock('../../context/BettingContext', () => {
  const originalModule = jest.requireActual('../../context/BettingContext');
  return {
    ...originalModule,
    useBetting: () => ({
      players: {
        Gaz: { id: 'p1', name: 'Gaz', points: 10 },
        Joe: { id: 'p2', name: 'Joe', points: 8 }
      },
      placeBet: jest.fn()
    })
  };
});

describe('AddBetForm Component', () => {
  const mockFixture = {
    id: 'f1',
    homeTeam: 'Team A',
    awayTeam: 'Team B',
    date: '2025-04-01',
    week: 1,
    status: 'upcoming'
  };
  
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with fixture details', () => {
    render(
      <BettingProvider>
        <AddBetForm fixture={mockFixture} onClose={mockOnClose} />
      </BettingProvider>
    );

    // Check if fixture teams are displayed
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
    
    // Check if form elements are rendered
    expect(screen.getByLabelText(/player/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bet type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit bet/i })).toBeInTheDocument();
  });

  test('player selection works', () => {
    render(
      <BettingProvider>
        <AddBetForm fixture={mockFixture} onClose={mockOnClose} />
      </BettingProvider>
    );

    // Select a player
    const playerSelect = screen.getByLabelText(/player/i);
    fireEvent.change(playerSelect, { target: { value: 'Gaz' } });
    
    // Check if the player selection was updated
    expect(playerSelect.value).toBe('Gaz');
  });

  test('closes the form when the close button is clicked', () => {
    render(
      <BettingProvider>
        <AddBetForm fixture={mockFixture} onClose={mockOnClose} />
      </BettingProvider>
    );

    // Click the close button
    const closeButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(closeButton);
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
