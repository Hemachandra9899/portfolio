import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export const Blog = () => {
  const [progress, setProgress] = useState(0);

  const sections = useMemo(
    () => [
      { id: "intro", label: "01. Intro" },
      { id: "photography", label: "02. Photography" },
      { id: "coding", label: "03. Code & LeetCode" },
      { id: "wrap", label: "04. Methodology" },
    ],
    []
  );

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
    <div className="min-h-screen bg-[#6cf56c] text-black font-sans selection:bg-black selection:text-[#ffff4d] pb-24">
      
      {/* --- STYLES --- */}
      <style>{`
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .hard-shadow { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
      `}</style>

      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-40 z-0" />

      {/* READING PROGRESS BAR (Fixed Top) */}
      <div className="fixed top-0 left-0 z-[60] h-2 w-full bg-black">
        <div
          className="h-full bg-[#ffff4d]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="relative z-20 px-6 py-8 flex justify-between items-center">
        <Link to="/" className="group">
          <button className="bg-black text-[#ffff4d] border-2 border-black px-6 py-2 font-mono font-bold uppercase tracking-widest hard-shadow hover:bg-white hover:text-black transition-all">
            ← Back Home
          </button>
        </Link>
        <span className="font-['Palette_Mosaic'] text-2xl md:text-3xl uppercase tracking-widest hidden md:block">
          Blog_V1.0
        </span>
      </nav>

      <main className="relative z-10 w-full pt-8 px-6 md:px-12">
        
        {/* HERO HEADER */}
        <section className="mx-auto w-full max-w-7xl mb-16">
          <div className="border-4 border-black bg-white p-6 md:p-12 hard-shadow">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap gap-3 mb-8 font-mono text-xs font-bold uppercase">
               <span className="bg-black text-white px-3 py-1">Feb 2025</span>
               <span className="bg-[#ffff4d] text-black border border-black px-3 py-1">Editorial</span>
               <span className="bg-gray-200 text-black border border-black px-3 py-1">4 min read</span>
            </div>

            <h1 
              className="text-[8vw] md:text-[5vw] leading-[0.9] font-black uppercase text-black mb-6"
              style={{ fontFamily: '"Palette Mosaic", cursive' }}
            >
              Balance:<br/>
              Camera & Code.
            </h1>

            <p className="text-xl md:text-2xl font-mono font-medium leading-relaxed max-w-3xl border-l-4 border-[#ffff4d] pl-6">
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
              <section id="intro" className="bg-[#ffff4d] border-4 border-black p-8 hard-shadow">
                <h2 className="font-black text-2xl uppercase mb-6 border-b-4 border-black inline-block">01. Intro</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    Most of my days are split between two quiet activities: carrying a camera on long walks and sitting at my desk solving problems in code. They may look different from the outside, but for me they are the same habit—<span className="bg-white px-1">pay attention, explore a few angles, and slowly shape something that feels right.</span>
                  </p>
                  <p>
                    Photography trains my eye; coding trains my mind. Together, they keep me curious, patient, and comfortable with the feeling of not knowing the answer yet.
                  </p>
                </div>
              </section>

              {/* 02. PHOTOGRAPHY */}
              <section id="photography" className="bg-white border-4 border-black p-8 hard-shadow">
                <h2 className="font-black text-2xl uppercase mb-6 border-b-4 border-black inline-block">02. Photography</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    Photography is how I slow everything down. It forces me to notice small details—light on a wall, a reflection in a window, the way people move through a street.
                  </p>
                  
                  {/* Pull Quote */}
                  <div className="bg-black text-[#ffff4d] p-6 my-8 rotate-1 border-2 border-[#ffff4d]">
                    <p className="font-bold text-xl uppercase text-center">
                      "My favorite photos are rarely planned; they happen when I’m just paying attention."
                    </p>
                  </div>

                  <p>
                    I like working with natural light, quiet city corners, and empty spaces. It's not about "getting a shot" but just being present.
                  </p>
                </div>
              </section>

              {/* 03. CODING */}
              <section id="coding" className="bg-black text-white border-4 border-black p-8 hard-shadow">
                <h2 className="font-black text-2xl uppercase mb-6 text-[#ffff4d] border-b-4 border-[#ffff4d] inline-block">03. Code & LeetCode</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    When I’m not out taking photos, I’m usually in front of a keyboard. I regularly code on LeetCode—not just for a streak, but for that moment when a tricky problem finally clicks.
                  </p>
                  <p>
                    I treat each problem like a tiny design challenge: <span className="bg-[#ffff4d] text-black px-1">understand constraints, explore approaches, and write clean solutions.</span>
                  </p>
                  
                  <div className="mt-6 border-2 border-[#ffff4d] border-dashed p-4 text-center">
                    <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">My Practice Arena</p>
                    <a href="https://leetcode.com/u/Hemachandra9899/" target="_blank" rel="noreferrer" className="text-[#ffff4d] text-2xl font-bold hover:underline">
                      leetcode.com/u/Hemachandra9899 ↗
                    </a>
                  </div>
                </div>
              </section>

              {/* 04. WRAP UP */}
              <section id="wrap" className="bg-white border-4 border-black p-8 hard-shadow">
                <h2 className="font-black text-2xl uppercase mb-6 border-b-4 border-black inline-block">04. Methodology</h2>
                <div className="font-mono text-lg md:text-xl leading-relaxed space-y-6">
                  <p>
                    Both photography and coding remind me that good work doesn’t happen in a rush. It comes from paying attention, trying small ideas, and not giving up when something feels stuck.
                  </p>
                  <p>
                    Stay patient, stay curious, and keep improving one small step at a time.
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t-4 border-black">
                   <p className="font-bold uppercase text-sm mb-4">Thanks for reading.</p>
                   <div className="flex gap-4">
                     <a href="https://leetcode.com/u/Hemachandra9899/" className="bg-black text-white px-4 py-2 font-mono font-bold hover:bg-[#ffff4d] hover:text-black border-2 border-black transition-colors">
                       LEETCODE ↗
                     </a>
                     <a href="#intro" className="bg-white text-black px-4 py-2 font-mono font-bold hover:bg-black hover:text-white border-2 border-black transition-colors">
                       BACK TO TOP ↑
                     </a>
                   </div>
                </div>
              </section>

            </article>

            {/* SIDEBAR (Sticky Index Card) */}
            <aside className="hidden lg:block h-full">
              <div className="sticky top-24">
                <div className="bg-[#ffff4d] border-4 border-black p-6 hard-shadow rotate-1">
                  <h3 className="font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">Index</h3>
                  <nav className="flex flex-col gap-2 font-mono font-bold text-sm">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="block py-2 px-2 hover:bg-black hover:text-[#ffff4d] transition-colors border-l-2 border-transparent hover:border-[#ffff4d]"
                      >
                        {s.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mt-8 bg-black text-white border-4 border-black p-6 hard-shadow -rotate-1">
                  <h3 className="font-black text-xl uppercase mb-4 text-[#ffff4d]">Share</h3>
                  <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigator.clipboard?.writeText(window.location.href)}
                        className="bg-white text-black font-mono font-bold py-2 border-2 border-transparent hover:border-[#ffff4d] hover:bg-transparent hover:text-white"
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
        <footer className="mt-24 border-t-4 border-black pt-8 text-center font-mono font-bold text-sm uppercase">
          <p>© 2025 Hemachandra Reddy // Built with code & curiosity.</p>
        </footer>

      </main>
    </div>
  );
};

export default Blog;