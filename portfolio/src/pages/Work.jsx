// src/pages/Projects.jsx
import { Header } from "../pages/Header.jsx";

const projects = [
  {
    id: "second-brain",
    title: "Second Brain",
    description:
      "Second Brain is a personal knowledge management system powered by embeddings and Pinecone vector search. It allows you to store, search, and retrieve notes intelligently using semantic embeddings instead of plain keyword matching.",
    tags: ["REACT.js", "NODE.js", "VECTOR DB", "AI", "LLMS"],
    repoUrl: "https://github.com/Hemachandra9899/second-brain",
  },
  {
    id: "tools-simpleweb3",
    title: "Tools.simpleweb3.ch",
    description:
      "Tools.simpleweb3.ch is a Web3 tools hub that lets you inspect contracts, experiment with transactions, and explore on-chain data in a clean, minimal interface.",
    tags: ["REACT.js", "RUST", "WEB3", "BLOCKCHAIN"],
    repoUrl: "https://github.com/Hemachandra9899/tools.simpleweb3.ch",
  },
  {
    id: "credit-card-fraud",
    title: "Credit-Card-Fraud-detection",
    description:
      "An end-to-end fraud detection pipeline that analyzes transaction behavior to flag suspicious credit card activity, combining feature engineering, supervised learning, and real-time alerting to reduce false positives and protect customers.",
    tags: ["PYTHON", "LLMS", "AI"],
    repoUrl: "https://github.com/Hemachandra9899/Credit-Card-Fraud-detection",
  },
];

export const Projects = () => {
  return (
    <div
      className="min-h-screen bg-black text-zinc-100"
      style={{ fontFamily: '"Source Serif Pro", serif' }}
    >
      <Header />

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-24">
        {/* Heading */}
        <h2 className="text-sm md:text-xs tracking-[0.35em] uppercase text-zinc-400 mb-10">
          My Projects
        </h2>

        <div className="space-y-14">
          {projects.map((project) => (
            <article
              key={project.id}
              className="
                group relative overflow-visible
                border-b border-white/5 pb-12 last:border-b-0
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:bg-white/[0.02] hover:border-white/10
                hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.7)]
              "
            >
              {/* Text block */}
              <div className="pr-0 md:pr-56 space-y-4">
                <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                  {project.title}
                </h3>

                <p className="max-w-3xl text-lg md:text-2xl text-zinc-300 leading-relaxed">
                  {project.description}
                </p>

                <p className="text-[0.7rem] text-zinc-400 tracking-[0.25em] uppercase mt-4">
                  Resources
                </p>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-3 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full border border-zinc-500
                        px-4 py-1.5
                        text-[0.65rem] tracking-[0.16em] uppercase
                        text-zinc-200
                        group-hover:border-zinc-300
                        transition-colors
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover card: animated, only for this project */}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  hidden md:block
                  absolute right-0 top-1/2 -translate-y-1/2
                  pointer-events-none group-hover:pointer-events-auto
                "
              >
                <div
                  className="
                    rounded-[30px]
                    border border-white/10
                    bg-gradient-to-b from-white/6 via-black/60 to-black
                    shadow-[0_26px_80px_rgba(0,0,0,0.9)]
                    px-7 py-5
                    min-w-[260px]
                    flex flex-col gap-4
                    transform
                    opacity-0 translate-y-4 scale-95
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                    transition-all duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                  "
                >
                  <span className="text-xl text-zinc-50">{project.title}</span>
                  <button
                    className="
                      rounded-full bg-[#1745ff]
                      px-6 py-2.5
                      text-[0.75rem] tracking-[0.22em]
                      uppercase text-white
                      hover:bg-[#2855ff]
                      transition-colors
                    "
                  >
                    View Repository
                  </button>
                </div>
              </a>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
