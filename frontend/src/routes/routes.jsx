// Importing necessary modules and components
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";                           // For routing in React
import Home from "../components/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/login";
import Gallery from "../pages/NasaApi/gallery";
import APODViewer from "../pages/NasaApi/APODViewer";
import EarthImage from "../pages/NasaApi/EarthImage";
import Epic from "../pages/NasaApi/EpicImage";

// PrivateRoute component to handle protected routes
const PrivateRoute = ({ Component }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")); // Retrieve login status from localStorage

  // If logged in, render the component; otherwise, redirect to login page
  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

// FrontendRoutes component for defining all application routes
const FrontendRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/gallery" element={<PrivateRoute Component={Gallery} />} />
        <Route path="/apod" element={<PrivateRoute Component={APODViewer} />} />
        <Route path="/earth" element={<PrivateRoute Component={EarthImage} />} />
        <Route path="/epic" element={<PrivateRoute Component={Epic} />} />
      </Routes>
    </Router>
  );
};

// Exporting FrontendRoutes component
export default FrontendRoutes;
