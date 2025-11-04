import { useState } from "react";
import sparkIcon from "../assets/si.svg";
import { Header } from "../pages/Header.jsx";

// Change this to your backend endpoint
const BACKEND_URL = "https://portfolio-bacckend.onrender.com/api/getnotes";

export const LandingPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hey, I’m Hemachandra 👋 Ask me anything about my work or projects.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    if (!isChatOpen) {
      setIsChatOpen(true);
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${BACKEND_URL}?query=${encodeURIComponent(trimmed)}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      // Backend might return text/plain or JSON
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
      className="relative min-h-screen bg-black text-gray-100 overflow-hidden"
      style={{ fontFamily: '"Source Serif Pro", serif' }}
    >
      {/* Top Header */}
      <Header />

      {/* Hero Section */}
      <section className="px-10 md:px-16 pt-16 md:pt-24 pb-40">
        <div className="max-w-5xl space-y-6">
          <h1 className="text-[37px] md:text-[50px] leading-[1.15] text-white font-light">
            Hemachandra Reddy
          </h1>

          <p className="text-[23px] md:text-[33px] leading-relaxed font-light text-white/60">
            <span>I design and build empathetic software experiences</span>
            <span className="block">
              that are grounded in research, informed by real users,
            </span>
            <span className="block">
              and focused on solving meaningful problems with clarity.
            </span>
          </p>
        </div>
      </section>

      {/* Bottom Panel: Chat */}
      <section>
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div
            className={`
              relative mx-auto w-full border border-gray-700 bg-[#111111]
              shadow-[0_-60px_120px_rgba(0,0,0,0.9)]
              transition-all duration-500 ease-out
              rounded-t-[64px] flex flex-col
              ${isChatOpen ? "h-screen" : "h-[40vh] md:h-[43vh]"}
            `}
          >
            {/* Top bar inside panel (only when open) */}
            {isChatOpen && (
              <div className="flex items-center justify-between px-8 pt-6 pb-2">
                <button
                  className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-gray-100"
                  onClick={() => setIsChatOpen(false)}
                >
                  ← Back
                </button>
                <span className="text-[12px] md:text-[13px] tracking-[0.25em] uppercase text-gray-500">
                  Chat
                </span>
              </div>
            )}

            {/* Chat messages */}
            {isChatOpen && (
              <div className="flex-1 overflow-y-auto px-8 md:px-14 pt-4 pb-6">
                <div className="max-w-3xl mx-auto space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={
                        msg.sender === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={`max-w-xl rounded-3xl px-6 py-4
                          text-base md:text-lg leading-relaxed
                          ${
                            msg.sender === "user"
                              ? "bg-[#005AFF] text-white"
                              : "bg-[#181818] text-gray-100"
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Modern loading / "thinking" bubble */}
                  {isLoading && (
  <div className="flex justify-start">
    <div className="max-w-xl rounded-3xl px-7 py-4 bg-[#181818] text-gray-100 flex items-center gap-4 border border-gray-700/70 shadow-lg shadow-blue-900/40">
      <span className="text-lg md:text-2xl">
        Thinking…
      </span>
      <div className="flex items-end gap-1.5">
        <span
          className="w-1.5 h-3 rounded-full bg-gray-400 animate-pulse"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-5 rounded-full bg-gray-500 animate-pulse"
          style={{ animationDelay: "120ms" }}
        />
        <span
          className="w-1.5 h-3 rounded-full bg-gray-600 animate-pulse"
          style={{ animationDelay: "240ms" }}
        />
      </div>
    </div>
  </div>
)}
                </div>
              </div>
            )}

            {/* Bottom input bar (works both collapsed & expanded) */}
            <div className="mt-auto mb-10 md:mb-14 lg:mb-16 flex w-full justify-center px-4">
              <div className="flex items-center gap-3 rounded-full border border-gray-600 bg-black/90 px-8 md:px-10 py-3 md:py-2 shadow-xl w-full max-w-xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="CHAT WITH ME !"
                  className="bg-transparent text-sm md:text-base lg:text-lg tracking-[0.22em] uppercase text-gray-200 placeholder-gray-500 outline-none flex-1"
                />
                <button
                  className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full hover:bg-blue-500 transition disabled:opacity-50"
                  onClick={handleSend}
                  disabled={isLoading}
                >
                  <img src={sparkIcon} alt="spark icon" className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
