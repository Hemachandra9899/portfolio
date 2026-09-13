import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import './index.css';
import { RouteMetadata } from './components/RouteMetadata';
import { AskAI } from './pages/AskAI';
import { ProjectPage } from './pages/ProjectPage';

export function AppRoutes() {
  return <><RouteMetadata /><Routes>
    <Route path="/ask" element={<AskAI />} />
    <Route path="/projects/:slug" element={<ProjectPage />} />
    <Route path="/" element={<Portfolio />} />
    <Route path="/about" element={<Portfolio initialSection="about" />} />
    <Route path="/work" element={<Portfolio initialSection="work" />} />
    <Route path="/contact" element={<Portfolio initialSection="contact" />} />
    <Route path="/blogs" element={<Portfolio initialSection="journal" />} />
    <Route path="*" element={<Portfolio />} />
  </Routes></>;
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
