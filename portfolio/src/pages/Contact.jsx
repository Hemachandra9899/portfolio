import { Link } from "react-router-dom";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-[#6cf56c] text-black font-sans selection:bg-black selection:text-[#ffff4d] pb-20">
      
      {/* --- STYLES --- */}
      <style>{`
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .hard-shadow { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
        .hard-shadow-hover:hover {
          transform: translate(-4px, -4px);
          box-shadow: 12px 12px 0px 0px rgba(0,0,0,1);
        }
      `}</style>

      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-40 z-0" />

      {/* --- NAVIGATION --- */}
      <nav className="relative z-20 px-6 py-8 flex justify-between items-center">
        <Link to="/" className="group">
          <button className="bg-black text-[#ffff4d] border-2 border-black px-6 py-2 font-mono font-bold uppercase tracking-widest hard-shadow hover:bg-white hover:text-black transition-all">
            ← Back Home
          </button>
        </Link>
        <span className="font-['Palette_Mosaic'] text-2xl md:text-3xl uppercase tracking-widest hidden md:block">
          Contact_V1.0
        </span>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* 1. HERO TITLE */}
        <header className="mb-16">
          <h1 
            className="text-[14vw] md:text-[11vw] leading-[0.85] font-black uppercase text-[#ffff4d] mix-blend-hard-light"
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: '4px 4px 0px #000',
              WebkitTextStroke: '2px black'
            }}
          >
            Say<br/>Hello.
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* 2. LEFT COLUMN: INTRO TEXT (Terminal Style) */}
          <div className="space-y-12">
            <div className="bg-black text-[#ffff4d] p-6 md:p-10 border-4 border-black hard-shadow rotate-1">
              <div className="font-mono text-sm opacity-50 mb-4 border-b border-[#ffff4d]/30 pb-2">
                /// MESSAGE_FROM_HEMACHANDRA.TXT
              </div>
              <p className="text-xl md:text-3xl font-bold leading-tight font-mono">
                <span className="text-white mr-2">&gt;</span>
                Let’s build something thoughtful, clear, and useful.
              </p>
              <br />
              <p className="text-lg md:text-xl font-mono opacity-80">
                I’m always open to chatting about new projects, roles, collaborations, or anything related to software, design, and engineering.
              </p>
              <div className="mt-6 inline-block bg-[#ffff4d] text-black px-2 py-1 font-mono text-sm font-bold">
                STATUS: OPEN_TO_WORK
              </div>
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-4 font-mono font-bold text-lg">
              <span className="animate-pulse w-4 h-4 bg-red-500 rounded-full border-2 border-black"></span>
              BASED IN INDIA · REMOTE READY
            </div>
          </div>

          {/* 3. RIGHT COLUMN: CONTACT LINKS */}
          <div className="space-y-6">
            
            <p className="font-['Palette_Mosaic'] text-2xl uppercase border-b-4 border-black inline-block mb-2">
              Direct_Line
            </p>

            {/* EMAIL (The Big Button) */}
            <a 
              href="mailto:pottingari@gmail.com"
              className="group block bg-white border-4 border-black p-6 hard-shadow transition-all duration-300 hover:bg-[#ffff4d] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="block text-xs font-mono font-bold uppercase text-gray-500 mb-1 group-hover:text-black">
                Email Me
              </span>
              <span className="block text-xl md:text-3xl font-black uppercase break-all">
                pottingari@gmail.com
              </span>
            </a>

            {/* PHONE */}
            <div className="bg-white border-4 border-black p-6 hard-shadow">
              <span className="block text-xs font-mono font-bold uppercase text-gray-500 mb-1">
                Phone
              </span>
              <span className="block text-xl md:text-2xl font-black uppercase font-mono">
                +91 63059 84164
              </span>
            </div>

            {/* SOCIAL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <ContactLink 
                label="LinkedIn" 
                value="Hemachandra Reddy" 
                href="https://www.linkedin.com/in/hemachandra-reddy/" 
                icon="↗"
              />
              <ContactLink 
                label="GitHub" 
                value="@Chandra9899" 
                href="https://github.com/Hemachandra9899" 
                icon="↗"
              />
              <ContactLink 
                label="LeetCode" 
                value="Problem Solving" 
                href="https://leetcode.com/u/Hemachandra9899/" 
                icon="↗"
              />
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-24 border-t-4 border-black pt-8 pb-12 font-mono font-bold text-sm uppercase flex justify-center">
          <span>This Is The End.</span>
        </footer>

      </main>
    </div>
  );
};

// Helper Component for the smaller links
const ContactLink = ({ label, value, href, icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noreferrer"
    className="
      block bg-black text-white border-4 border-black p-4 
      transition-all duration-300
      hover:bg-[#ffff4d] hover:text-black
    "
  >
    <div className="flex justify-between items-start">
      <span className="text-xs font-mono font-bold uppercase opacity-70">
        {label}
      </span>
      <span className="font-mono">{icon}</span>
    </div>
    <div className="mt-2 font-bold text-lg truncate">
      {value}
    </div>
  </a>
);

export default Contact;