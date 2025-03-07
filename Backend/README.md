- Node.js: Runs the server, handles asynchronous operations, and manages packages.
- Express.js: Simplifies HTTP handling, routing, middleware management, and RESTful API design.
- Mongoose: Manages MongoDB schemas and CRUD operations in a clean and consistent manner.

## How does your app handle authentication?
- Uses JWT for token-based authentication. On login, a JWT is generated and stored on the client-side to access protected routes.
```sh
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
```

## How do you secure passwords in your app?
- Uses bcrypt to hash passwords before saving them in MongoDB.
```sh
const hashedPassword = await bcrypt.hash(password, 10);
```

## Why did you choose Context API over Redux for state management?
- Simpler and lighter for managing authentication state without Redux’s boilerplate.
```sh
const { isLoggedIn, login, logout } = useAuth();
```

## How do you handle API errors in Axios?
- Uses try-catch blocks and displays errors using react-toastify.
```sh
try {
  await axios.get("/api/data");
} catch (error) {
  toast.error(error.response?.data?.message || "API Error");
}
```

## How does useEffect work in React?
- Runs side effects after component renders. Can have dependencies to control execution.
```sh
useEffect(() => {
  fetchData();
}, [dependency]);
```

## How do you protect API keys in your project?
- Stores them in .env files and accesses them using process.env
```sh
const API_KEY = process.env.REACT_APP_API_KEY;
```

## How does routing work in your app?
- Uses react-router-dom with Routes and Route for navigation.
```sh
<Route path="/login" element={<Login />} />
```

## How does your app handle CORS?
- Uses cors middleware in Express to allow specific origins.
```sh
app.use(cors({ origin: "https://example.com" }));
```

## How do you perform input validation in your app?
- Uses regex for validating email and password formats.
```sh
const isValidEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
```

## How do you handle protected routes in React?
- Uses a PrivateRoute component to check authentication before rendering protected pages.
```sh
return isLoggedIn ? <Component /> : <Navigate to="/login" />;
```

## How does your app handle CORS?
- Uses cors middleware in Express to allow specific origins.
```sh
app.use(cors({ origin: "https://example.com" }));
```

## How do you connect to MongoDB in your app?
- Uses Mongoose to connect via a URL stored in .env.
```sh
mongoose.connect(process.env.MONGODB_URL);
```

## How does error handling work in your Express routes?
- Uses try-catch blocks and a centralized error handler.
```sh
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));
```

## How does useState work in React?
- Manages local state in functional components.
```sh
const [count, setCount] = useState(0);
```

## How do you optimize API calls in your app?
- Implements caching and debouncing for frequent calls.
```sh
useMemo(() => fetchData(), [dependency]);
```

## How do you secure API endpoints in Express?
- Uses JWT middleware to verify tokens before accessing protected routes.
```sh
app.use("/api", authMiddleware, apiRoutes);
```


