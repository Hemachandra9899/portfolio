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
    <div className="relative min-h-screen bg-[#6cf56c] text-black overflow-hidden font-sans selection:bg-black selection:text-[#ffff4d]">
      
      {/* --- STYLES --- */}
      <style>{`
        .bg-grain { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 20s linear infinite; }
        .hard-shadow { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
        .hard-shadow-sm { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
      `}</style>

      {/* Background Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 z-0" />

      {/* =========================================
          TOP NAVIGATION (Menu Button Only)
          FIX: Removed 'mix-blend-exclusion' and ensured z-index: 50
      ========================================= */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between pointer-events-none">
        
        {/* LOGO */}
        <button onClick={() => navigate('/')} className="pointer-events-auto group">
          <span 
            className="text-3xl md:text-4xl font-black text-[#ffff4d] uppercase tracking-tighter transition-transform duration-300 group-hover:scale-110 inline-block"
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: '3px 3px 0px #000', // Increased shadow for visibility
              WebkitTextStroke: '1px black'   // Added outline for visibility against content
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
          FULLSCREEN MENU OVERLAY (No Footer)
          z-index: 60 (Higher than Nav)
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

      {/* --- HERO CONTENT --- 
          z-index: 10 (Lower than Nav)
      */}
      <main className="relative z-10 px-6 md:px-12 pt-32 md:pt-44 flex flex-col justify-center min-h-[85vh]">
        <div className="max-w-7xl">
          <h1 
            className="text-[14vw] md:text-[11vw] leading-[0.85] font-black uppercase text-[#ffff4d]"
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: '6px 6px 0px #000',
              WebkitTextStroke: '3px black'
            }}
          >
            Hemachandra Reddy.
          </h1>
        </div>

        {/* ABOUT CARD (Smaller Version)
            Changes: 
            - max-w-2xl -> max-w-xl
            - p-6 md:p-8 -> p-5 md:p-6
            - Text sizes reduced slightly
        */}
        <div className="mt-8 md:mt-12 max-w-xl mb-32 md:mb-0">
          <div className="bg-white border-4 border-black p-5 md:p-6 hard-shadow rotate-1 hover:rotate-0 transition-transform duration-300">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-3 bg-black text-white inline-block px-2">
              Software Engineer
            </h2>
            <p className="text-base md:text-lg font-bold leading-relaxed font-mono">
              I build <span className="bg-[#ffff4d] px-1 border border-black">empathetic software</span> grounded in research. 
              Focused on solving meaningful problems with clarity and code.
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
              <a href="https://github.com/Hemachandra9899" target="_blank" rel="noreferrer" className="bg-black text-white px-5 py-2 font-bold uppercase border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors hard-shadow-sm text-sm">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/hemachandra-reddy" target="_blank" rel="noreferrer" className="bg-[#005AFF] text-white px-5 py-2 font-bold uppercase border-2 border-black hover:bg-white hover:text-[#005AFF] transition-colors hard-shadow-sm text-sm">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* --- MARQUEE --- 
          z-index: 20 (Higher than Content, Lower than Chat)
      */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-black py-3 z-20 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-scroll">
          <span className="text-[#ffff4d] font-mono text-xl md:text-2xl font-bold mx-4">
            OPEN FOR WORK /// FULL STACK DEV /// REACT WIZARD /// LET'S BUILD SOMETHING COOL /// 
          </span>
          <span className="text-[#ffff4d] font-mono text-xl md:text-2xl font-bold mx-4">
            OPEN FOR WORK /// FULL STACK DEV /// REACT WIZARD /// LET'S BUILD SOMETHING COOL /// 
          </span>
           <span className="text-[#ffff4d] font-mono text-xl md:text-2xl font-bold mx-4">
            OPEN FOR WORK /// FULL STACK DEV /// REACT WIZARD /// LET'S BUILD SOMETHING COOL /// 
          </span>
        </div>
      </div>

      {/* --- CHAT BUTTON --- 
          z-index: 40
      */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-6 md:bottom-28 md:right-16 z-40 group"
          aria-label="Open Chat"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#ffff4d] border-4 border-black rounded-full flex items-center justify-center hard-shadow transition-transform duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none">
            <img 
              src={sparkIcon} 
              alt="AI" 
              className="w-10 h-10 md:w-12 md:h-12 group-hover:rotate-12 transition-transform duration-300"
            />
            <div className="absolute -top-4 -left-10 bg-white border-2 border-black px-3 py-1 text-xs font-bold uppercase rotate-[-6deg]">
              Talk to AI
            </div>
          </div>
        </button>
      )}

      {/* --- CHAT DRAWER --- 
          z-index: 100
      */}
      <div className={`fixed inset-0 z-[100] ${isChatOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div 
          onClick={() => setIsChatOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isChatOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className={`
          absolute bottom-0 left-0 w-full md:max-w-2xl md:left-1/2 md:-translate-x-1/2
          bg-[#ffff4d] border-t-4 border-x-4 border-black
          flex flex-col
          transition-transform duration-500 ease-in-out
          ${isChatOpen ? "translate-y-0" : "translate-y-[120%]"}
          h-[80vh] md:h-[85vh]
          rounded-t-3xl shadow-2xl
        `}>
          
          <div className="bg-black text-[#ffff4d] px-6 py-4 flex justify-between items-center rounded-t-[20px]">
            <h3 className="font-['Palette_Mosaic'] text-2xl uppercase tracking-widest">
              My_AI.exe
            </h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-[#ffff4d] hover:text-white font-mono text-xl font-bold"
            >
              [X] CLOSE
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#ffff4d]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`
                  max-w-[85%] p-4 border-4 border-black font-mono font-bold text-sm md:text-base hard-shadow-sm
                  ${msg.sender === "user" 
                    ? "bg-white text-black rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl" 
                    : "bg-black text-[#ffff4d] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black text-[#ffff4d] p-4 border-4 border-black rounded-tr-2xl rounded-bl-2xl rounded-br-2xl font-mono font-bold">
                  PROCESSING... <span className="animate-pulse">_</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-6 bg-[#ffff4d] border-t-4 border-black">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="TYPE HERE..."
                className="flex-1 bg-white border-4 border-black p-4 font-mono font-bold uppercase placeholder-gray-400 focus:outline-none focus:bg-[#f0f0f0]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-black text-[#ffff4d] px-6 border-4 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase"
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