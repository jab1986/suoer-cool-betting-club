import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ThemeProvider } from '../../context/ThemeContext';

// Mock the Navbar and Footer since we're only testing Layout functionality
jest.mock('../../components/layout/Navbar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-mock">Navbar</div>
  };
});

jest.mock('../../components/layout/Footer', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="footer-mock">Footer</div>
  };
});

describe('Layout Component', () => {
  // Helper function to render Layout with its required providers
  const renderWithProviders = (ui) => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          {ui}
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  test('renders the Layout with Navbar and Footer', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    // Check if Navbar is rendered
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    
    // Check if content is rendered
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    
    // Check if Footer is rendered
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  test('passes children correctly', () => {
    renderWithProviders(
      <Layout>
        <h1>Custom Heading</h1>
        <p>Custom Paragraph</p>
      </Layout>
    );

    // Check if custom content is rendered
    expect(screen.getByText('Custom Heading')).toBeInTheDocument();
    expect(screen.getByText('Custom Paragraph')).toBeInTheDocument();
  });
});
