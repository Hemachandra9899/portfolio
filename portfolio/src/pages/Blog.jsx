// src/pages/Blog.jsx
import { Header } from "../pages/Header.jsx";

import photoHero from "../assets/ss.png";
import photoStreet from "../assets/nature.jpeg";
import photoCode from "../assets/boat.jpeg";

export const Blog = () => {
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: '"Source Serif Pro", serif' }}
    >
      <Header />

      <main className="w-full pb-24 pt-16 flex justify-center px-4 md:px-6">
        <article className="w-full max-w-3xl">
          {/* TOP META */}
          <header className="text-center space-y-4 mb-10 md:mb-14">
            <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-500">
              February 2025 · Blog
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-light">
              Why I Balance Photography,
              <br />
              Code, and Problem Solving
            </h1>
            <p className="text-base md:text-xl text-zinc-300 max-w-2xl mx-auto">
              A personal note on how walking with a camera and sitting with code
              both teach me to slow down, notice details, and enjoy the process
              of getting unstuck.
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm">
                HR
              </div>
              <div className="text-left">
                <p className="text-sm text-zinc-100">Hemachandra Reddy</p>
                <p className="text-xs text-zinc-500">
                  Software Developer & Problem Solver
                </p>
              </div>
            </div>
          </header>

          {/* OPTIONAL HERO IMAGE INSIDE ARTICLE */}
          <div className="mb-12">
            <img
              src={photoHero}
              alt="Photography and coding mood"
              className="w-full h-[220px] md:h-[280px] lg:h-[320px] object-cover rounded-md border border-white/10"
            />
          </div>

          {/* INTRO PARAGRAPHS */}
          <section className="space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
            <p>
              Most of my days are split between two quiet activities: carrying a
              camera on long walks and sitting at my desk solving problems in
              code. They may look different from the outside, but for me they are
              the same habit—pay attention, explore a few angles, and slowly
              shape something that feels right.
            </p>
            <p>
              Photography trains my eye; coding trains my mind. Together, they
              keep me curious, patient, and comfortable with the feeling of not
              knowing the answer yet.
            </p>
          </section>

          {/* SECTION 1 – PHOTOGRAPHY */}
          <section className="mt-12 space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
            <h2 className="text-xl md:text-3xl font-semibold text-white">
              1. Photography: slowing down and seeing clearly
            </h2>
            <p>
              Photography is how I slow everything down. It forces me to notice
              small details—light on a wall, a reflection in a window, the way
              people move through a street. The same attention to detail that
              helps me write clean code is what makes photography so satisfying
              to me.
            </p>
            <p>
              I like working with natural light, quiet city corners, and empty
              spaces. My favorite photos are rarely planned; they usually happen
              on long walks, when I’m not thinking about “getting a shot” but
              just paying attention to whatever is in front of me.
            </p>

            <div className="mt-6">
              <img
                src={photoStreet}
                alt="Street scene from a walk"
                className="w-full h-[220px] md:h-[260px] lg:h-[320px] object-cover rounded-md border border-white/10"
              />
              <p className="mt-2 text-xs md:text-sm text-zinc-500 italic">
                A frame from one of my walks—simple light, simple shapes, and a
                quiet moment.
              </p>
            </div>
          </section>

          {/* SECTION 2 – CODE / LEETCODE */}
          <section className="mt-16 space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
            <h2 className="text-xl md:text-3xl font-semibold text-white">
              2. Code, LeetCode, and the joy of getting unstuck
            </h2>
            <p>
              When I’m not out taking photos, I’m usually in front of a keyboard
              solving problems. I regularly code on LeetCode—not just for a
              streak, but for that moment when a tricky problem finally clicks
              and the solution feels obvious in hindsight.
            </p>
            <p>
              I treat each problem like a tiny design challenge: understand the
              constraints, explore a few approaches, and then aim for the
              cleanest solution I can write. Over time, this habit has made me
              faster at spotting patterns and more confident when working on
              real-world systems.
            </p>

            <div className="mt-6">
              <img
                src={photoCode}
                alt="Code on screen"
                className="w-full h-[220px] md:h-[260px] lg:h-[320px] object-cover rounded-md border border-white/10"
              />
              <p className="mt-2 text-xs md:text-sm text-zinc-500 italic">
                The same patience I use when composing a photo helps when I’m
                debugging or refactoring code.
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-xs tracking-[0.25em] uppercase text-zinc-500">
                Where I practice
              </p>
              <a
                href="https://leetcode.com/u/Hemachandra9899/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-base md:text-xl text-sky-300 hover:underline underline-offset-4"
              >
                leetcode.com/hemachandra9899
              </a>
            </div>
          </section>

          {/* SECTION 3 – WRAP-UP */}
          <section className="mt-16 space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
            <h2 className="text-xl md:text-3xl font-semibold text-white">
              3. Bringing it back to how I work
            </h2>
            <p>
              Both photography and coding remind me that good work doesn’t
              happen in a rush. It comes from paying attention, trying small
              ideas, and not giving up when something feels stuck for a while.
            </p>
            <p>
              Whether I’m debugging a backend service or waiting for the light to
              fall just right on a building, I try to bring the same mindset:
              stay patient, stay curious, and keep improving one small step at a
              time.
            </p>
          </section>

          {/* FOOTER LINE */}
          <footer className="mt-16 pt-8 border-t border-zinc-800 text-xs md:text-sm text-zinc-500">
            Thanks for reading. If any of this resonated with you—whether you
            love cameras, code, or both—I’d be happy to connect.
          </footer>
        </article>
      </main>
    </div>
  );
};

export default Blog;
