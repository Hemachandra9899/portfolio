import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolio';
import './ProjectPage.css';

const github = 'https://github.com/Hemachandra9899';

export function ProjectPage({ project: providedProject }) {
  const { slug } = useParams();
  const project = providedProject || projects.find(item => item.slug === slug);
  if (!project) return <Navigate to="/" replace />;

  return <main className="case-study">
    <header><Link to="/#work"><ArrowLeft size={16} /> Portfolio</Link><span>HEMACHANDRA REDDY · AI &amp; DATA ENGINEER</span></header>
    <article>
      <span className="case-index">PROJECT {project.motif} / 06 · {project.category}</span>
      <h1>{project.title}</h1>
      <p className="case-lead">{project.description}</p>
      <div className="case-grid">
        <section><span>FOCUS</span><h2>{project.focus}</h2><p>This project shows how I approach an applied engineering problem: clarify the user need, choose a focused architecture, connect the required services, and shape the result into a usable product.</p></section>
        <section><span>TECHNOLOGY</span><ul>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section>
      </div>
      <a className="case-repo" href={`${github}/${project.repo}`} target="_blank" rel="noreferrer">Explore the source on GitHub <ArrowUpRight /></a>
    </article>
    <footer><Link to="/#work">← All selected work</Link><span>AI engineer portfolio · Hyderabad, India</span></footer>
  </main>;
}
