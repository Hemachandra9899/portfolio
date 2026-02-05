import { useState, useEffect } from 'react'; // 1. Import Hooks
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingPage.jsx";
import { Profile } from "./pages/About.jsx";
import { Projects } from "./pages/Work.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Blog } from "./pages/Blog.jsx";
import "./index.css";
// 2. Import your Preloader component
import Preloader from './pages/Preloader'; 

function App() {
  // 3. Create the loading state
  const [isLoading, setIsLoading] = useState(true);

  // 4. Create the timer effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Adjust this time (2500ms = 2.5s) as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 5. Conditional Rendering */}
      {isLoading ? (
        <Preloader />
      ) : (
        <Router>
          <div className="relative flex flex-col min-h-screen bg-black text-gray-200 font-sans">
            <Routes>
              {/* first / main route */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<Profile />} />
              <Route path="/work" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blog />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;