import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  // =========================================
  // 1. STATE & MENU LOGIC
  // =========================================
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCrazy, setIsCrazy] = useState(false); // <--- CRAZY MODE STATE
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
    <div className={`
      min-h-screen font-sans transition-colors duration-500 ease-in-out pb-20 relative overflow-hidden
      ${isCrazy ? 'bg-[#050505] text-[#39ff14] selection:bg-[#ff00ff] selection:text-white' : 'bg-[#6cf56c] text-black selection:bg-black selection:text-[#ffff4d]'}
    `}>
      
      {/* --- STYLES (Includes Glitch & Crazy Effects) --- */}
      <style>{`
        /* Standard Texture */
        .bg-grain { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
        
        /* Shadows */
        .hard-shadow { box-shadow: 6px 6px 0px 0px rgba(0,0,0,1); }
        .hard-shadow-hover:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0px 0px rgba(0,0,0,1); }
        .neon-shadow { box-shadow: 0px 0px 10px 1px #39ff14, 4px 4px 0px 0px #ff00ff; }

        /* CRAZY: CRT Scanlines */
        .scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
          background-size: 100% 4px;
          animation: scanline 0.2s linear infinite;
          pointer-events: none;
        }

        /* CRAZY: Glitch Text */
        .glitch-text { position: relative; color: #39ff14; }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8;
        }
        .glitch-text::before { color: #ff00ff; z-index: -1; animation: glitch-1 0.4s infinite linear alternate-reverse; }
        .glitch-text::after { color: #00ffff; z-index: -2; animation: glitch-2 0.4s infinite linear alternate-reverse; }

        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
        }
      `}</style>

      {/* Texture & Scanlines */}
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-40 z-0" />
      {isCrazy && <div className="fixed inset-0 scanlines z-[1] opacity-30" />}

      {/* =========================================
          TOP NAVIGATION
      ========================================= */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between pointer-events-none">
        
        {/* LEFT GROUP */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link to="/" className="group">
            <button className={`
              border-2 px-4 py-2 md:px-6 md:py-2 font-mono font-bold uppercase tracking-widest text-xs md:text-sm transition-all
              ${isCrazy 
                ? 'bg-transparent text-[#00ffff] border-[#00ffff] hover:bg-[#00ffff] hover:text-black shadow-[4px_4px_0px_0px_#39ff14]' 
                : 'bg-black text-[#ffff4d] border-black hard-shadow hover:bg-white hover:text-black'
              }
            `}>
              ← Back Home
            </button>
          </Link>
          <span className={`
            font-['Palette_Mosaic'] text-xl md:text-2xl uppercase tracking-widest hidden md:block
            ${isCrazy ? 'text-[#ff00ff]' : 'mix-blend-hard-light'}
          `}>
            Profile_V1.0
          </span>
        </div>

        {/* RIGHT GROUP: CRAZY TOGGLE + MENU */}
        <div className="flex gap-4 pointer-events-auto">
          
          {/* CRAZY TOGGLE */}
          <button
            onClick={() => setIsCrazy(!isCrazy)}
            className={`
              border-2 px-3 py-2 md:px-4 md:py-3 font-bold font-mono uppercase text-xs md:text-sm transition-all duration-200
              ${isCrazy 
                ? 'bg-transparent text-[#ff00ff] border-[#ff00ff] shadow-[0_0_10px_#ff00ff] animate-pulse' 
                : 'bg-black text-white border-black hover:bg-gray-800'
              }
            `}
          >
            {isCrazy ? '⚠ NORMAL' : '⚡ CRAZY'}
          </button>

          {/* MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`
              border-2 px-4 py-2 md:px-6 md:py-3 font-bold font-mono uppercase tracking-widest text-xs md:text-sm transition-all
              ${isCrazy 
                ? 'bg-transparent text-[#39ff14] border-[#39ff14] shadow-[4px_4px_0px_0px_#ff00ff] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none' 
                : 'bg-[#ffff4d] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none active:bg-white'
              }
            `}
          >
            Menu [ + ]
          </button>
        </div>
      </nav>

      {/* =========================================
          FULLSCREEN MENU OVERLAY
      ========================================= */}
      <div
        className={`
          fixed inset-0 z-[60] flex flex-col transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1)
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
          ${isCrazy ? "bg-black" : "bg-[#ffff4d]"}
        `}
      >
        <div className="absolute top-6 right-6 md:top-10 md:right-10">
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`
              border-2 px-4 py-2 md:px-6 md:py-3 font-bold font-mono uppercase tracking-widest text-xs md:text-sm transition-all
              ${isCrazy 
                ? 'bg-transparent text-[#ff00ff] border-[#ff00ff] shadow-[4px_4px_0px_0px_#39ff14]' 
                : 'bg-black text-[#ffff4d] border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
              }
            `}
          >
            Close [ X ]
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center items-center gap-2">
          {menuItems.map(({ label, path }, index) => (
            <button
              key={label}
              onClick={() => handleMenuClick(path)}
              className="group relative w-full text-center py-4 overflow-hidden"
            >
              <div className={`absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out ${isCrazy ? 'bg-[#39ff14]' : 'bg-black'}`} />
              <span 
                className={`
                  relative z-10 text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter transition-colors duration-300
                  ${isCrazy ? 'text-white group-hover:text-black mix-blend-difference' : 'text-black group-hover:text-[#ffff4d]'}
                `}
                style={{ fontFamily: '"Palette Mosaic", cursive' }}
              >
                {label}
              </span>
              <span className={`absolute top-1/2 left-4 md:left-10 -translate-y-1/2 font-mono text-xs md:text-sm font-bold transition-colors duration-300 ${isCrazy ? 'text-[#ff00ff]' : 'text-black/30 group-hover:text-[#ffff4d]/50'}`}>
                0{index + 1}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32">
        
        {/* 1. HERO TITLE */}
        <header className="mb-16">
          <h1 
            data-text="About Me."
            className={`
              text-[12vw] md:text-[8vw] leading-[0.85] font-black uppercase transition-colors duration-300
              ${isCrazy 
                ? 'glitch-text text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]' 
                : 'text-[#ffff4d] mix-blend-hard-light text-shadow-[4px_4px_0px_#000]'}
            `}
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              WebkitTextStroke: isCrazy ? 'none' : '2px black'
            }}
          >
            About<br/>Me.
          </h1>
        </header>

        {/* 2. INTRO "STICKY NOTE" */}
        <section className="mb-20">
          <div className={`
            border-4 p-6 md:p-10 max-w-4xl transition-all duration-300
            ${isCrazy 
              ? 'bg-black/50 border-[#ff00ff] text-[#ff00ff] neon-shadow rotate-0 hover:rotate-1' 
              : 'bg-white border-black hard-shadow rotate-1 hover:rotate-0 text-black'
            }
          `}>
            <p className="text-2xl md:text-4xl font-bold leading-tight uppercase font-mono">
              I’m an entry-level software developer who enjoys building <span className={`${isCrazy ? 'bg-[#39ff14] text-black' : 'bg-[#ffff4d]'} px-2`}>reliable</span>, high-performance products.
            </p>
            <div className={`mt-6 text-lg md:text-xl font-medium font-mono space-y-4 border-t-2 pt-6 border-dashed ${isCrazy ? 'text-[#39ff14] border-[#39ff14]' : 'text-gray-800 border-black'}`}>
              <p>/// WORKING ON: REST APIs, Databases, Microservices (Rust, Node.js).</p>
              <p>/// BUILDING UI: React + Tailwind.</p>
              <p>/// LOCATION: Hyderabad, India.</p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:pottingari@gmail.com" className={`px-4 py-2 font-mono text-sm border-2 transition-colors ${isCrazy ? 'bg-transparent text-[#00ffff] border-[#00ffff] hover:bg-[#00ffff] hover:text-black' : 'bg-black text-white border-black hover:bg-[#ffff4d] hover:text-black'}`}>EMAIL ME</a>
              <a href="https://www.linkedin.com/in/hemachandra-reddy/" target="_blank" rel="noreferrer" className={`px-4 py-2 font-mono text-sm border-2 transition-colors ${isCrazy ? 'bg-transparent text-[#ff00ff] border-[#ff00ff] hover:bg-[#ff00ff] hover:text-black' : 'bg-[#0077B5] text-white border-black hover:bg-white hover:text-[#0077B5]'}`}>LINKEDIN</a>
              <a href="https://github.com/Hemachandra9899" target="_blank" rel="noreferrer" className={`px-4 py-2 font-mono text-sm border-2 transition-colors ${isCrazy ? 'bg-transparent text-[#39ff14] border-[#39ff14] hover:bg-[#39ff14] hover:text-black' : 'bg-gray-800 text-white border-black hover:bg-white hover:text-black'}`}>GITHUB</a>
            </div>
          </div>
        </section>

        {/* 3. BENTO GRID LAYOUT */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CARD: EXPERIENCE */}
          <div className={`
            border-4 p-6 flex flex-col h-full transition-all duration-300
            ${isCrazy ? 'bg-black border-[#39ff14] neon-shadow text-[#39ff14]' : 'bg-[#ffff4d] border-black hard-shadow text-black'}
          `}>
            <h3 className={`font-['Palette_Mosaic'] text-2xl uppercase mb-4 border-b-4 pb-2 ${isCrazy ? 'border-[#39ff14]' : 'border-black'}`}>Experience</h3>
            <div className="font-mono flex-1">
              <div className="mb-4">
                <h4 className="font-black text-lg">SDET INTERN</h4>
                <p className="text-sm font-bold opacity-75">CodeNebula • Remote</p>
                <p className="text-xs mb-2">Jul 2024 – Dec 2024</p>
                <p className={`text-sm leading-relaxed border-l-2 pl-3 ${isCrazy ? 'border-[#ff00ff]' : 'border-black'}`}>
                  Built a Web3 platform with React & Rust. Shipped REST APIs, CI/CD pipelines, and maintained 95%+ test coverage.
                </p>
              </div>
            </div>
          </div>

          {/* CARD: SKILLS */}
          <div className={`
            border-4 p-6 flex flex-col h-full transition-all duration-300
            ${isCrazy ? 'bg-black border-[#ff00ff] neon-shadow text-[#ff00ff]' : 'bg-black border-black hard-shadow text-[#ffff4d]'}
          `}>
            <h3 className={`font-['Palette_Mosaic'] text-2xl uppercase mb-4 border-b-2 pb-2 ${isCrazy ? 'border-[#ff00ff]' : 'border-[#ffff4d]'}`}>Tech_Stack</h3>
            <ul className="font-mono text-sm space-y-3">
              {['Rust / C++ / Python', 'React / Node.js / Express', 'Docker / Microservices', 'MySQL / MongoDB / Kafka', 'GitHub Actions / Figma'].map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${isCrazy ? 'bg-[#00ffff]' : 'bg-[#ffff4d]'}`}></span> {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* CARD: PROJECTS */}
          <div className={`
            border-4 p-6 flex flex-col h-full transition-all duration-300
            ${isCrazy ? 'bg-black border-[#00ffff] neon-shadow text-[#00ffff]' : 'bg-white border-black hard-shadow text-black'}
          `}>
             <h3 className={`font-['Palette_Mosaic'] text-2xl uppercase mb-4 border-b-4 pb-2 ${isCrazy ? 'border-[#00ffff]' : 'border-black'}`}>Projects</h3>
            <div className="space-y-6 font-mono">
              <div>
                <h4 className="font-black text-lg uppercase">SecondBrain</h4>
                <span className={`text-xs px-1 ${isCrazy ? 'bg-[#00ffff] text-black' : 'bg-black text-white'}`}>RAG AI Assistant</span>
                <p className="text-sm mt-2">Personal AI assistant using RAG + Pinecone. React UI + Node.js backend.</p>
              </div>
              <div className={`border-t-2 border-dashed pt-4 ${isCrazy ? 'border-[#00ffff]' : 'border-black'}`}>
                <h4 className="font-black text-lg uppercase">Fraud Detection</h4>
                <span className={`text-xs px-1 ${isCrazy ? 'bg-[#00ffff] text-black' : 'bg-black text-white'}`}>ML Model</span>
                <p className="text-sm mt-2">Random Forest model with ~92% accuracy for credit card fraud detection.</p>
              </div>
            </div>
          </div>

          {/* CARD: EDUCATION */}
          <div className={`
            border-4 p-6 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all duration-300
            ${isCrazy ? 'bg-black border-[#39ff14] neon-shadow text-[#39ff14]' : 'bg-[#6cf56c] border-black hard-shadow text-black'}
          `}>
            <div>
              <h3 className="font-['Palette_Mosaic'] text-2xl uppercase mb-2">Education</h3>
              <p className="font-mono font-bold text-lg">Sreenidhi Institute of Science and Technology</p>
              <p className="font-mono text-sm">B.Tech (Information Technology) • CGPA 7.14/10 • 2021 – Present</p>
            </div>
            
            <div className={`border-2 p-4 rotate-2 md:rotate-0 ${isCrazy ? 'bg-black border-[#ff00ff] text-[#ff00ff]' : 'bg-white border-black text-black'}`}>
               <h4 className={`font-black font-mono text-sm uppercase mb-2 border-b-2 ${isCrazy ? 'border-[#ff00ff]' : 'border-black'}`}>Certifications</h4>
               <ul className="text-xs font-mono space-y-1">
                 <li>• UX Design Process (Coursera)</li>
                 <li>• 160 Days of Problem Solving (GfG)</li>
               </ul>
            </div>
          </div>

        </section>

        {/* FOOTER */}
        <footer className={`mt-20 border-t-4 pt-8 pb-12 font-mono font-bold text-sm uppercase flex justify-between ${isCrazy ? 'border-[#39ff14] text-[#39ff14]' : 'border-black text-black'}`}>
          <span>© 2025 Hemachandra Reddy</span>
          <span>Status: Available for Work</span>
        </footer>

      </main>
    </div>
  );
};