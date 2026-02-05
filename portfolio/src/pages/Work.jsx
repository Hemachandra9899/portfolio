import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- DATA: EXPERIENCE ---
const experience = [
  {
    id: "align-labs",
    role: "AI & Data Engineer",
    company: "Align Labs",
    period: "2026 — Present",
    description: "Building the AI backbone for a marketing OS. Architecting microservices that blend LLMs with real-time data pipelines to optimize campaign performance (CTR, ROAS). Focusing on system reliability, latency, and scalable automation for multi-channel growth.",
    tags: ["AI Infrastructure", "FastAPI", "Microservices", "NEXT JS"],
  },
];

// --- DATA: PROJECTS ---
const projects = [
  {
    id: "second-brain",
    title: "Second Brain",
    subtitle: "RAG AI Assistant",
    description:
      "A personal knowledge system powered by Pinecone & Embeddings. It lets you 'chat' with your notes intelligently using semantic search.",
    tags: ["REACT", "NODE.JS", "VECTOR DB", "OPENAI"],
    repoUrl: "https://github.com/Hemachandra9899/second-brain",
    color: "bg-white",
  },
  {
    id: "tools-simpleweb3",
    title: "SimpleWeb3",
    subtitle: "Blockchain Tools Hub",
    description:
      "A minimalist Web3 toolkit to inspect contracts, experiment with transactions, and explore on-chain data without the clutter.",
    tags: ["REACT", "RUST", "SOLIDITY", "WEB3"],
    repoUrl: "https://github.com/Hemachandra9899/tools.simpleweb3.ch",
    color: "bg-[#ffff4d]",
  },
  {
    id: "credit-card-fraud",
    title: "Fraud_Detection",
    subtitle: "ML Pipeline",
    description:
      "End-to-end pipeline analyzing transaction behavior. Uses Random Forest & Logistic Regression to flag suspicious activity in real-time.",
    tags: ["PYTHON", "SKLEARN", "PANDAS", "ML"],
    repoUrl: "https://github.com/Hemachandra9899/Credit-Card-Fraud-detection",
    color: "bg-white",
  },
];

