import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

// Create a test component that uses the theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div data-testid="current-theme">Theme: {theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  // Mock localStorage
  beforeEach(() => {
    // Mock implementation of localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    global.localStorage = localStorageMock;
  });

  test('provides the theme context values', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Check if context values are provided
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Theme:');
  });

  test('toggleTheme switches between dark and light themes', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Get the initial theme
    const initialTheme = screen.getByTestId('current-theme').textContent;
    
    // Click the button to toggle the theme
    act(() => {
      screen.getByRole('button', { name: /toggle theme/i }).click();
    });
    
    // Check if the theme was toggled
    const updatedTheme = screen.getByTestId('current-theme').textContent;
    expect(updatedTheme).not.toEqual(initialTheme);
  });
});
