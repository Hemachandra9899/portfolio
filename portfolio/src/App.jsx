import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import './index.css';

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/about" element={<Portfolio initialSection="about" />} />
    <Route path="/work" element={<Portfolio initialSection="work" />} />
    <Route path="/contact" element={<Portfolio initialSection="contact" />} />
    <Route path="/blogs" element={<Portfolio initialSection="journal" />} />
    <Route path="*" element={<Portfolio />} />
  </Routes></BrowserRouter>;
}
