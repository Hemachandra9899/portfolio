// Header.jsx
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "About Me", path: "/about" },
    { label: "Work", path: "/work" },
    { label: "Contact Me", path: "/contact" },
    { label: "Blogs", path: "/blogs" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);        // go to the route
    setIsMenuOpen(false);  // close the menu
  };

  return (
    <>
      {/* Top Header */}
      <header
        className="
          sticky top-0 z-20
          flex items-center justify-between
          px-8 md:px-16 pt-5 md:pt-7
          text-[0.7rem] md:text-xs
          tracking-[0.35em] uppercase
          text-zinc-400
          bg-black
          border-b border-white/5
        "
        style={{
          fontFamily:
            '"Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <Link to="/">
        <span className="text-sm md:text-base font-semibold text-zinc-100">
          HC
        </span></Link>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="
            relative
            uppercase
            text-[0.6rem] md:text-xs
            tracking-[0.35em]
            text-zinc-300
            hover:text-zinc-50
            transition-colors duration-300
            after:content-['']
            after:absolute after:left-0 after:-bottom-1
            after:h-[1px] after:w-full
            after:bg-zinc-500
            after:origin-left
            after:scale-x-0
            after:transition-transform after:duration-300
            hover:after:scale-x-100
          "
        >
          Menu
        </button>
      </header>

      {/* Fullscreen Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          bg-black text-gray-100
          transition-all duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        `}
        style={{ fontFamily: '"Source Serif Pro", serif' }}
      >
        {/* Top row: title + close */}
        <div className="flex items-center justify-between px-10 md:px-16 pt-10 text-xs md:text-sm tracking-[0.4em] uppercase text-gray-300">
          <span>My Index</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="
              uppercase
              hover:text-gray-100
              transition-colors duration-300
              text-[0.7rem] md:text-sm
              tracking-[0.35em]
            "
          >
            Close X
          </button>
        </div>

        {/* Menu items */}
        <nav className="mt-12 md:mt-16 text-xl md:text-2xl lg:text-3xl">
          {menuItems.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => handleMenuClick(path)}
              className="
                group
                w-full text-left
                px-10 md:px-16 py-6
                border-t border-neutral-700
                tracking-[0.18em] uppercase
                text-gray-300
                hover:bg-white/5 hover:text-white
                transition-colors duration-300
              "
            >
              <span
                className="
                  inline-block
                  transform
                  transition-transform duration-300 ease-out
                  group-hover:scale-110
                "
              >
                {label}
              </span>
            </button>
          ))}
          <div className="border-t border-neutral-700" />
        </nav>
      </div>
    </>
  );
};
