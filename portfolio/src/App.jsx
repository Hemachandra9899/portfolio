// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingPage.jsx";
import { Profile } from "./pages/About.jsx";
import {Projects} from "./pages/Work.jsx";
import {Contact} from "./pages/Contact.jsx";
import {Blog} from "./pages/Blog.jsx";
function App() {
  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-black text-gray-200 font-sans">
        <Routes>
          {/* first / main route */}
          <Route path="/" element={<LandingPage />} />

          
          <Route path="/about" element={<Profile/>} />
          <Route path="/work" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/blogs" element={<Blog/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
