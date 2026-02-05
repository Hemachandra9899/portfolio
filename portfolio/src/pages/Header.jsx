import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Me", path: "/about" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
    { label: "Blogs", path: "/blogs" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* --- FIXED NAVBAR --- 
          z-index: 50. Uses mix-blend-exclusion so text is visible on any background.
      */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between mix-blend-exclusion pointer-events-none">
        
        {/* LOGO */}
        <Link to="/" className="pointer-events-auto group">
          <span 
            className="text-3xl md:text-4xl font-black text-[#ffff4d] uppercase tracking-tighter transition-transform duration-300 group-hover:scale-110 inline-block"
            style={{ 
              fontFamily: '"Palette Mosaic", cursive',
              textShadow: '2px 2px 0px #000' 
            }}
          >
            HC
          </span>
        </Link>

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
          "
        >
          Menu [ + ]
        </button>
      </header>

      {/* --- FULLSCREEN MENU OVERLAY --- 
          z-index: 60. Covers the Header but sits below the Chat (which is z-100).
      */}
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
              {/* Hover Animation Background */}
              <div className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />

              {/* Label */}
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

              {/* Decorative Number */}
              <span className="
                absolute top-1/2 left-4 md:left-10 -translate-y-1/2
                font-mono text-xs md:text-sm font-bold text-black/30 
                group-hover:text-[#ffff4d]/50
                transition-colors duration-300
              ">
                0{index + 1}
              </span>
            </button>
          ))}
        </nav>

        {/* MENU FOOTER */}
        <div className="p-6 md:p-10 border-t-4 border-black flex justify-between items-end bg-white">
            <div className="flex flex-col font-mono text-xs md:text-sm font-bold">
                <span>BASED IN INDIA</span>
                <span>LOCAL TIME: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div className="flex gap-4 font-mono font-bold text-sm underline cursor-pointer">
                <a href="#" className="hover:bg-black hover:text-white px-1">LINKEDIN</a>
                <a href="#" className="hover:bg-black hover:text-white px-1">GITHUB</a>
                <a href="#" className="hover:bg-black hover:text-white px-1">TWITTER</a>
            </div>
        </div>
      </div>
    </>
  );
};