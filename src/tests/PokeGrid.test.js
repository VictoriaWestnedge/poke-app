import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeGrid from '../pages/PokeGrid';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

  test('renders without errors', () => {
    render(<PokeGrid />);
    const linkElement = screen.getByText(/view favorites/i);
    expect(linkElement).toBeInTheDocument();
  });
