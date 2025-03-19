import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/common';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toHaveClass('bg-wwe-red');
  });

  test('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toHaveClass('bg-wwe-gold');
  });

  test('renders with outlined variant', () => {
    render(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByText('Outlined')).toBeInTheDocument();
    expect(screen.getByText('Outlined')).toHaveClass('bg-transparent');
  });

  test('renders with different sizes', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('px-3 py-1.5 text-sm');
    
    render(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('px-8 py-3.5 text-lg');
  });

  test('applies full width when specified', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByText('Full Width')).toHaveClass('w-full');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
