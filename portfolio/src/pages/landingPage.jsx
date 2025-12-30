import { useEffect, useRef, useState } from "react";
import sparkIcon from "../assets/si.svg";
import { Header } from "../pages/Header.jsx";

// Change this to your backend endpoint
const BACKEND_URL = "https://portfolio-bacckend.onrender.com/api/getnotes";

export const LandingPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi, I’m Hemachandra 👋Ask me about my work or projects.First response may be slow, follow-ups are lightning fast ⚡",
    },
  ]);

  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Spotlight follows mouse (cheap + smooth via rAF)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

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
      if (e.key === "Escape") setIsChatOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}?query=${encodeURIComponent(trimmed)}`, {
        method: "GET",
      });

      if (!res.ok) throw new Error("Request failed");

      const contentType = res.headers.get("content-type") || "";
      let botText;

      if (contentType.includes("application/json")) {
        const data = await res.json();
        botText = data.reply || data.answer || "No response received from server.";
      } else {
        botText = await res.text();
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: botText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        id: Date.now() + 2,
        sender: "bot",
        text: "Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-black text-gray-100 overflow-hidden"
      style={{ fontFamily: '"Source Serif Pro", serif' }}
    >
      {/* Local CSS (no Tailwind config changes needed) */}
      <style>{`
        .lp-spotlight {
          background:
            radial-gradient(800px circle at var(--mx, 50%) var(--my, 20%), rgba(0, 90, 255, 0.22), transparent 42%),
            radial-gradient(520px circle at calc(var(--mx, 50%) + 140px) calc(var(--my, 20%) + 120px), rgba(255,255,255,0.07), transparent 45%);
        }

        .lp-grid {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(closest-side, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent);
        }

        @keyframes gridDrift {
          0% { transform: translate3d(0,0,0); opacity: 0.18; }
          50% { transform: translate3d(-18px, 10px, 0); opacity: 0.24; }
          100% { transform: translate3d(0,0,0); opacity: 0.18; }
        }
        .lp-grid-anim { animation: gridDrift 10s ease-in-out infinite; }

        @keyframes floatA {
          0% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(18px,-20px,0) scale(1.03); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes floatB {
          0% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-20px,16px,0) scale(1.04); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        .lp-floatA { animation: floatA 12s ease-in-out infinite; }
        .lp-floatB { animation: floatB 14s ease-in-out infinite; }

        @keyframes heroIn {
          0% { opacity: 0; transform: translate3d(0, 10px, 0); filter: blur(6px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
        }
        .lp-heroIn { animation: heroIn 700ms cubic-bezier(.2,.9,.2,1) both; }

        @keyframes msgPop {
          0% { opacity: 0; transform: translate3d(0, 8px, 0) scale(0.98); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        .lp-msg { animation: msgPop 220ms ease-out both; }

        @keyframes ringSpin {
          to { transform: rotate(360deg); }
        }
        .lp-ringSpin { animation: ringSpin 7s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .lp-grid-anim, .lp-floatA, .lp-floatB, .lp-heroIn, .lp-msg, .lp-ringSpin {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background: spotlight + drifting grid + blobs */}
      <div className="pointer-events-none absolute inset-0 lp-spotlight" />
      <div className="pointer-events-none absolute inset-0 lp-grid lp-grid-anim opacity-20" />

      {/* Floating blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full blur-3xl lp-floatA"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(0,90,255,0.45), transparent 55%)" }}
      />
      <div className="pointer-events-none absolute top-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl lp-floatB"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10), transparent 60%)" }}
      />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[460px] w-[460px] rounded-full blur-3xl lp-floatA"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(0,90,255,0.22), transparent 60%)" }}
      />

      {/* Top Header */}
      <Header />

      {/* Hero Section (UNCHANGED font sizes) */}
      <section className="px-10 md:px-16 pt-16 md:pt-24 pb-28 md:pb-32">
        <div className="max-w-5xl space-y-6 lp-heroIn">
          <div className="inline-flex items-center gap-3">
            <h1 className="text-[30px] md:text-[50px] leading-[1.15] text-white font-light">
              <span className="relative">
                Hemachandra Reddy
                {/* playful underline that lights up on hover */}
                <span className="absolute -bottom-2 left-0 h-[2px] w-full opacity-40"
                  style={{ background: "linear-gradient(90deg, rgba(0,90,255,0), rgba(0,90,255,1), rgba(0,90,255,0))" }}
                />
              </span>
            </h1>

            {/* little “status chip” */}
            <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] uppercase text-white/70 hover:bg-white/10 hover:text-white transition">
              available <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(0,90,255,0.8)]" />
            </span>
          </div>

          <p className="text-[22px] md:text-[33px] leading-relaxed font-light text-white/60">
            <span>I design and build empathetic software experiences</span>
            <span className="block">that are grounded in research, informed by real users,</span>
            <span className="block">and focused on solving meaningful problems with clarity.</span>
          </p>

          {/* GitHub + LinkedIn BELOW the content */}
          <div className="pt-2 flex items-center gap-4">
            <a
              href="https://github.com/Hemachandra9899"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group relative inline-flex items-center justify-center"
            >
              <span className="absolute -inset-3 rounded-full bg-white/0 transition group-hover:bg-white/5" />
              <span className="absolute -inset-3 rounded-full opacity-0 blur-xl transition group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(0,90,255,0.35), transparent 60%)" }}
              />
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative text-white/75 transition duration-300 group-hover:text-white group-hover:scale-[1.08] group-hover:-rotate-3"
              >
                <path d="M12 .5C5.73.5.75 5.59.75 12c0 5.14 3.29 9.5 7.86 11.04.58.11.79-.26.79-.57 0-.28-.01-1.03-.02-2.02-3.2.71-3.88-1.59-3.88-1.59-.53-1.38-1.29-1.75-1.29-1.75-1.05-.74.08-.73.08-.73 1.16.08 1.77 1.22 1.77 1.22 1.03 1.82 2.7 1.29 3.36.99.1-.77.4-1.29.72-1.58-2.55-.3-5.23-1.31-5.23-5.83 0-1.29.44-2.34 1.17-3.16-.12-.3-.51-1.52.11-3.17 0 0 .96-.32 3.15 1.21.91-.26 1.88-.39 2.85-.39.97 0 1.95.13 2.85.39 2.18-1.53 3.14-1.21 3.14-1.21.62 1.65.23 2.87.11 3.17.73.82 1.17 1.87 1.17 3.16 0 4.53-2.69 5.52-5.25 5.81.41.37.78 1.1.78 2.22 0 1.6-.02 2.9-.02 3.29 0 .31.21.69.8.57A11.27 11.27 0 0 0 23.25 12C23.25 5.59 18.27.5 12 .5z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/hemachandra-reddy"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group relative inline-flex items-center justify-center"
            >
              <span className="absolute -inset-3 rounded-full bg-white/0 transition group-hover:bg-white/5" />
              <span className="absolute -inset-3 rounded-full opacity-0 blur-xl transition group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(0,90,255,0.30), transparent 60%)" }}
              />
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative text-white/75 transition duration-300 group-hover:text-white group-hover:scale-[1.08] group-hover:rotate-3"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23.5h4V7.98h-4V23.5zM8 7.98h3.83v2.12h.05c.53-1 1.83-2.12 3.77-2.12 4.03 0 4.78 2.65 4.78 6.1v9.42h-4v-8.36c0-1.99-.04-4.56-2.78-4.56-2.78 0-3.2 2.17-3.2 4.41v8.51H8V7.98z" />
              </svg>
            </a>

            {/* tiny hint */}
           
          </div>
        </div>
      </section>

      {/* Floating Star Icon (ONLY trigger to open chat) */}
      {!isChatOpen && (
        <button
          type="button"
          aria-label="Open My AI"
          onClick={() => setIsChatOpen(true)}
          className="
            group fixed bottom-10 left-1/2 -translate-x-1/2 z-40
            h-14 w-14 md:h-16 md:w-16 rounded-full
            grid place-items-center
            transition-transform duration-300
            hover:scale-[1.06] active:scale-[0.97]
          "
        >
          {/* glow aura */}
          <span className="absolute inset-0 rounded-full blur-2xl opacity-80"
            style={{ background: "radial-gradient(circle, rgba(0,90,255,0.35), transparent 60%)" }}
          />
          {/* rotating ring */}
          <span className="absolute inset-[-6px] rounded-full border border-blue-500/30 lp-ringSpin" />
          {/* hover label */}
          <span className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2 text-[10px] tracking-[0.22em] uppercase text-white/70 opacity-0 blur-[2px] transition duration-300 group-hover:opacity-100 group-hover:blur-0">
            Chat with my AI
          </span>

          <img
            src={sparkIcon}
            alt="spark icon"
            className="relative h-9 w-9 md:h-10 md:w-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-[1.06]"
          />
        </button>
      )}

      {/* Chat Drawer (slides up with animation) */}
      <div className={`fixed inset-0 z-50 ${isChatOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <button
          aria-label="Close chat"
          onClick={() => setIsChatOpen(false)}
          className={`
            absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500
            ${isChatOpen ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Drawer */}
        <div
          className={`
            absolute inset-x-0 bottom-0
            mx-auto w-full
            bg-[#0E0E0E]/95
            shadow-[0_-60px_140px_rgba(0,0,0,0.9)]
            rounded-t-[64px] flex flex-col
            transition-transform duration-500 ease-out
            ${isChatOpen ? "translate-y-0" : "translate-y-full"}
            h-[86vh] md:h-[88vh]
          `}
          style={{
            border: "1px solid rgba(255,255,255,0.10)",
            backgroundImage:
              "radial-gradient(900px circle at 20% 10%, rgba(0,90,255,0.12), transparent 40%)",
          }}
        >
          {/* Top bar inside panel */}
          <div className="flex items-center justify-between px-8 pt-6 pb-3">
            <button
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-gray-100 transition"
              onClick={() => setIsChatOpen(false)}
            >
              ← Back
            </button>
            <span className="text-[12px] md:text-[13px] tracking-[0.25em] uppercase text-gray-500">
              My AI
            </span>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-8 md:px-14 pt-2 pb-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={msg.id}
                  className={`${msg.sender === "user" ? "flex justify-end" : "flex justify-start"} lp-msg`}
                  style={{ animationDelay: `${Math.min(i * 18, 140)}ms` }}
                >
                  <div
                    className={`max-w-xl rounded-3xl px-6 py-4
                      text-base md:text-lg leading-relaxed
                      ${msg.sender === "user" ? "bg-[#005AFF] text-white shadow-[0_0_40px_rgba(0,90,255,0.18)]" : "bg-[#181818] text-gray-100 border border-white/10"}
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Modern loading / "thinking" bubble */}
              {isLoading && (
                <div className="flex justify-start lp-msg">
                  <div className="max-w-xl rounded-3xl px-7 py-4 bg-[#181818] text-gray-100 flex items-center gap-4 border border-white/10 shadow-lg shadow-blue-900/30">
                    <span className="text-lg md:text-2xl">Thinking…</span>
                    <div className="flex items-end gap-1.5">
                      <span className="w-1.5 h-3 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-5 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: "120ms" }} />
                      <span className="w-1.5 h-3 rounded-full bg-gray-600 animate-pulse" style={{ animationDelay: "240ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Bottom input bar (ONLY inside drawer) */}
          <div className="mt-auto mb-10 md:mb-14 lg:mb-16 flex w-full justify-center px-4">
            <div
              className="
                flex items-center gap-3 rounded-full
                border border-white/15 bg-black/80 px-8 md:px-10 py-3 md:py-2
                shadow-xl w-full max-w-xl
                transition
                focus-within:border-blue-500/50
                focus-within:shadow-[0_0_0_6px_rgba(0,90,255,0.12)]
              "
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="CHAT WITH ME !"
                className="bg-transparent text-sm md:text-base lg:text-lg tracking-[0.22em] uppercase text-gray-200 placeholder-gray-500 outline-none flex-1"
              />
              <button
                className="
                  flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full
                  transition
                  hover:bg-blue-500/80 hover:shadow-[0_0_30px_rgba(0,90,255,0.35)]
                  active:scale-[0.96]
                  disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none
                "
                onClick={handleSend}
                disabled={isLoading}
              >
                <img src={sparkIcon} alt="spark icon" className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
