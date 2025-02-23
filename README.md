# Astro Data Hub

Astro Data Hub is a web application that leverages NASA APIs to provide users with various astronomical data and imagery. Users can register an account, log in, and access different features of the application including Astronomy Picture of the Day (APOD), Mars Rover Photos, EPIC (Earth Polychromatic Imaging Camera), and Earth APIs.

You can access the web application using the following link:
[https://nasa-snowy.vercel.app/](https://nasa-snowy.vercel.app/)

## Features
### User Authentication
- Users need to create an account and log in to access the NASA API pages.
- User authentication is implemented on the backend using Node.js and MongoDB for storing user data securely.

### Pages
1. Mars Rover Photos
   Displays photos captured by Mars rovers with pagination to navigate through the images.
2. APOD Viewer (Astronomy Picture of the Day)
   Users can view the astronomy picture of the day and search for images for a specific date range.
3. Earth Wonders
   Allows users to enter valid latitude, longitude, and date to retrieve Earth images.
4. EPIC Images (Earth Polychromatic Imaging Camera)
   Displays Earth images captured by the EPIC camera.

### Frontend
- Built with Vite React for a fast and efficient development experience.
- Utilizes React Router for navigation between different pages.
- Private routes ensure that users must be logged in to access certain pages.

### Backend
- Developed using Node.js and Express framework.
- MongoDB is used as the database for storing user information.
- User authentication is handled using JWT (JSON Web Tokens) for secure access to protected routes.

## Installation

Astro Data Hub requires [Node.js](https://nodejs.org/) to run.

As the first step clone the Repository:
```sh
git clone https://github.com/pdkv1999/NASA.git
```
### Backend
1. After cloning the repository, navigate to backend directory
```sh
cd Backend
```
2. Install the dependencies and devDependencies and start the server.
```sh
npm install
```
3. Set up environment variables
- Create a .env file in the backend directory.
- Define the following variables
```sh
PORT=<port_number>
MONGODB_URL=<mongodb_url>
ACCESS_TOKEN_SECRET=<secret_key_for_jwt>
```
4. Start the backend server
```sh
npm run dev
```

### Frontend
1. Navigate to the frontend directory
```sh
cd frontend
```
2. Install dependencies
```sh
npm install
```
3. Start the frontend development server
```sh
npm run dev
```
4. Access the application in your browser at
[http://localhost:5173/](http://localhost:5173/)

## API Endpoints
### User Authentication
#### POST /api/users/register
- Register a new user
- Request body
```sh
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password"
}
```
#### POST /api/users/login
- Login a user.
- Request body
```sh
{
  "email": "john.doe@example.com",
  "password": "password"
}
```
### Testing

1. Unit Testing with Jest:
Unit test cases are under "unitTesting folder". To run the test, simply you have to give the command as below. 
```sh
npm test <Unit-test-file-name>.test.js
```
2. Integration Testing with Jest:
Integration test cases are under "integrationTesting folder". To run the test, simply you have to give the command as below. 
```sh
npm test <Integration-test-file-name>.test.js
```

### Contributing

Contributions are welcome! Please follow the standard guidelines:
- Fork the repository.
- Create a new branch (git checkout -b feature/new-feature).
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/new-feature).
- Create a new Pull Request.

Happy Coding :)