import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import Fixtures from '../../pages/Fixtures';

// Mock the Layout component to simplify testing
jest.mock('../../components/layout', () => ({
  Layout: ({ children }) => <div data-testid="layout-mock">{children}</div>
}));

// Mock the BettingContext hook
jest.mock('../../context/BettingContext', () => {
  const originalModule = jest.requireActual('../../context/BettingContext');
  return {
    ...originalModule,
    useBetting: () => ({
      currentWeek: 2,
      fixtures: [
        {
          id: 'f1',
          homeTeam: 'Roman Reigns',
          awayTeam: 'Brock Lesnar',
          date: '2025-04-01',
          time: '8:00 PM',
          week: 2,
          status: 'upcoming'
        },
        {
          id: 'f2',
          homeTeam: 'The Rock',
          awayTeam: 'John Cena',
          date: '2025-04-02',
          time: '7:30 PM',
          week: 2,
          status: 'upcoming'
        },
        {
          id: 'f3',
          homeTeam: 'Seth Rollins',
          awayTeam: 'Finn Balor',
          date: '2025-03-25',
          time: '8:00 PM',
          week: 1,
          goalsHome: 2,
          goalsAway: 1,
          status: 'completed'
        }
      ]
    })
  };
});

describe('Fixtures Page', () => {
  test('renders the title and fixtures intro', () => {
    render(<Fixtures />);
    
    // Check for page title
    expect(screen.getByText('FIXTURES')).toBeInTheDocument();
    
    // Check for intro text
    expect(screen.getByText(/view all upcoming matches and results/i)).toBeInTheDocument();
  });

  test('renders week tabs and current week fixtures', () => {
    render(<Fixtures />);
    
    // Check for week tabs
    expect(screen.getByText('WEEK 1')).toBeInTheDocument();
    expect(screen.getByText('WEEK 2')).toBeInTheDocument();
    
    // Check that current week fixtures are shown
    expect(screen.getByText('Roman Reigns')).toBeInTheDocument();
    expect(screen.getByText('Brock Lesnar')).toBeInTheDocument();
    expect(screen.getByText('The Rock')).toBeInTheDocument();
    expect(screen.getByText('John Cena')).toBeInTheDocument();
  });

  test('switches weeks when clicking on week tabs', () => {
    render(<Fixtures />);
    
    // Default is week 2, so Roman Reigns should be visible
    expect(screen.getByText('Roman Reigns')).toBeInTheDocument();
    
    // Click on Week 1
    fireEvent.click(screen.getByText('WEEK 1'));
    
    // Week 1 fixtures should show, with Seth Rollins
    expect(screen.getByText('Seth Rollins')).toBeInTheDocument();
    expect(screen.getByText('Finn Balor')).toBeInTheDocument();
    
    // Week 2 fixtures should no longer be visible
    expect(screen.queryByText('Roman Reigns')).not.toBeInTheDocument();
  });

  test('displays fixture details with date and time', () => {
    render(<Fixtures />);
    
    // Check that fixture details are shown
    expect(screen.getByText(/8:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/7:30 PM/i)).toBeInTheDocument();
    expect(screen.getAllByText(/2025-04-/i).length).toBeGreaterThan(0);
  });
});
