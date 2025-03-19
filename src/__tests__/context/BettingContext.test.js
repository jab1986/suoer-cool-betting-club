import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BettingProvider, useBetting } from '../../context/BettingContext';

// Test component that uses the betting context
const TestComponent = () => {
  const { currentWeek, players, fixtures, advanceToNextWeek } = useBetting();
  return (
    <div>
      <div data-testid="current-week">Week: {currentWeek}</div>
      <div data-testid="player-count">Players: {Object.keys(players).length}</div>
      <div data-testid="fixture-count">Fixtures: {fixtures.length}</div>
      <button onClick={advanceToNextWeek}>Next Week</button>
    </div>
  );
};

describe('BettingContext', () => {
  test('provides the betting context values', () => {
    render(
      <BettingProvider>
        <TestComponent />
      </BettingProvider>
    );

    // Check if context values are provided
    expect(screen.getByTestId('current-week')).toHaveTextContent('Week:');
    expect(screen.getByTestId('player-count')).toHaveTextContent('Players:');
    expect(screen.getByTestId('fixture-count')).toHaveTextContent('Fixtures:');
  });

  test('advanceToNextWeek updates the current week', () => {
    render(
      <BettingProvider>
        <TestComponent />
      </BettingProvider>
    );

    // Get the initial week
    const initialWeek = screen.getByTestId('current-week').textContent;
    
    // Click the button to advance to next week
    act(() => {
      screen.getByRole('button', { name: /next week/i }).click();
    });
    
    // Check if the week was updated
    const updatedWeek = screen.getByTestId('current-week').textContent;
    expect(updatedWeek).not.toEqual(initialWeek);
  });
});
