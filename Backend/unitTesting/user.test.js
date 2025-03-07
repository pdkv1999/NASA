const { createUser, login } = require('../controllers/userController');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mocking the dependencies
// These mocks replace the real implementations of User, bcrypt, and jwt with test doubles.
jest.mock('../models/userModel.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// Test suite for createUser function
describe('createUser function', () => {
    // Runs after each test case to clear mocks, ensuring no test case affects others.
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user successfully', async () => {
        // Test data for a valid user creation request
        const req = {
            body: {
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
            },
        };

        // Mock response object with chained methods
        const res = {
            status: jest.fn().mockReturnThis(),  // Allows method chaining
            json: jest.fn(),                     // Mock for sending JSON response
        };

        // Mocking bcrypt.hash to return a resolved promise with a fake hashed password
        const hashedPassword = 'hashedPassword123';
        bcrypt.hash.mockResolvedValue(hashedPassword);

        // Mocking User.create to simulate successful user creation
        const createdUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
        };
        User.create.mockResolvedValue(createdUser);

        // Execute the createUser function
        await createUser(req, res);

        // Assertions to check if the function behaves as expected
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);  // Ensures password hashing was attempted
        expect(User.create).toHaveBeenCalledWith(createdUser);            // Ensures user creation was attempted
        expect(res.status).toHaveBeenCalledWith(201);                     // Checks if status 201 was sent
        expect(res.json).toHaveBeenCalledWith({
            message: 'User created successfully',
            user: {
                fullName: createdUser.fullName,
                email: createdUser.email,
            },
        });
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

        // Mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Execute the createUser function with invalid data
        await createUser(req, res);

        // Assertions to check if proper error response is sent
        expect(res.status).toHaveBeenCalledWith(400);    // Checks if status 400 was sent
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid user data',
        });
    });
});

// Test suite for login function
describe('login function', () => {
    // Runs after each test case to clear mocks
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

        // Mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking user data and bcrypt.compare to simulate successful login
        const user = {
            fullName: 'John Doe',
            email: 'john@example.com',
            password: 'hashedPassword123',
            id: 'userId123',
        };
        User.findOne.mockResolvedValue(user);             // Simulates finding user in DB
        bcrypt.compare.mockResolvedValue(true);            // Simulates successful password match

        // Mocking jwt.sign to return a fake token
        const token = 'jwtToken123';
        jwt.sign.mockReturnValue(token);

        // Execute the login function
        await login(req, res);

        // Assertions to verify expected behavior
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });  // Check DB query for user
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);  // Check password comparison
        expect(jwt.sign).toHaveBeenCalledWith({ id: user.id }, expect.any(String), expect.any(Object));  // Check token creation
        expect(res.status).toHaveBeenCalledWith(200);        // Check if status 200 was sent
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    });

    it('should return error on invalid email or password', async () => {
        // Test data for login with invalid credentials
        const req = {
            body: {
                email: 'john@example.com',
                password: 'InvalidPassword',
            },
        };

        // Mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking User.findOne to return null, indicating no user found
        User.findOne.mockResolvedValue(null);

        // Execute the login function
        await login(req, res);

        // Assertions to check if proper error response is sent
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });  // Check if DB query was made
        expect(res.status).toHaveBeenCalledWith(401);                          // Check if status 401 was sent
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid email or password',
        });
    });
});
