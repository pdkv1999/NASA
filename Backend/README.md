- Node.js: Runs the server, handles asynchronous operations, and manages packages.
- Express.js: Simplifies HTTP handling, routing, middleware management, and RESTful API design.
- Mongoose: Manages MongoDB schemas and CRUD operations in a clean and consistent manner.

## How does your app handle authentication?
- Uses JWT for token-based authentication. On login, a JWT is generated and stored on the client-side to access protected routes.
```sh
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
```

