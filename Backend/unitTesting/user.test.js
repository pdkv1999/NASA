const { createUser, login } = require('../controllers/userController');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mocking the dependencies
jest.mock('../models/userModel.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('createUser function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user successfully', async () => {
        // Test data
        const req = {
            body: {
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking bcrypt.hash
        const hashedPassword = 'hashedPassword123';
        bcrypt.hash.mockResolvedValue(hashedPassword);

        // Mocking User.create
        const createdUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
        };
        User.create.mockResolvedValue(createdUser);
    });

    it('should return error if user data is invalid', async () => {
        // Test data with invalid user inputs
        const req = {
            body: {
                fullName: '',
                email: 'invalidemail',
                password: 'weakpassword',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
});

describe('login function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return token and user information on successful login', async () => {
        // Test data for a successful login
        const req = {
            body: {
                email: 'john@example.com',
                password: 'Password123!',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking user data and bcrypt.compare
        const user = {
            fullName: 'John Doe',
            email: 'john@example.com',
            password: 'hashedPassword123',
            id: 'userId123',
        };
        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);

        // Mocking jwt.sign
        const token = 'jwtToken123';
        jwt.sign.mockReturnValue(token);
    });

    it('should return error on invalid email or password', async () => {
        // Test data for login with invalid credentials
        const req = {
            body: {
                email: 'john@example.com',
                password: 'InvalidPassword',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking User.findOne to return null, indicating no user found
        User.findOne.mockResolvedValue(null);
    });
});
