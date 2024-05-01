import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
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

  // test('searches for a Pokemon', async () => {
  //   render(<PokeGrid />);
  //   const searchInput = screen.getByPlaceholderText('Search for a Pokemon');
  //   fireEvent.change(searchInput, { target: { value: 'bulbasaur' } });
  //   fireEvent.submit(searchInput);
  //   await waitFor(() => {
  //     expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  //   });
  // });

  // test('views favorites', async () => {
  //   render(<PokeGrid />);
  //   fireEvent.click(screen.getByText('View Favorites'));
  //   await waitFor(() => {
  //     expect(screen.getByText('You do not have any favorites at the moment')).toBeInTheDocument();
  //   });
  // });

  // test('adds a Pokemon to favorites', async () => {
  //   render(<PokeGrid />);
  //   fireEvent.click(screen.getByText('View Favorites'));
  //   fireEvent.click(screen.getAllByText('Add to favorites')[0]);
  //   await waitFor(() => {
  //     expect(screen.getByText('Poke added to favorites')).toBeInTheDocument();
  //   });
  // });
