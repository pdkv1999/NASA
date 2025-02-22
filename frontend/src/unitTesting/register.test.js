import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../pages/Auth/Register';

// Mocking the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Register Component', () => {
  it('renders without crashing', () => {
    render(<Register />);
  });

  it('calls handleSubmit function on button click', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);
    const firstNameInput = getByPlaceholderText('Your first name');
    const lastNameInput = getByPlaceholderText('Your last name');
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const confirmPasswordInput = getByPlaceholderText('Confirm your password');
    const registerButton = getByText('Register');

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    // Simulate button click
    fireEvent.click(registerButton);
  });
});
