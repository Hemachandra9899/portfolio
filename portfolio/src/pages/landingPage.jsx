import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import sparkIcon from "../assets/si.svg";

// Change this to your backend endpoint
const BACKEND_URL = "https://portfolio-bacckend.onrender.com/api/getnotes";

export const LandingPage = () => {
  // =========================================
  // 1. STATE MANAGEMENT
  // =========================================
  
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Crazy Mode State (With Local Storage Persistence) ---
  const [isCrazy, setIsCrazy] = useState(() => {
    // 1. Check local storage on initial load
    const savedMode = localStorage.getItem("portfolio_crazy_mode");
    return savedMode === "true";
  });

  // 2. Update local storage whenever isCrazy changes
  useEffect(() => {
    localStorage.setItem("portfolio_crazy_mode", isCrazy);
  }, [isCrazy]);

  // --- Chat / AI State ---
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "HELLO! I'M HEMACHANDRA. 👋 ASK ME ANYTHING ABOUT MY CODE, DESIGN, OR FAVORITE SNACKS.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // =========================================
  // 2. CONFIGURATION
  // =========================================

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Me", path: "/about" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
  ];

  // =========================================
  // 3. EFFECTS
  // =========================================

  useEffect(() => {
    if (!isChatOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [isChatOpen]);

  useEffect(() => {
    if (!isChatOpen) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isChatOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsChatOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // =========================================
  // 4. HANDLERS
  // =========================================
  
  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { id: Date.now(), sender: "user", text: trimmed.toUpperCase() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}?query=${encodeURIComponent(trimmed)}`, { method: "GET" });
      if (!res.ok) throw new Error("Request failed");

      const contentType = res.headers.get("content-type") || "";
      let botText;

      if (contentType.includes("application/json")) {
        const data = await res.json();
        botText = data.reply || data.answer || "NO RESPONSE RECEIVED.";
      } else {
        botText = await res.text();
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: botText.toUpperCase() }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { id: Date.now() + 2, sender: "bot", text: "ERROR 404: BRAIN NOT FOUND. TRY AGAIN." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // =========================================
  // 5. RENDER
  // =========================================
  return (
    // DYNAMIC CONTAINER CLASS based on 'isCrazy'
    <div className={`
      relative min-h-screen overflow-hidden font-sans transition-colors duration-500 ease-in-out
      ${isCrazy ? 'bg-[#050505] text-[#39ff14] selection:bg-[#ff00ff] selection:text-white' : 'bg-[#6cf56c] text-black selection:bg-black selection:text-[#ffff4d]'}
    `}>
      
      {/* --- CSS MAGIC FOR CRAZY MODE --- */}
      <style>{`
        /* Standard Grain */
        .bg-grain { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
        
        /* CRAZY: CRT Scanline Effect */
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.2)
          );
          background-size: 100% 4px;
          animation: scanline 0.2s linear infinite;
          pointer-events: none;
        }

        /* CRAZY: Glitch Animation for Text */
        .glitch-text {
          position: relative;
          color: #39ff14;
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          color: #ff00ff;
          z-index: -1;
          animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          color: #00ffff;
          z-index: -2;
          animation: glitch-anim-2 0.4s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
        }

        /* Animations */
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 20s linear infinite; }
        .animate-scroll-fast { animation: scroll 5s linear infinite; } /* CRAZY SPEED */
        
        .hard-shadow { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
        .neon-shadow { box-shadow: 0px 0px 10px 2px #39ff14, 4px 4px 0px 0px #ff00ff; } /* CRAZY SHADOW */
      `}</style>

      {/* Background Texture (Plus Scanlines if Crazy) */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 z-0" />
      {isCrazy && <div className="absolute inset-0 scanlines z-[1] opacity-30" />}

      {/* =========================================
          TOP NAVIGATION
      ========================================= */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between pointer-events-none">
        
        {/* LOGO */}
        <button onClick={() => navigate('/')} className="pointer-events-auto group">
          <span 
            className={`
              text-3xl md:text-4xl font-black uppercase tracking-tighter transition-transform duration-300 group-hover:scale-110 inline-block
              ${isCrazy ? 'text-[#ff00ff] drop-shadow-[2px_2px_0px_#00ffff]' : 'text-[#ffff4d] text-shadow-[3px_3px_0px_#000]'}
            `}
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              WebkitTextStroke: isCrazy ? '1px #39ff14' : '1px black'
            }}
          >
            HC
          </span>
        </button>

        {/* RIGHT SIDE: CRAZY TOGGLE + MENU */}
        <div className="flex gap-4 pointer-events-auto">
          
          {/* CRAZY MODE TOGGLE */}
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
              border-2 px-4 py-2 md:px-6 md:py-3 font-bold font-mono uppercase tracking-widest text-xs md:text-sm transition-all duration-200
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
          fixed inset-0 z-[60]
          flex flex-col
          transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1)
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
              {/* Crazy Mode: Neon Glitch Hover / Normal: Slide Black */}
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

      {/* --- HERO CONTENT --- */}
      <main className="relative z-10 px-6 md:px-12 pt-32 md:pt-44 flex flex-col justify-center min-h-[85vh]">
        <div className="max-w-7xl">
          <h1 
            // CRAZY MODE: Adds 'glitch-text' class and data-text for the effect
            data-text="HemaChandra"
            className={`
              text-[14vw] md:text-[11vw] leading-[0.85] font-black uppercase transition-colors duration-300
              ${isCrazy ? 'glitch-text text-[#39ff14] drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]' : 'text-[#ffff4d]'}
            `}
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: isCrazy ? 'none' : '6px 6px 0px #000', 
              WebkitTextStroke: isCrazy ? 'none' : '3px black'
            }}
          >
            Hema<br/>Chandra
          </h1>
        </div>

        {/* ABOUT CARD */}
        <div className="mt-8 md:mt-12 max-w-xl mb-32 md:mb-0">
          <div className={`
            border-4 p-5 md:p-6 transition-all duration-300
            ${isCrazy 
              ? 'bg-black/50 border-[#39ff14] text-[#39ff14] neon-shadow backdrop-blur-md rotate-0 hover:-rotate-1' 
              : 'bg-white border-black hard-shadow rotate-1 hover:rotate-0'
            }
          `}>
            <h2 className={`
              text-xl md:text-2xl font-bold uppercase tracking-tighter mb-3 inline-block px-2
              ${isCrazy ? 'bg-[#ff00ff] text-white' : 'bg-black text-white'}
            `}>
              Software Engineer
            </h2>
            <p className="text-base md:text-lg font-bold leading-relaxed font-mono">
              I build <span className={`${isCrazy ? 'bg-[#39ff14] text-black' : 'bg-[#ffff4d]'} px-1 border border-black`}>empathetic software</span> grounded in research. 
              Focused on solving meaningful problems.
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
              <a href="https://github.com/Hemachandra9899" target="_blank" rel="noreferrer" className={`px-5 py-2 font-bold uppercase border-2 transition-colors text-sm ${isCrazy ? 'bg-transparent text-[#00ffff] border-[#00ffff] hover:bg-[#00ffff] hover:text-black' : 'bg-black text-white border-transparent hover:bg-white hover:text-black hover:border-black hard-shadow-sm'}`}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/hemachandra-reddy" target="_blank" rel="noreferrer" className={`px-5 py-2 font-bold uppercase border-2 transition-colors text-sm ${isCrazy ? 'bg-transparent text-[#ff00ff] border-[#ff00ff] hover:bg-[#ff00ff] hover:text-white' : 'bg-[#005AFF] text-white border-black hover:bg-white hover:text-[#005AFF] hard-shadow-sm'}`}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* --- MARQUEE --- */}
      <div className={`
        fixed bottom-0 left-0 w-full border-t-4 py-3 z-20 overflow-hidden whitespace-nowrap
        ${isCrazy ? 'bg-black border-[#ff00ff]' : 'bg-black border-black'}
      `}>
        {/* Crazy Mode Speeds up animation to 'animate-scroll-fast' */}
        <div className={`inline-block ${isCrazy ? 'animate-scroll-fast' : 'animate-scroll'}`}>
          <span className={`font-mono text-xl md:text-2xl font-bold mx-4 ${isCrazy ? 'text-[#ff00ff]' : 'text-[#ffff4d]'}`}>OPEN FOR WORK /// FULL STACK DEV /// REACT WIZARD /// </span>
          <span className={`font-mono text-xl md:text-2xl font-bold mx-4 ${isCrazy ? 'text-[#00ffff]' : 'text-[#ffff4d]'}`}>OPEN FOR WORK /// FULL STACK DEV /// REACT WIZARD /// </span>
          <span className={`font-mono text-xl md:text-2xl font-bold mx-4 ${isCrazy ? 'text-[#39ff14]' : 'text-[#ffff4d]'}`}>OPEN FOR WORK /// FULL STACK DEV /// REACT WIZARD /// </span>
        </div>
      </div>

      {/* --- CHAT BUTTON --- */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-6 md:bottom-28 md:right-16 z-40 group"
          aria-label="Open Chat"
        >
          <div className={`
            relative w-20 h-20 md:w-24 md:h-24 border-4 rounded-full flex items-center justify-center transition-transform duration-200 hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0.5 active:translate-x-0.5
            ${isCrazy 
              ? 'bg-black border-[#39ff14] shadow-[0_0_20px_#39ff14] hover:shadow-[0_0_40px_#ff00ff]' 
              : 'bg-[#ffff4d] border-black hard-shadow'
            }
          `}>
            <img 
              src={sparkIcon} 
              alt="AI" 
              className={`w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:rotate-12 ${isCrazy && 'invert hue-rotate-180'}`} 
            />
            <div className={`
              absolute -top-4 -left-10 border-2 px-3 py-1 text-xs font-bold uppercase rotate-[-6deg]
              ${isCrazy ? 'bg-black text-[#00ffff] border-[#00ffff]' : 'bg-white text-black border-black'}
            `}>
              Talk to AI
            </div>
          </div>
        </button>
      )}

      {/* --- CHAT DRAWER --- */}
      <div className={`fixed inset-0 z-[100] ${isChatOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div 
          onClick={() => setIsChatOpen(false)}
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${isChatOpen ? 'opacity-100' : 'opacity-0'} ${isCrazy ? 'bg-[#39ff14]/10' : 'bg-black/60'}`}
        />

        <div className={`
          absolute bottom-0 left-0 w-full md:max-w-2xl md:left-1/2 md:-translate-x-1/2
          border-t-4 border-x-4 
          flex flex-col
          transition-transform duration-500 ease-in-out
          ${isChatOpen ? "translate-y-0" : "translate-y-[120%]"}
          h-[80vh] md:h-[85vh]
          rounded-t-3xl shadow-2xl
          ${isCrazy ? 'bg-black border-[#ff00ff] shadow-[0_-10px_40px_rgba(255,0,255,0.4)]' : 'bg-[#ffff4d] border-black'}
        `}>
          
          <div className={`px-6 py-4 flex justify-between items-center rounded-t-[20px] ${isCrazy ? 'bg-[#ff00ff] text-black' : 'bg-black text-[#ffff4d]'}`}>
            <h3 className="font-['Palette_Mosaic'] text-2xl uppercase tracking-widest">
              My_AI.exe
            </h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className={`font-mono text-xl font-bold ${isCrazy ? 'text-white hover:text-black' : 'text-[#ffff4d] hover:text-white'}`}
            >
              [X] CLOSE
            </button>
          </div>

          <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${isCrazy ? 'bg-black' : 'bg-[#ffff4d]'}`}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`
                  max-w-[85%] p-4 border-4 font-mono font-bold text-sm md:text-base
                  ${isCrazy 
                    ? (msg.sender === "user" ? 'bg-[#39ff14] text-black border-[#39ff14]' : 'bg-black text-[#ff00ff] border-[#ff00ff]') 
                    : (msg.sender === "user" ? 'bg-white text-black border-black hard-shadow-sm' : 'bg-black text-[#ffff4d] border-black')
                  }
                  rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl
                `}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className={`p-4 border-4 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl font-mono font-bold ${isCrazy ? 'bg-black text-[#00ffff] border-[#00ffff]' : 'bg-black text-[#ffff4d] border-black'}`}>
                  PROCESSING... <span className="animate-pulse">_</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={`p-6 border-t-4 ${isCrazy ? 'bg-black border-[#ff00ff]' : 'bg-[#ffff4d] border-black'}`}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="TYPE HERE..."
                className={`flex-1 border-4 p-4 font-mono font-bold uppercase focus:outline-none ${isCrazy ? 'bg-black text-[#39ff14] border-[#39ff14] placeholder-[#39ff14]/50' : 'bg-white border-black text-black placeholder-gray-400'}`}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`px-6 border-4 font-bold uppercase transition-colors ${isCrazy ? 'bg-[#39ff14] text-black border-[#39ff14] hover:bg-white' : 'bg-black text-[#ffff4d] border-black hover:bg-white hover:text-black'}`}
              >
                SEND
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};