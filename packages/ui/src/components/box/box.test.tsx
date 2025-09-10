import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from './box';

describe('Box', () => {
  test('renders with default props', () => {
    render(<Box>Test</Box>);
    const boxElement = screen.getByText('Test');
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm p-4');
  });

  test('applies variant classes', () => {
    render(<Box variant="outline">Test</Box>);
    const boxElement = screen.getByText('Test');
    expect(boxElement).toHaveClass('border-input');
  });

  test('applies padding classes', () => {
    render(<Box padding="sm">Test</Box>);
    const boxElement = screen.getByText('Test');
    expect(boxElement).toHaveClass('p-2');
  });

  test('applies no padding class', () => {
    render(<Box padding="none">Test</Box>);
    const boxElement = screen.getByText('Test');
    expect(boxElement).toHaveClass('p-0');
  });
});
