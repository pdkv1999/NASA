const request = require('supertest');
const app = require('../server');

describe('User API', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201); // Expect HTTP 201 for successful creation

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('New user created');
      expect(response.body.data).toHaveProperty('email', userData.email);
      expect(response.body.data).toHaveProperty('firstName', userData.firstName);
      expect(response.body.data).toHaveProperty('lastName', userData.lastName);
      expect(response.body.data).not.toHaveProperty('password'); // Ensure password is not returned
    });

    it('should return an error for missing required fields', async () => {
      const invalidUserData = {
        firstName: 'John',
        // Missing lastName, email, and password
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(invalidUserData)
        .expect(400); // Expect HTTP 400 for bad request

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Missing required fields');
    });

    it('should return an error for invalid email format', async () => {
      const invalidUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email', // Invalid email format
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(invalidUserData)
        .expect(400); // Expect HTTP 400 for bad request

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid email format');
    });

    it('should return an error for invalid password format', async () => {
      const invalidUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'weak', // Invalid password format
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(invalidUserData)
        .expect(400); // Expect HTTP 400 for bad request

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
    });

    it('should return an error if the user already exists', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com', // Same email as the first test
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(409); // Expect HTTP 409 for conflict

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/users/login', () => {
    it('should log in an existing user successfully', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(loginData)
        .expect(200); // Expect HTTP 200 for successful login

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('login successfully');
      expect(response.body.user).toHaveProperty('email', loginData.email);
      expect(response.body.token).toBeDefined(); // Ensure token is returned
    });

    it('should return an error for invalid login credentials', async () => {
      const invalidLoginData = {
        email: 'john@example.com',
        password: 'InvalidPassword', // Incorrect password
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(invalidLoginData)
        .expect(400); // Expect HTTP 400 for bad request

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Email or password is not valid');
    });

    it('should return an error for missing required fields', async () => {
      const invalidLoginData = {
        // Missing email and password
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(invalidLoginData)
        .expect(400); // Expect HTTP 400 for bad request

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Missing required fields');
    });

    it('should return an error for invalid email format', async () => {
      const invalidLoginData = {
        email: 'invalid-email', // Invalid email format
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(invalidLoginData)
        .expect(400); // Expect HTTP 400 for bad request

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid email format');
    });
  });
});