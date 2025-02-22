import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../components/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/login";
import Gallery from "../pages/NasaApi/gallery";
import APODViewer from "../pages/NasaApi/APODViewer";
import EarthImage from "../pages/NasaApi/EarthImage";
import Epic from "../pages/NasaApi/EpicImage";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ Component }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

const FrontendRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/gallery" element={<PrivateRoute Component={Gallery} />} />
        <Route path="/apod" element={<PrivateRoute Component={APODViewer} />} />
        <Route
          path="/earth"
          element={<PrivateRoute Component={EarthImage} />}
        />
        <Route path="/epic" element={<PrivateRoute Component={Epic} />} />
      </Routes>
    </Router>
  );
};
export default FrontendRoutes;
