import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../pages/Auth/Register';

test('Register form works correctly', async () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  // Fill in the form fields
  const firstNameInput = screen.getByPlaceholderText('Your first name');
  const lastNameInput = screen.getByPlaceholderText('Your last name');
  const emailInput = screen.getByPlaceholderText('Enter your email');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
  const registerButton = screen.getByText('Register');

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Test123!' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'Test123!' } });

  // Submit the form
  fireEvent.click(registerButton);
});
