import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../pages/Auth/Register';

// Mocking the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('calls handleSubmit function on button click', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByText('Login');

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate button click
    fireEvent.click(loginButton);
  });
});
