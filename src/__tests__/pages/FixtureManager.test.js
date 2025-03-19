import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import FixtureManager from '../../pages/FixtureManager';

// Mock the Layout component to simplify testing
jest.mock('../../components/layout', () => ({
  Layout: ({ children }) => <div data-testid="layout-mock">{children}</div>
}));

// Mock the betting forms
jest.mock('../../components/features/betting', () => ({
  AddBetForm: ({ fixture, onClose }) => (
    <div data-testid="add-bet-form-mock">
      Add Bet for {fixture?.homeTeam} vs {fixture?.awayTeam}
      <button onClick={onClose}>Close</button>
    </div>
  ),
  UpdateResultForm: ({ fixture, onClose }) => (
    <div data-testid="update-result-form-mock">
      Update Result for {fixture?.homeTeam} vs {fixture?.awayTeam}
      <button onClick={onClose}>Close</button>
    </div>
  )
}));

// Mock the BettingContext hook
jest.mock('../../context/BettingContext', () => {
  const originalModule = jest.requireActual('../../context/BettingContext');
  return {
    ...originalModule,
    useBetting: () => ({
      currentWeek: 1,
      fixtures: [
        {
          id: 'f1',
          homeTeam: 'Roman Reigns',
          awayTeam: 'Brock Lesnar',
          date: '2025-04-01',
          week: 1,
          status: 'upcoming'
        },
        {
          id: 'f2',
          homeTeam: 'The Rock',
          awayTeam: 'John Cena',
          date: '2025-04-01',
          week: 1,
          status: 'upcoming'
        }
      ],
      bets: [],
      getPlayerById: jest.fn(),
      advanceToNextWeek: jest.fn()
    })
  };
});

describe('FixtureManager Page', () => {
  test('renders the title and WWE theme', () => {
    render(<FixtureManager />);
    
    // Check for fixture manager title
    expect(screen.getByText('FIXTURE MANAGER')).toBeInTheDocument();
  });

  test('renders tabs for upcoming and completed fixtures', () => {
    render(<FixtureManager />);
    
    // Check for tabs
    expect(screen.getByText('UPCOMING FIXTURES')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED FIXTURES')).toBeInTheDocument();
  });

  test('renders fixture cards', () => {
    render(<FixtureManager />);
    
    // Check for fixture teams
    expect(screen.getByText('Roman Reigns')).toBeInTheDocument();
    expect(screen.getByText('Brock Lesnar')).toBeInTheDocument();
    expect(screen.getByText('The Rock')).toBeInTheDocument();
    expect(screen.getByText('John Cena')).toBeInTheDocument();
  });

  test('opens add bet form when add bet button is clicked', () => {
    render(<FixtureManager />);
    
    // Find and click the first Add Bet button
    const addBetButtons = screen.getAllByText('Add Bet');
    fireEvent.click(addBetButtons[0]);
    
    // Check if the add bet form is displayed
    expect(screen.getByTestId('add-bet-form-mock')).toBeInTheDocument();
  });

  test('closes add bet form when close button is clicked', () => {
    render(<FixtureManager />);
    
    // Open the add bet form
    const addBetButtons = screen.getAllByText('Add Bet');
    fireEvent.click(addBetButtons[0]);
    
    // Find and click the close button
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    // Check if the add bet form is no longer displayed
    expect(screen.queryByTestId('add-bet-form-mock')).not.toBeInTheDocument();
  });
});
