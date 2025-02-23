# Cosmic Explorer

Cosmic Explorer is a web-based application that utilizes NASA APIs to deliver a range of astronomical data and stunning imagery. Users can create an account, sign in, and explore various features such as the Astronomy Picture of the Day (APOD), Mars Rover Photos, EPIC (Earth Polychromatic Imaging Camera), and Earth imagery.

You can access the live application here: [Cosmic Explorer](https://nasa-snowy.vercel.app/)

vercel account: [vercel](https://vercel.com/dileep-kumar-varma-penmetsas-projects/nasa)

## Key Features
### User Authentication
- Users must register and log in to access NASA API-powered content.
- Authentication is implemented using Node.js and MongoDB, ensuring secure storage of user credentials.

### Available Pages
1. **Mars Rover Photos**  
   Explore high-resolution images captured by Mars rovers with easy navigation through paginated content.
2. **Astronomy Picture of the Day (APOD)**  
   View NASA's daily featured space image and search for specific dates to explore past images.
3. **Near Earth Object Web Service**  
   Retrieve satellite images of Earth by providing latitude, longitude, and date.
4. **Earth Polychromatic Imaging Camera (EPIC)**  
   Browse Earth images captured by NASA’s EPIC camera.

### Frontend
- Developed with Vite React for optimized performance.
- React Router is used for seamless navigation across different pages.
- Protected routes ensure that only authenticated users can access certain features.

### Backend
- Built using Node.js and Express.
- MongoDB serves as the database for user data management.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/2493417c-9e60-4c36-8d1d-dd61ba669c84" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/c36bddc1-8f24-455c-80d1-1640aa0e677b" />


- Secure authentication is implemented using JWT (JSON Web Tokens) for protected API access.

## Installation Guide

To run Cosmic Explorer locally, ensure you have [Node.js](https://nodejs.org/) installed.

### Cloning the Repository
```sh
git clone https://github.com/pdkv1999/NASA.git

```
### Setting Up the Backend
1. After cloning the repository, navigate to backend directory
```sh
cd Backend

```
2. Install required dependencies:
```sh
npm install
```
3. Configure environment variables:
- Create a .env file in the backend directory.
- Add the following variables:
```sh
PORT=<port_number>
MONGODB_URL=<mongodb_url>
```
4. Start the backend server
```sh
npm run dev
```

### Frontend
1. Move to the frontend directory:
```sh
cd frontend
```
2. Install dependencies:
```sh
npm install
```
3. Launch the development server:
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
  "firstName": "Dileep",
  "lastName": "Kumar",
  "email": "dileep.kumar@example.com",
  "password": "password"
}
```
#### POST /api/users/login
- Login a user.
- Request body
```sh
{
  "email": "dileep.kumar@example.com",
  "password": "password"
}
```

### Contributing

We welcome contributions! To contribute:
- Fork the repository.
- Create a new branch (git checkout -b feature/new-feature).
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/new-feature).
- Create a new Pull Request.

Happy Learning :)
