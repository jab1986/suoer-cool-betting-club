import React from 'react';
import { render, screen } from '../test-utils';
import Home from '../../pages/Home';

// Mock the Layout component to simplify testing
jest.mock('../../components/layout', () => ({
  Layout: ({ children }) => <div data-testid="layout-mock">{children}</div>
}));

describe('Home Page', () => {
  test('renders the title and WWE theme', () => {
    render(<Home />);
    
    // Check for WWE-themed title
    expect(screen.getByText('SUPER COOL BETTING CLUB')).toBeInTheDocument();
    
    // Check for betting-related content
    expect(screen.getByText(/track your predictions/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Home />);
    
    // Check for main navigation links
    const leaderboardLink = screen.getByRole('link', { name: /leaderboard/i });
    const fixturesLink = screen.getByRole('link', { name: /fixtures/i });
    
    expect(leaderboardLink).toBeInTheDocument();
    expect(fixturesLink).toBeInTheDocument();
    
    // Check that the links have the correct href attributes
    expect(leaderboardLink).toHaveAttribute('href', '/leaderboard');
    expect(fixturesLink).toHaveAttribute('href', '/fixtures');
  });
});
