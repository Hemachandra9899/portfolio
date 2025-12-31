import { Header } from "../pages/Header.jsx";

export const Profile = () => {
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        fontFamily:
          '"Source Serif Pro", system-ui, -apple-system, "Helvetica Neue", serif',
        fontWeight: 300,
      }}
    >
      <Header />

      <main className="w-full pt-20 pb-24 space-y-24">
        {/* INTRO SECTION */}
        <section className="space-y-20 px-4 md:px-10 lg:px-16">
          <p className="text-3xl md:text-[3.3rem] leading-tight font-light">
            I’m an entry-level software developer who enjoys building reliable,
            high-performance products across the stack.
          </p>

          <p className="text-3xl md:text-[3.3rem] leading-tight md:ml-32 lg:ml-48 max-w-6xl font-light">
            I work on REST APIs, databases, and microservices using Rust, Node.js,
            and Express, and I build responsive UIs with React and Tailwind.
          </p>

          <p className="text-3xl md:text-[3.3rem] leading-tight md:ml-32 lg:ml-48 max-w-6xl font-light">
            Based in Hyderabad, India—focused on clean design, efficient backend
            architecture, and practical AI-driven workflows.
          </p>
        </section>

        {/* CONTACT SECTION */}
        <section className="space-y-12 max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-wrap gap-x-16 gap-y-4 text-2xl md:text-[2.4rem] font-light">
            <a
              href="mailto:pottingari@gmail.com"
              className="hover:underline underline-offset-4"
            >
              pottingari@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/hemachandra-reddy/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline underline-offset-4"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Hemachandra9899"
              target="_blank"
              rel="noreferrer"
              className="hover:underline underline-offset-4"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* EXPERIENCE + SKILLS GRID */}
        <section className="pt-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-16 grid gap-12 md:gap-16 md:grid-cols-3 text-sm md:text-base leading-relaxed font-light">
          {/* EXPERIENCE */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-400">
              Experience
            </h3>
            <div className="space-y-1">
              <p className="font-medium text-white">SDET Intern, CodeNebula</p>
              <p className="text-zinc-400">Remote · Jul 2024 – Dec 2024</p>
              <p className="text-zinc-400">
                Built a Web3 platform (React + Tailwind + Wagmi) with a Rust
                backend. Shipped REST APIs, Docker deployments, CI via GitHub
                Actions, and maintained 95%+ test coverage.
              </p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-400">
              Skills
            </h3>
            <ul className="space-y-1 text-zinc-300">
              <li>Rust, JavaScript, Python, C/C++</li>
              <li>React, Node.js, Express, REST APIs</li>
              <li>Docker, Microservices, GitHub Actions</li>
              <li>MySQL, MongoDB, Kafka (basics)</li>
              <li>Git, Postman, Figma</li>
            </ul>
          </div>

          {/* PROJECTS */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-400">
              Projects
            </h3>
            <ul className="space-y-3 text-zinc-300">
              <li>
                <span className="font-medium text-white">
                  SecondBrain (RAG Assistant)
                </span>
                <p>
                  Built a personal AI assistant using RAG + Pinecone, with a React
                  UI and Node.js backend (PostgreSQL auth).
                </p>
              </li>
              <li>
                <span className="font-medium text-white">
                  Credit Card Fraud Detection
                </span>
                <p>
                  Trained Random Forest + Logistic Regression models (~92%
                  accuracy) and reduced false positives through feature tuning.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section className="pt-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-16 grid gap-12 md:grid-cols-2 text-sm md:text-base leading-relaxed font-light">
          <div>
            <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-400">
              Education
            </h3>
            <p className="mt-2 text-zinc-300">
              <span className="font-medium text-white">
                Sreenidhi Institute of Science and Technology
              </span>
              <br />
              B.Tech (Information Technology) · CGPA 7.14/10
              <br />
              Hyderabad · Dec 2021 – Present
            </p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-400">
              Certifications
            </h3>
            <ul className="mt-2 space-y-1 text-zinc-300">
              <li>The UX Design Process – Coursera</li>
              <li>GfG 160 Days of Problem Solving – GeeksforGeeks</li>
            </ul>
          </div>
        </section>

        <footer className="pt-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-16 text-sm text-zinc-500 font-light">
          © 2025 Hemachandra Reddy Pottingari
        </footer>
      </main>
    </div>
  );
};
