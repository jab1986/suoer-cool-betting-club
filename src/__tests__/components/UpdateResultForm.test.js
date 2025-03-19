import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UpdateResultForm } from '../../components/features/betting';
import { BettingProvider } from '../../context/BettingContext';

// Mock the useBetting hook
jest.mock('../../context/BettingContext', () => {
  const originalModule = jest.requireActual('../../context/BettingContext');
  return {
    ...originalModule,
    useBetting: () => ({
      updateFixtureResult: jest.fn()
    })
  };
});

describe('UpdateResultForm Component', () => {
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
        <UpdateResultForm fixture={mockFixture} onClose={mockOnClose} />
      </BettingProvider>
    );

    // Check if fixture teams are displayed
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
    
    // Check if form elements are rendered
    expect(screen.getByLabelText(/home score/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/away score/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update result/i })).toBeInTheDocument();
  });

  test('score inputs work', () => {
    render(
      <BettingProvider>
        <UpdateResultForm fixture={mockFixture} onClose={mockOnClose} />
      </BettingProvider>
    );

    // Enter score values
    const homeScoreInput = screen.getByLabelText(/home score/i);
    const awayScoreInput = screen.getByLabelText(/away score/i);
    
    fireEvent.change(homeScoreInput, { target: { value: '2' } });
    fireEvent.change(awayScoreInput, { target: { value: '1' } });
    
    // Check if the score inputs were updated
    expect(homeScoreInput.value).toBe('2');
    expect(awayScoreInput.value).toBe('1');
  });

  test('closes the form when the close button is clicked', () => {
    render(
      <BettingProvider>
        <UpdateResultForm fixture={mockFixture} onClose={mockOnClose} />
      </BettingProvider>
    );

    // Click the close button
    const closeButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(closeButton);
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