export const Projects = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Me", path: "/about" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#6cf56c] text-black font-sans selection:bg-black selection:text-[#ffff4d] pb-20">
      
      {/* --- STYLES --- */}
      <style>{`
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .hard-shadow { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
      `}</style>

      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-40 z-0" />

      {/* =========================================
          TOP NAVIGATION (Logo Left, Menu Right)
          z-index: 50
      ========================================= */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between pointer-events-none">
        
        {/* LOGO (Back Home) */}
        <button onClick={() => navigate('/')} className="pointer-events-auto group">
          <span 
            className="text-3xl md:text-4xl font-black text-[#ffff4d] uppercase tracking-tighter transition-transform duration-300 group-hover:scale-110 inline-block"
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: '3px 3px 0px #000', 
              WebkitTextStroke: '1px black'   
            }}
          >
            HC
          </span>
        </button>

        {/* MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="
            pointer-events-auto
            bg-[#ffff4d] text-black 
            border-2 border-black 
            px-4 py-2 md:px-6 md:py-3
            font-bold font-mono uppercase tracking-widest text-xs md:text-sm
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none
            active:bg-white
            transition-all duration-200
            z-50 relative
          "
        >
          Menu [ + ]
        </button>
      </nav>

      {/* =========================================
          FULLSCREEN MENU OVERLAY
          z-index: 60
      ========================================= */}
      <div
        className={`
          fixed inset-0 z-[60]
          bg-[#ffff4d]
          flex flex-col
          transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1)
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* CLOSE BUTTON */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="
              bg-black text-[#ffff4d]
              border-2 border-black
              px-4 py-2 md:px-6 md:py-3
              font-bold font-mono uppercase tracking-widest text-xs md:text-sm
              shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
              hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:translate-y-[2px] hover:translate-x-[2px] 
              transition-all duration-200
            "
          >
            Close [ X ]
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 flex flex-col justify-center items-center gap-2">
          {menuItems.map(({ label, path }, index) => (
            <button
              key={label}
              onClick={() => handleMenuClick(path)}
              className="group relative w-full text-center py-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span 
                className="
                  relative z-10
                  text-5xl md:text-7xl lg:text-9xl 
                  font-black uppercase tracking-tighter
                  text-black group-hover:text-[#ffff4d]
                  transition-colors duration-300
                "
                style={{ fontFamily: '"Palette Mosaic", cursive' }}
              >
                {label}
              </span>
              <span className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 font-mono text-xs md:text-sm font-bold text-black/30 group-hover:text-[#ffff4d]/50 transition-colors duration-300">
                0{index + 1}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32">
        
        {/* HERO TITLE */}
        <header className="mb-20">
          <h1 
            className="text-[12vw] md:text-[9vw] leading-[0.85] font-black uppercase text-[#ffff4d] mix-blend-hard-light"
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: '4px 4px 0px #000',
              WebkitTextStroke: '2px black'
            }}
          >
            Experience<br/>& Works.
          </h1>
        </header>

        {/* --- SECTION 1: PROFESSIONAL EXPERIENCE --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
             <span className="bg-black text-[#ffff4d] px-3 py-1 font-mono font-bold uppercase text-sm border-2 border-black">
               01. Professional History
             </span>
             <div className="h-1 flex-1 bg-black"></div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {experience.map((job) => (
              <div 
                key={job.id} 
                className="bg-black text-white p-6 md:p-10 border-4 border-black hard-shadow flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
              >
                {/* Decorative "Job Ticket" visuals */}
                <div className="absolute top-0 right-0 bg-[#ffff4d] text-black font-mono text-xs font-bold px-4 py-1 border-l-4 border-b-4 border-black">
                  FULL_TIME
                </div>

                {/* Left: Timeline & Company */}
                <div className="md:w-1/3 flex-shrink-0">
                  <h3 
                    className="text-3xl md:text-4xl text-[#ffff4d] uppercase leading-none mb-2"
                    style={{ fontFamily: '"Palette Mosaic", cursive' }}
                  >
                    {job.company}
                  </h3>
                  <div className="font-mono text-lg font-bold border-l-4 border-[#ffff4d] pl-4 mt-4">
                    {job.period}
                  </div>
                </div>

                {/* Right: Role & Description */}
                <div className="md:w-2/3">
                  <h4 className="text-2xl md:text-3xl font-black uppercase mb-4">
                    {job.role}
                  </h4>
                  <p className="font-mono text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                    {job.description}
                  </p>
                  
                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-white/10 border border-white/30 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#ffff4d]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* --- SECTION 2: PROJECTS GRID --- */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <span className="bg-white text-black px-3 py-1 font-mono font-bold uppercase text-sm border-2 border-black">
               02. Selected Projects
             </span>
             <div className="h-1 flex-1 bg-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <article 
                key={project.id}
                className={`
                  ${project.color} 
                  border-4 border-black 
                  p-6 flex flex-col justify-between
                  hard-shadow transition-all duration-300
                  hover:translate-x-[-4px] hover:translate-y-[-4px] 
                  hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                `}
              >
                <div>
                  {/* Header: Title + Number */}
                  <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-4">
                    <div>
                      <h2 
                        className="text-2xl md:text-3xl font-black uppercase leading-none break-words"
                        style={{ fontFamily: '"Palette Mosaic", cursive' }}
                      >
                        {project.title}
                      </h2>
                      <span className="font-mono text-xs font-bold bg-black text-white px-1 mt-1 inline-block">
                        {project.subtitle}
                      </span>
                    </div>
                    <span className="font-mono text-xl font-bold opacity-30">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-sm md:text-base font-medium leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="border-2 border-black px-2 py-1 text-[10px] md:text-xs font-bold uppercase hover:bg-black hover:text-[#ffff4d] transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="
                    block w-full text-center
                    bg-black text-white 
                    border-2 border-black
                    py-3 font-mono font-bold uppercase tracking-widest
                    hover:bg-[#ffff4d] hover:text-black
                    transition-colors
                  "
                >
                  View Code [↗]
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 border-t-4 border-black pt-8 font-mono font-bold text-sm uppercase flex justify-between items-center">
          <span>More coming soon...</span>
          <a href="https://github.com/Hemachandra9899" target="_blank" rel="noreferrer" className="hover:underline hover:bg-black hover:text-[#ffff4d] px-1">
            See Github Profile →
          </a>
        </footer>

      </main>
    </div>
  );
};

export default Projects;