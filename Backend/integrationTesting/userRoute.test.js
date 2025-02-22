const request = require('supertest');
const app = require('../server'); 

describe('User API', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
    .post('/api/users/register')
    .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123!',
    });

  });

  it('should log in an existing user successfully', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'Password123!',
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(loginData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('login successfully');
    expect(response.body.user).toHaveProperty('email', 'john@example.com');
    expect(response.body.token).toBeDefined();
  });

  it('should return error for invalid login credentials', async () => {
    const invalidLoginData = {
      email: 'john@example.com',
      password: 'InvalidPassword',
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(invalidLoginData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Email or password is not valid');
  });
});
