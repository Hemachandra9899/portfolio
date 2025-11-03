// src/pages/Contact.jsx
import { Header } from "../pages/Header.jsx";

export const Contact = () => {
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        fontFamily: '"Source Serif Pro", system-ui, -apple-system, "Helvetica Neue", serif',
      }}
    >
      <Header />

      <main className="w-full pt-20 pb-24 space-y-20">
        {/* BIG INTRO TEXT */}
        <section className="space-y-16 px-4 md:px-10 lg:px-16">
          <p className="text-3xl md:text-[3.3rem] leading-tight max-w-5xl">
            Let’s build something thoughtful, clear and useful. I’m always open
            to chatting about new projects, roles, collaborations or anything
            related to software, design and engineering.
          </p>

          <p className="text-3xl md:text-[3.3rem] leading-tight max-w-5xl md:ml-24 lg:ml-40">
            Based in India and working remotely, I’m comfortable collaborating
            across time zones with product, design and engineering teams.
          </p>
        </section>

        {/* PRIMARY CONTACT LINE */}
        <section className="px-4 md:px-10 lg:px-16 space-y-6">
          <p className="text-sm tracking-[0.28em] uppercase text-zinc-400">
            Best way to reach me
          </p>
          <a
            href="mailto:pottingari@gmail.com"
            className="block text-3xl md:text-[3.3rem] leading-tight hover:underline underline-offset-4"
          >
            pottingari@gmail.com
          </a>
        </section>

        {/* DETAILS GRID */}
        <section className="pt-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-16 space-y-8">
          <h2 className="text-sm tracking-[0.3em] uppercase text-zinc-400">
            Contact Details
          </h2>

          <div className="space-y-6 text-base md:text-lg">
            {/* Email */}
            <ContactRow label="Email">
              <a
                href="mailto:pottingari@gmail.com"
                className="hover:underline underline-offset-4"
              >
                Pottingari@gmail.com
              </a>
            </ContactRow>

            {/* Phone */}
            <ContactRow label="Phone">
              <span>+91&nbsp;63059&nbsp;84164</span>
            </ContactRow>

            {/* Location */}
            <ContactRow label="Location">
              <span>India · Open to remote work </span>
            </ContactRow>

            {/* LinkedIn */}
            <ContactRow label="LinkedIn">
              <a
                href="https://www.linkedin.com/in/hemachandra-reddy/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-4"
              >
                linkedin.com/in/Hemachandra Reddy
              </a>
            </ContactRow>

            {/* GitHub */}
            <ContactRow label="GitHub">
              <a
                href="https://github.com/Hemachandra9899"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-4"
              >
                github.com/Chandra9899
              </a>
            </ContactRow>

            {/* LeetCode */}
            <ContactRow label="LeetCode">
              <a
                href="https://leetcode.com/u/Hemachandra9899/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-4"
              >
                leetcode.com/Hemachandra9899
              </a>
            </ContactRow>
          </div>
        </section>

        <footer className="pt-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-16 text-sm text-zinc-500">
          This Is The End.
        </footer>
      </main>
    </div>
  );
};

// Small helper for label/value rows
const ContactRow = ({ label, children }) => (
  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
    <span className="text-xs tracking-[0.25em] uppercase text-zinc-500">
      {label}
    </span>
    <div className="text-zinc-100">{children}</div>
  </div>
);

export default Contact;
