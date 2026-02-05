import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="min-h-screen bg-[#6cf56c] text-black font-sans selection:bg-black selection:text-[#ffff4d] pb-20">
      
      {/* --- STYLES --- */}
      <style>{`
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .hard-shadow { box-shadow: 6px 6px 0px 0px rgba(0,0,0,1); }
        .hard-shadow-hover:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
        }
      `}</style>

      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-40 z-0" />

      {/* --- NAVIGATION (Replacing Header) --- */}
      <nav className="relative z-20 px-6 py-8 flex justify-between items-center">
        <Link to="/" className="group">
          <button className="bg-black text-[#ffff4d] border-2 border-black px-6 py-2 font-mono font-bold uppercase tracking-widest hard-shadow hover:bg-white hover:text-black transition-all">
            ← Back Home
          </button>
        </Link>
        <span className="font-['Palette_Mosaic'] text-2xl md:text-3xl uppercase tracking-widest hidden md:block">
          Profile_V1.0
        </span>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* 1. HERO TITLE */}
        <header className="mb-16">
          <h1 
            className="text-[12vw] md:text-[8vw] leading-[0.85] font-black uppercase text-[#ffff4d] mix-blend-hard-light"
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: '4px 4px 0px #000',
              WebkitTextStroke: '2px black'
            }}
          >
            About<br/>Me.
          </h1>
        </header>

        {/* 2. INTRO "STICKY NOTE" */}
        <section className="mb-20">
          <div className="bg-white border-4 border-black p-6 md:p-10 max-w-4xl rotate-1 hard-shadow">
            <p className="text-2xl md:text-4xl font-bold leading-tight uppercase font-mono">
              I’m an entry-level software developer who enjoys building <span className="bg-[#ffff4d] px-2">reliable</span>, high-performance products.
            </p>
            <div className="mt-6 text-lg md:text-xl font-medium font-mono text-gray-800 space-y-4 border-t-2 border-black pt-6 border-dashed">
              <p>
                /// WORKING ON: REST APIs, Databases, Microservices (Rust, Node.js).
              </p>
              <p>
                /// BUILDING UI: React + Tailwind.
              </p>
              <p>
                /// LOCATION: Hyderabad, India.
              </p>
            </div>
            
            {/* Contact Links */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:pottingari@gmail.com" className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-[#ffff4d] hover:text-black border-2 border-black transition-colors">
                EMAIL ME
              </a>
              <a href="https://www.linkedin.com/in/hemachandra-reddy/" target="_blank" rel="noreferrer" className="bg-[#0077B5] text-white px-4 py-2 font-mono text-sm hover:bg-white hover:text-[#0077B5] border-2 border-black transition-colors">
                LINKEDIN
              </a>
              <a href="https://github.com/Hemachandra9899" target="_blank" rel="noreferrer" className="bg-gray-800 text-white px-4 py-2 font-mono text-sm hover:bg-white hover:text-black border-2 border-black transition-colors">
                GITHUB
              </a>
            </div>
          </div>
        </section>

        {/* 3. BENTO GRID LAYOUT */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CARD: EXPERIENCE */}
          <div className="bg-[#ffff4d] border-4 border-black p-6 hard-shadow flex flex-col h-full">
            <h3 className="font-['Palette_Mosaic'] text-2xl uppercase mb-4 border-b-4 border-black pb-2">
              Experience
            </h3>
            <div className="font-mono flex-1">
              <div className="mb-4">
                <h4 className="font-black text-lg">SDET INTERN</h4>
                <p className="text-sm font-bold opacity-75">CodeNebula • Remote</p>
                <p className="text-xs mb-2">Jul 2024 – Dec 2024</p>
                <p className="text-sm leading-relaxed border-l-2 border-black pl-3">
                  Built a Web3 platform with React & Rust. Shipped REST APIs, CI/CD pipelines, and maintained 95%+ test coverage.
                </p>
              </div>
            </div>
          </div>

          {/* CARD: SKILLS (Black Theme) */}
          <div className="bg-black text-[#ffff4d] border-4 border-black p-6 hard-shadow flex flex-col h-full">
            <h3 className="font-['Palette_Mosaic'] text-2xl uppercase mb-4 border-b-2 border-[#ffff4d] pb-2">
              Tech_Stack
            </h3>
            <ul className="font-mono text-sm space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ffff4d]"></span> Rust / C++ / Python
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ffff4d]"></span> React / Node.js / Express
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ffff4d]"></span> Docker / Microservices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ffff4d]"></span> MySQL / MongoDB / Kafka
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ffff4d]"></span> GitHub Actions / Figma
              </li>
            </ul>
          </div>

          {/* CARD: PROJECTS */}
          <div className="bg-white border-4 border-black p-6 hard-shadow flex flex-col h-full">
             <h3 className="font-['Palette_Mosaic'] text-2xl uppercase mb-4 border-b-4 border-black pb-2">
              Projects
            </h3>
            <div className="space-y-6 font-mono">
              <div>
                <h4 className="font-black text-lg uppercase">SecondBrain</h4>
                <span className="text-xs bg-black text-white px-1">RAG AI Assistant</span>
                <p className="text-sm mt-2">
                  Personal AI assistant using RAG + Pinecone. React UI + Node.js backend.
                </p>
              </div>
              <div className="border-t-2 border-dashed border-black pt-4">
                <h4 className="font-black text-lg uppercase">Fraud Detection</h4>
                <span className="text-xs bg-black text-white px-1">ML Model</span>
                <p className="text-sm mt-2">
                  Random Forest model with ~92% accuracy for credit card fraud detection.
                </p>
              </div>
            </div>
          </div>

          {/* CARD: EDUCATION (Spans 2 cols on large screens) */}
          <div className="bg-[#6cf56c] border-4 border-black p-6 hard-shadow md:col-span-2 lg:col-span-3 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h3 className="font-['Palette_Mosaic'] text-2xl uppercase mb-2">
                Education
              </h3>
              <p className="font-mono font-bold text-lg">
                Sreenidhi Institute of Science and Technology
              </p>
              <p className="font-mono text-sm">
                B.Tech (Information Technology) • CGPA 7.14/10 • 2021 – Present
              </p>
            </div>
            
            {/* Certifications Badge */}
            <div className="bg-white border-2 border-black p-4 rotate-2 md:rotate-0">
               <h4 className="font-black font-mono text-sm uppercase mb-2 border-b-2 border-black">Certifications</h4>
               <ul className="text-xs font-mono space-y-1">
                 <li>• UX Design Process (Coursera)</li>
                 <li>• 160 Days of Problem Solving (GfG)</li>
               </ul>
            </div>
          </div>

        </section>

        {/* FOOTER */}
        <footer className="mt-20 border-t-4 border-black pt-8 pb-12 font-mono font-bold text-sm uppercase flex justify-between">
          <span>© 2025 Hemachandra Reddy</span>
          <span>Status: Available for Work</span>
        </footer>

      </main>
    </div>
  );
};