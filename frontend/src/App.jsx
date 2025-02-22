import Footer from "./components/Footer";
import Header from "./components/Navbar";
import FrontendRoutes from "./routes/routes";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-blend-color-dodge">
        <FrontendRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
