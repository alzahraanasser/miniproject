import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SharePosts from './SharePosts';

describe('SharePosts Component', () => {
  test('renders textarea and button', () => {
    render(<SharePosts />);

    const textArea = screen.getByPlaceholderText(/share your experiences/i);
    const button = screen.getByText(/send/i);

    expect(textArea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('handles user input in textarea', () => {
    render(<SharePosts />);

    const textArea = screen.getByPlaceholderText(/share your experiences/i);
    userEvent.type(textArea, 'This is my experience!');

    expect(textArea).toHaveValue('This is my experience!');
  });

  test('handles button click', () => {
    render(<SharePosts />);

    const textArea = screen.getByPlaceholderText(/share your experiences/i);
    const button = screen.getByText(/send/i);
    userEvent.type(textArea, 'This is my experience!');
    userEvent.click(button);

    // Mock an alert or action that is triggered on button click, such as a form submission
    expect(window.alert).toHaveBeenCalledWith('Post sent!');
  });
});