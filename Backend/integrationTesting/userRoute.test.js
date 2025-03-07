// Importing required modules for testing
const request = require('supertest');    // Supertest allows HTTP assertions
const app = require('../server');        // Import the Express app for testing

// Test suite for User API endpoints
describe('User API', () => {
  
  // Nested test suite for user registration endpoint
  describe('POST /api/users/register', () => {

    // Test case: Successful user registration
    it('should register a new user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123!',
      };

      // Make POST request to register endpoint and expect HTTP 201 for success
      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201); // HTTP 201: Created

      // Assertions to verify response content
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('New user created');
      expect(response.body.data).toHaveProperty('email', userData.email);
      expect(response.body.data).toHaveProperty('firstName', userData.firstName);
      expect(response.body.data).toHaveProperty('lastName', userData.lastName);
      expect(response.body.data).not.toHaveProperty('password'); // Ensure password is not exposed
    });

    // Test case: Missing required fields in registration
    it('should return an error for missing required fields', async () => {
      const invalidUserData = {
        firstName: 'John',
        // Missing lastName, email, and password
      };

      // Make POST request with incomplete data and expect HTTP 400 for bad request
      const response = await request(app)
        .post('/api/users/register')
        .send(invalidUserData)
        .expect(400);

      // Assertions to verify error response
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Missing required fields');
    });

    // Test case: Invalid email format
    it('should return an error for invalid email format', async () => {
      const invalidUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email', // Invalid email format
        password: 'Password123!',
      };

      // Make POST request and expect HTTP 400 for bad request
      const response = await request(app)
        .post('/api/users/register')
        .send(invalidUserData)
        .expect(400);

      // Assertions for invalid email format error
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid email format');
    });

    // Test case: Invalid password format
    it('should return an error for invalid password format', async () => {
      const invalidUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'weak', // Weak password
      };

      // Make POST request and expect HTTP 400 for bad request
      const response = await request(app)
        .post('/api/users/register')
        .send(invalidUserData)
        .expect(400);

      // Assertions for invalid password format error
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
    });

    // Test case: User already exists
    it('should return an error if the user already exists', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com', // Duplicate email
        password: 'Password123!',
      };

      // Make POST request and expect HTTP 409 for conflict
      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(409);

      // Assertions for user already exists error
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User already exists');
    });
  });

  // Nested test suite for user login endpoint
  describe('POST /api/users/login', () => {

    // Test case: Successful login
    it('should log in an existing user successfully', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'Password123!',
      };

      // Make POST request to login endpoint and expect HTTP 200 for success
      const response = await request(app)
        .post('/api/users/login')
        .send(loginData)
        .expect(200);

      // Assertions for successful login response
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('login successfully');
      expect(response.body.user).toHaveProperty('email', loginData.email);
      expect(response.body.token).toBeDefined(); // Check if token is returned
    });

    // Test case: Invalid login credentials
    it('should return an error for invalid login credentials', async () => {
      const invalidLoginData = {
        email: 'john@example.com',
        password: 'InvalidPassword', // Incorrect password
      };

      // Make POST request and expect HTTP 400 for bad request
      const response = await request(app)
        .post('/api/users/login')
        .send(invalidLoginData)
        .expect(400);

      // Assertions for invalid credentials error
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Email or password is not valid');
    });

    // Test case: Missing required fields in login
    it('should return an error for missing required fields', async () => {
      const invalidLoginData = {
        // Missing email and password
      };

      // Make POST request and expect HTTP 400 for bad request
      const response = await request(app)
        .post('/api/users/login')
        .send(invalidLoginData)
        .expect(400);

      // Assertions for missing fields error
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Missing required fields');
    });

    // Test case: Invalid email format in login
    it('should return an error for invalid email format', async () => {
      const invalidLoginData = {
        email: 'invalid-email', // Invalid email format
        password: 'Password123!',
      };

      // Make POST request and expect HTTP 400 for bad request
      const response = await request(app)
        .post('/api/users/login')
        .send(invalidLoginData)
        .expect(400);

      // Assertions for invalid email format error
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid email format');
    });
  });
});
