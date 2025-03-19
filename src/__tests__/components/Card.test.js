import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../../components/common';

describe('Card Component', () => {
  test('renders with default props', () => {
    render(<Card>Card Content</Card>);
    const cardElement = screen.getByText('Card Content');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement.parentElement).toHaveClass('bg-zinc-800');
  });

  test('renders with highlight variant', () => {
    render(<Card variant="highlight">Highlighted Card</Card>);
    const cardElement = screen.getByText('Highlighted Card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement.parentElement).toHaveClass('border-l-4 border-wwe-red');
  });

  test('renders with secondary variant', () => {
    render(<Card variant="secondary">Secondary Card</Card>);
    const cardElement = screen.getByText('Secondary Card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement.parentElement).toHaveClass('bg-zinc-900');
  });

  test('applies additional className when provided', () => {
    render(<Card className="test-class">Custom Card</Card>);
    const cardElement = screen.getByText('Custom Card');
    expect(cardElement.parentElement).toHaveClass('test-class');
  });

  test('passes additional props to the div', () => {
    render(<Card data-testid="custom-card">Props Card</Card>);
    expect(screen.getByTestId('custom-card')).toBeInTheDocument();
  });
});
