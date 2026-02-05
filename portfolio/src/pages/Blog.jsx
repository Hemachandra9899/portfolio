import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Blog = () => {
  // =========================================
  // 1. STATE & MENU LOGIC
  // =========================================
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCrazy, setIsCrazy] = useState(false); // <--- CRAZY MODE
  const navigate = useNavigate();

  const sections = useMemo(
    () => [
      { id: "intro", label: "01. Intro" },
      { id: "photography", label: "02. Photography" },
      { id: "coding", label: "03. Code & LeetCode" },
      { id: "wrap", label: "04. Methodology" },
    ],
    []
  );

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

  // Scroll Progress Logic
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`
      min-h-screen font-sans transition-colors duration-500 ease-in-out pb-24 relative overflow-hidden
      ${isCrazy ? 'bg-[#050505] text-[#39ff14] selection:bg-[#ff00ff] selection:text-white' : 'bg-[#6cf56c] text-black selection:bg-black selection:text-[#ffff4d]'}
    `}>
      
      {/* --- STYLES --- */}
      <style>{`
        .bg-grain { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
        
        .hard-shadow { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
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

        @keyframes glitch-1 { 0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); } 100% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); } }
        @keyframes glitch-2 { 0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); } 100% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); } }
      `}</style>

      {/* Texture & Scanlines */}
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-40 z-0" />
      {isCrazy && <div className="fixed inset-0 scanlines z-[1] opacity-30" />}

      {/* READING PROGRESS BAR (Fixed Top) */}
      <div className="fixed top-0 left-0 z-[60] h-2 w-full bg-black">
        <div
          className={`h-full transition-colors duration-300 ${isCrazy ? 'bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]' : 'bg-[#ffff4d]'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* =========================================
          TOP NAVIGATION
      ========================================= */}
      <nav className="relative z-50 px-6 py-8 flex justify-between items-center">
        
        {/* LEFT GROUP */}
        <div className="flex items-center gap-4">
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
            Blog_V1.0
          </span>
        </div>

        {/* RIGHT GROUP: CRAZY TOGGLE + MENU */}
        <div className="flex gap-4">
          
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

      <main className="relative z-10 w-full pt-8 px-6 md:px-12">
        
        {/* HERO HEADER */}
        <section className="mx-auto w-full max-w-7xl mb-16">
          <div className={`
            border-4 p-6 md:p-12 transition-all duration-300
            ${isCrazy ? 'bg-black border-[#39ff14] text-[#39ff14] neon-shadow' : 'bg-white border-black hard-shadow text-black'}
          `}>
            
            {/* Meta Tags */}
            <div className="flex flex-wrap gap-3 mb-8 font-mono text-xs font-bold uppercase">
               <span className={`px-3 py-1 ${isCrazy ? 'bg-[#ff00ff] text-black' : 'bg-black text-white'}`}>Feb 2025</span>
               <span className={`border px-3 py-1 ${isCrazy ? 'bg-black text-[#00ffff] border-[#00ffff]' : 'bg-[#ffff4d] text-black border-black'}`}>Editorial</span>
               <span className={`border px-3 py-1 ${isCrazy ? 'bg-black text-[#39ff14] border-[#39ff14]' : 'bg-gray-200 text-black border-black'}`}>4 min read</span>
            </div>

            <h1 
              data-text="Balance: Camera & Code."
              className={`
                text-[8vw] md:text-[5vw] leading-[0.9] font-black uppercase mb-6
                ${isCrazy ? 'glitch-text text-[#39ff14]' : 'text-black'}
              `}
              style={{ fontFamily: '"Palette Mosaic", cursive' }}
            >
              Balance:<br/>
              Camera & Code.
            </h1>

            <p className={`text-xl md:text-2xl font-mono font-medium leading-relaxed max-w-3xl border-l-4 pl-6 ${isCrazy ? 'border-[#ff00ff] text-[#ff00ff]' : 'border-[#ffff4d] text-black'}`}>
              A personal note on how walking with a camera and sitting with code both teach me to slow down, notice details, and enjoy the process of getting unstuck.
            </p>
          </div>
        </section>

        {/* CONTENT LAYOUT */}
        <section className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            
            {/* ARTICLE COLUMN */}
            <article className="min-w-0 space-y-12">
              
              {/* 01. INTRO */}
              <section id="intro" className={`
                border-4 p-8 transition-all duration-300
                ${isCrazy ? 'bg-black border-[#ff00ff] neon-shadow text-[#ff00ff]' : 'bg-[#ffff4d] border-black hard-shadow text-black'}
              `}>
                <h2 className={`font-black text-2xl uppercase mb-6 border-b-4 inline-block ${isCrazy ? 'border-[#ff00ff]' : 'border-black'}`}>01. Intro</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    Most of my days are split between two quiet activities: carrying a camera on long walks and sitting at my desk solving problems in code. They may look different from the outside, but for me they are the same habit—<span className={`${isCrazy ? 'bg-[#39ff14] text-black' : 'bg-white text-black'} px-1`}>pay attention, explore a few angles, and slowly shape something that feels right.</span>
                  </p>
                  <p>
                    Photography trains my eye; coding trains my mind. Together, they keep me curious, patient, and comfortable with the feeling of not knowing the answer yet.
                  </p>
                </div>
              </section>

              {/* 02. PHOTOGRAPHY */}
              <section id="photography" className={`
                border-4 p-8 transition-all duration-300
                ${isCrazy ? 'bg-black border-[#39ff14] neon-shadow text-[#39ff14]' : 'bg-white border-black hard-shadow text-black'}
              `}>
                <h2 className={`font-black text-2xl uppercase mb-6 border-b-4 inline-block ${isCrazy ? 'border-[#39ff14]' : 'border-black'}`}>02. Photography</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    Photography is how I slow everything down. It forces me to notice small details—light on a wall, a reflection in a window, the way people move through a street.
                  </p>
                  
                  {/* Pull Quote */}
                  <div className={`p-6 my-8 rotate-1 border-2 text-center ${isCrazy ? 'bg-black text-[#ff00ff] border-[#ff00ff]' : 'bg-black text-[#ffff4d] border-[#ffff4d]'}`}>
                    <p className="font-bold text-xl uppercase">
                      "My favorite photos are rarely planned; they happen when I’m just paying attention."
                    </p>
                  </div>

                  <p>
                    I like working with natural light, quiet city corners, and empty spaces. It's not about "getting a shot" but just being present.
                  </p>
                </div>
              </section>

              {/* 03. CODING */}
              <section id="coding" className={`
                border-4 p-8 transition-all duration-300
                ${isCrazy ? 'bg-black border-[#00ffff] neon-shadow text-[#00ffff]' : 'bg-black border-black hard-shadow text-white'}
              `}>
                <h2 className={`font-black text-2xl uppercase mb-6 border-b-4 inline-block ${isCrazy ? 'text-[#00ffff] border-[#00ffff]' : 'text-[#ffff4d] border-[#ffff4d]'}`}>03. Code & LeetCode</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    When I’m not out taking photos, I’m usually in front of a keyboard. I regularly code on LeetCode—not just for a streak, but for that moment when a tricky problem finally clicks.
                  </p>
                  <p>
                    I treat each problem like a tiny design challenge: <span className={`${isCrazy ? 'bg-[#00ffff] text-black' : 'bg-[#ffff4d] text-black'} px-1`}>understand constraints, explore approaches, and write clean solutions.</span>
                  </p>
                  
                  <div className={`mt-6 border-2 border-dashed p-4 text-center ${isCrazy ? 'border-[#00ffff]' : 'border-[#ffff4d]'}`}>
                    <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">My Practice Arena</p>
                    <a href="https://leetcode.com/u/Hemachandra9899/" target="_blank" rel="noreferrer" className={`text-2xl font-bold hover:underline ${isCrazy ? 'text-[#00ffff]' : 'text-[#ffff4d]'}`}>
                      leetcode.com/u/Hemachandra9899 ↗
                    </a>
                  </div>
                </div>
              </section>

              {/* 04. WRAP UP */}
              <section id="wrap" className={`
                border-4 p-8 transition-all duration-300
                ${isCrazy ? 'bg-black border-[#ff00ff] neon-shadow text-[#ff00ff]' : 'bg-white border-black hard-shadow text-black'}
              `}>
                <h2 className={`font-black text-2xl uppercase mb-6 border-b-4 inline-block ${isCrazy ? 'border-[#ff00ff]' : 'border-black'}`}>04. Methodology</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    Both photography and coding remind me that good work doesn’t happen in a rush. It comes from paying attention, trying small ideas, and not giving up when something feels stuck.
                  </p>
                  <p>
                    Stay patient, stay curious, and keep improving one small step at a time.
                  </p>
                </div>

                <div className={`mt-12 pt-8 border-t-4 ${isCrazy ? 'border-[#ff00ff]' : 'border-black'}`}>
                   <p className="font-bold uppercase text-sm mb-4">Thanks for reading.</p>
                   <div className="flex gap-4">
                     <a href="https://leetcode.com/u/Hemachandra9899/" className={`px-4 py-2 font-mono font-bold border-2 transition-colors ${isCrazy ? 'bg-black text-[#39ff14] border-[#39ff14] hover:bg-[#39ff14] hover:text-black' : 'bg-black text-white border-black hover:bg-[#ffff4d] hover:text-black'}`}>
                       LEETCODE ↗
                     </a>
                     <a href="#intro" className={`px-4 py-2 font-mono font-bold border-2 transition-colors ${isCrazy ? 'bg-black text-[#ff00ff] border-[#ff00ff] hover:bg-[#ff00ff] hover:text-black' : 'bg-white text-black border-black hover:bg-black hover:text-white'}`}>
                       BACK TO TOP ↑
                     </a>
                   </div>
                </div>
              </section>

            </article>

            {/* SIDEBAR (Sticky Index Card) */}
            <aside className="hidden lg:block h-full">
              <div className="sticky top-24">
                <div className={`
                  border-4 p-6 transition-all duration-300 rotate-1
                  ${isCrazy ? 'bg-black border-[#39ff14] neon-shadow text-[#39ff14]' : 'bg-[#ffff4d] border-black hard-shadow text-black'}
                `}>
                  <h3 className={`font-black text-xl uppercase mb-4 border-b-2 pb-2 ${isCrazy ? 'border-[#39ff14]' : 'border-black'}`}>Index</h3>
                  <nav className="flex flex-col gap-2 font-mono font-bold text-sm">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`block py-2 px-2 transition-colors border-l-2 border-transparent ${isCrazy ? 'hover:bg-[#39ff14] hover:text-black hover:border-black' : 'hover:bg-black hover:text-[#ffff4d] hover:border-[#ffff4d]'}`}
                      >
                        {s.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className={`
                  mt-8 border-4 p-6 transition-all duration-300 -rotate-1
                  ${isCrazy ? 'bg-black border-[#00ffff] neon-shadow text-[#00ffff]' : 'bg-black border-black hard-shadow text-white'}
                `}>
                  <h3 className={`font-black text-xl uppercase mb-4 ${isCrazy ? 'text-[#00ffff]' : 'text-[#ffff4d]'}`}>Share</h3>
                  <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigator.clipboard?.writeText(window.location.href)}
                        className={`font-mono font-bold py-2 border-2 border-transparent transition-colors ${isCrazy ? 'bg-transparent text-[#00ffff] hover:border-[#00ffff]' : 'bg-white text-black hover:border-[#ffff4d] hover:bg-transparent hover:text-white'}`}
                      >
                        COPY LINK
                      </button>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </section>

        {/* FOOTER */}
        <footer className={`mt-24 border-t-4 pt-8 text-center font-mono font-bold text-sm uppercase ${isCrazy ? 'border-[#39ff14] text-[#39ff14]' : 'border-black text-black'}`}>
          <p>© 2025 Hemachandra Reddy // Built with code & curiosity.</p>
        </footer>

      </main>
    </div>
  );
};

export default Blog;