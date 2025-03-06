// Importing necessary components
import Footer from "./components/Footer";                     // Footer component
import Header from "./components/Navbar";                     // Header (or Navbar) component
import FrontendRoutes from "./routes/routes";                 // All application routes

// App component definition
function App() {
  return (
    <div className="flex flex-col min-h-screen">              {/* Container with flex layout for full-screen height */}
      <Header />                                              {/* Header section */}
      <main className="flex-1 bg-blend-color-dodge">          {/* Main content area with flexible height */}
        <FrontendRoutes />                                    {/* Nested routes for different pages */}
      </main>
      <Footer />                                              {/* Footer section */}
    </div>
  );
}

// Exporting App component as default
export default App;
