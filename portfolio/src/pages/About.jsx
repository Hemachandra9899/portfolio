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
            I’m an entry-level software developer passionate about building
            scalable, reliable, and high-performance systems. I’m comfortable
            across the stack and enjoy working on backend services, full-stack
            features, and test automation—bringing strong problem-solving and
            debugging skills to every project I work on.
          </p>

          <p className="text-3xl md:text-[3.3rem] leading-tight md:ml-32 lg:ml-48 max-w-6xl font-light">
            I have experience designing REST APIs, managing databases, and
            working with microservice architectures using Rust, Node.js, and
            Express.js. My work spans backend systems, data streaming pipelines,
            and responsive front-end interfaces built with React and Tailwind CSS.
          </p>

          <p className="text-3xl md:text-[3.3rem] leading-tight md:ml-32 lg:ml-48 max-w-6xl font-light">
            I’m based in Hyderabad, India, and I care about crafting
            well-designed products, efficient backend architectures, and
            AI-driven workflows that make technology feel more intuitive and
            helpful for people.
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
                Built a Web3 platform using React, Tailwind CSS, and Wagmi with
                a Rust backend. Designed REST APIs in a microservice architecture,
                deployed with Docker and GitHub Actions, and achieved 95%+ test
                coverage.
              </p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-400">
              Skills
            </h3>
            <ul className="space-y-1 text-zinc-300">
              <li>C, C++, Python, JavaScript, Rust</li>
              <li>React.js, Node.js, Express.js, REST APIs</li>
              <li>Microservice Architecture & Docker</li>
              <li>MySQL, MongoDB, Kafka (basics)</li>
              <li>Git, GitHub Actions, Postman, Figma</li>
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
                  SecondBrain (AI/Full-Stack Developer)
                </span>
                <p>
                  Built a personal AI assistant using RAG with open-source
                  transformers and Pinecone vector DB. Developed frontend in React
                  and backend in Node.js with PostgreSQL authentication.
                </p>
              </li>
              <li>
                <span className="font-medium text-white">
                  Credit Card Fraud Detection
                </span>
                <p>
                  Implemented Random Forest and Logistic Regression achieving
                  92% accuracy. Optimized features and reduced false positives
                  by 18%.
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
              B.Tech in Information Technology · CGPA 7.14/10
              <br />
              Hyderabad, Telangana · Dec 2021 – Present
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
