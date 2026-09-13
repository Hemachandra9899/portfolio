import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Grid2X2, X } from 'lucide-react';
import { LionScene } from '../components/LionScene';
import { projects, sections } from '../data/portfolio';
import photo from '../assets/nature.jpeg';
import './Portfolio.css';

const github = 'https://github.com/Hemachandra9899';
function External({ href, children, ...props }) { return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>; }

export function Portfolio({ initialSection = 'home' }) {
  const routeNavigate = useNavigate();
  const [active, setActive] = useState(initialSection);
  const [menu, setMenu] = useState(false);
  const dialog = useRef(null);
  const menuButton = useRef(null);
  const site = useRef(null);
  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
    }), { threshold: 0.08 });
    site.current.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });
    site.current.querySelectorAll('[data-section]').forEach(element => observer.observe(element));
    const requested = window.location.hash.slice(1) || initialSection;
    const timer = window.setTimeout(() => document.getElementById(requested)?.scrollIntoView({ behavior: 'instant' }), 50);
    return () => { reveal.disconnect(); observer.disconnect(); clearTimeout(timer); };
  }, [initialSection]);
  useEffect(() => {
    if (menu) dialog.current.showModal(); else if (dialog.current.open) dialog.current.close();
  }, [menu]);
  function closeMenu() { setMenu(false); menuButton.current?.focus(); }
  function navigate(id) {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
  }
  function openAssistant(event) {
    event.preventDefault();
    const go = () => routeNavigate('/ask');
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(go);
    } else {
      go();
    }
  }
  const currentIndex = sections.findIndex(([id]) => id === active);
  return <div className="portfolio" ref={site}>
    <a className="skip-link" href="#work">Skip to projects</a>
    <header className="masthead"><a href="#home" onClick={event => { event.preventDefault(); navigate('home'); }} className="monogram" aria-label="Hemachandra Reddy, home"><img src="/monogram.svg" alt="" width="36" height="36" /></a><span>AI &amp; DATA ENGINEER <span className="masthead-divider">/</span> HYDERABAD, INDIA</span><a href="mailto:pottingari@gmail.com">Let’s talk <ArrowUpRight size={14} /></a></header>
    <main>
      <section id="home" data-section className="hero">
        <div className="hero-name"><p>AI ENGINEER PORTFOLIO · HYDERABAD, INDIA</p><h1>Hemachandra Reddy<span>AI &amp; Data Engineer</span></h1></div>
        <div className="hero-lion"><LionScene invite onInvite={openAssistant} /></div>
        <div className="hero-bottom"><p>AI &amp; Data Engineer in Hyderabad.<br />I build thoughtful, reliable software.</p><a href="#work">SCROLL TO EXPLORE <ArrowDown size={16} /></a></div>
      </section>
      <section className="ai-focus section-pad" aria-labelledby="ai-focus-title">
        <span className="eyebrow">AI ENGINEERING / HYDERABAD</span>
        <div className="ai-focus-intro" data-reveal><h2 id="ai-focus-title">Building useful AI,<br /><em>end to end.</em></h2><p>I’m an AI and Data Engineer in Hyderabad building production-minded AI applications: research agents, retrieval-augmented generation systems, document intelligence, data pipelines, and the interfaces that make them usable.</p></div>
        <div className="ai-capabilities" data-reveal>
          <article><span>01</span><h3>AI agents &amp; LLM applications</h3><p>Designing contextual assistants, recursive research workflows, prompt systems, and reliable language-model integrations.</p></article>
          <article><span>02</span><h3>RAG &amp; knowledge systems</h3><p>Connecting embeddings, vector databases, semantic retrieval, and grounded answers for documents and personal knowledge.</p></article>
          <article><span>03</span><h3>Data &amp; product engineering</h3><p>Shipping Python and FastAPI services, PostgreSQL data systems, automation pipelines, and responsive React and Next.js experiences.</p></article>
        </div>
      </section>
      <section id="work" data-section className="work-section section-pad">
        <div className="section-heading" data-reveal><span className="eyebrow">01 / SELECTED WORK</span><div><h2>Things I’ve<br /><em>put into the world.</em></h2><p>A collection of ideas, experiments, and things built to be useful.</p></div><span className="project-count">(06)</span></div>
        <div className="project-stack">
          {projects.map((project, index) => <article className={`project-card project-${index}`} style={{ '--card-index': index }} key={project.repo}>
            <div className="project-inner" data-reveal>
              <div className="project-info"><div className="project-meta"><span>{project.motif} / 06</span><span>{project.category}</span></div><div><h3>{project.title}</h3><p>{project.description}</p><ul className="tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div><div className="project-actions"><Link to={`/projects/${project.slug}`} className="project-link">Read case study <ArrowUpRight size={16} aria-hidden="true" /></Link><External href={`${github}/${project.repo}`} className="project-repo">GitHub</External></div></div>
              <div className="project-type-art" aria-hidden="true"><span className="art-label">{project.category.split(' · ')[0]} / {project.motif}</span><span className="art-number">{project.motif}</span><p>{project.detail}</p><span className="art-footer">HEMACHANDRA REDDY <span>↗</span></span></div>
            </div>
          </article>)}
        </div>
        <External href={`${github}?tab=repositories`} className="all-code">More experiments on GitHub</External>
      </section>
      <section id="about" data-section className="about-section section-pad">
        <span className="eyebrow">02 / THE PERSON BEHIND THE CODE</span>
        <div className="about-grid"><h2 data-reveal>Curious by nature.<br /><em>Engineer by choice.</em></h2><div data-reveal><p className="about-lead">I’m Hemachandra, an AI and Data Engineer based in Hyderabad, India. I turn complicated problems into reliable, thoughtful products.</p><p>My work spans AI agents, RAG applications, REST APIs, databases, data pipelines, microservices, and React interfaces.</p><p>Outside the editor, you’ll find me with a camera, noticing quiet corners, or working through a problem on LeetCode.</p><External href="https://leetcode.com/u/Hemachandra9899/" className="text-link">A little daily problem solving</External></div></div>
        <div className="skills-grid" data-reveal><h3>The toolkit</h3><div><span>LANGUAGES</span><p>Python · Rust · C++ · JavaScript</p></div><div><span>PRODUCT & DATA</span><p>React · Next.js · Node.js · FastAPI<br />PostgreSQL · MongoDB · MySQL · Kafka</p></div><div><span>TOOLS & SYSTEMS</span><p>Docker · Microservices<br />GitHub Actions · Figma</p></div></div>
      </section>
      <section id="experience" data-section className="experience-section section-pad"><span className="eyebrow">03 / ALONG THE WAY</span><h2 data-reveal>Always <em>building.</em></h2>
        <div className="experience-row" data-reveal><span>2026 — PRESENT</span><div><h3>Align Labs</h3><p>AI & Data Engineer</p></div><p>Building AI infrastructure for a marketing OS: LLM-powered microservices, real-time data pipelines, and reliable automation for multi-channel campaigns.</p></div>
        <div className="experience-row" data-reveal><span>JUL — DEC 2024</span><div><h3>CodeNebula</h3><p>SDET Intern · Remote</p></div><p>Built a Web3 platform with React and Rust. Shipped REST APIs and CI/CD pipelines, and maintained over 95% test coverage.</p></div>
        <div className="education-row" data-reveal><span>EDUCATION</span><div><h3>Sreenidhi Institute of Science and Technology</h3><p>B.Tech · Information Technology · CGPA 7.14/10</p></div><div><span>CONTINUING TO LEARN</span><p>UX Design Process · Coursera<br />160 Days of Problem Solving · GeeksforGeeks</p></div></div>
      </section>
      <section id="journal" data-section className="journal-section section-pad"><span className="eyebrow">04 / AWAY FROM THE EDITOR</span><div className="journal-grid" data-reveal><img src={photo} alt="A quiet moment in nature from my photography collection" loading="lazy" /><div><span className="eyebrow">PERSONAL NOTE / FEB 2025</span><h2>Camera<br /><em>& code.</em></h2><p>Photography trains my eye; coding trains my mind. Both remind me to slow down, notice the details, and enjoy the process of getting unstuck.</p><details><summary>Read the note <span>+</span></summary><div className="journal-note"><p>Most of my days are split between carrying a camera on long walks and solving problems in code. For me they share the same habit: pay attention, explore a few angles, and slowly shape something that feels right.</p><p>My favorite photos are rarely planned. They happen when I’m just paying attention: light on a wall, a reflection, the way people move through a street.</p><p>I treat coding problems like tiny design challenges. Understand the constraints, explore approaches, and write clean solutions. Good work comes from trying small ideas and not giving up when something feels stuck.</p><p>Stay patient, stay curious, and keep improving one small step at a time.</p></div></details></div></div></section>
      <section id="contact" data-section className="contact-section section-pad"><span className="eyebrow">05 / THE NEXT GOOD THING</span><h2 data-reveal>Have something<br /><em>in mind?</em></h2><a className="contact-email" href="mailto:pottingari@gmail.com">Let’s make it happen. <ArrowUpRight /></a><div className="contact-links"><a href="mailto:pottingari@gmail.com">pottingari@gmail.com</a><External href={github}>GitHub</External><External href="https://www.linkedin.com/in/hemachandra-reddy/">LinkedIn</External><External href="https://leetcode.com/u/Hemachandra9899/">LeetCode</External></div><footer><span>© {new Date().getFullYear()} Hemachandra Reddy Pottingari</span><span>Made with code & curiosity.</span></footer></section>
    </main>
    <nav className="bottom-nav" aria-label="Portfolio navigation"><button ref={menuButton} className="menu-trigger" onClick={() => setMenu(true)} aria-haspopup="dialog" aria-expanded={menu}><Grid2X2 size={15} /><span>ALL SECTIONS</span></button><button className="nav-about" onClick={() => navigate('about')}>ABOUT</button><button disabled={currentIndex === 0} onClick={() => navigate(sections[currentIndex - 1][0])} aria-label="Previous section"><ArrowLeft size={14} /> PREV</button><button disabled={currentIndex === sections.length - 1} onClick={() => navigate(sections[currentIndex + 1][0])} aria-label="Next section">NEXT <ArrowRight size={14} /></button><button className="nav-home" onClick={() => navigate('home')} aria-label="Return home"><img src="/monogram.svg" alt="" width="25" height="25" /></button></nav>
    <dialog ref={dialog} className="section-dialog" onCancel={closeMenu} onClose={() => setMenu(false)} onClick={event => { if (event.target === dialog.current) closeMenu(); }}><div className="menu-top"><span className="eyebrow">TAKE A LOOK AROUND</span><button onClick={closeMenu} aria-label="Close menu"><X /></button></div><nav aria-label="All sections">{sections.map(([id, label], index) => <button onClick={() => navigate(id)} key={id} aria-current={active === id ? 'location' : undefined}><span>0{index}</span>{label}<ArrowUpRight /></button>)}</nav><a href="mailto:pottingari@gmail.com">Say hello <ArrowUpRight size={16} /></a></dialog>
  </div>;
}
