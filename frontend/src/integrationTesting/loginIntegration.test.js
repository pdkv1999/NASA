import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../pages/Auth/login';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

test('Login form works correctly', async () => {
  render(
    <Router> 
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  // Fill in the form fields
  const emailInput = screen.getByPlaceholderText('Enter your email');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  const loginButton = screen.getByText('Login');
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Test123!' } });

  // Submit the form
  fireEvent.click(loginButton);

});
