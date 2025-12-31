// src/pages/Blog.jsx
import { useEffect, useMemo, useState } from "react";
import { Header } from "../pages/Header.jsx";

import photoHero from "../assets/ss.png";
import photoStreet from "../assets/nature.jpeg";
import photoCode from "../assets/boat.jpeg";

export const Blog = () => {
  const [progress, setProgress] = useState(0);

  const sections = useMemo(
    () => [
      { id: "intro", label: "Intro" },
      { id: "photography", label: "Photography" },
      { id: "coding", label: "Code & LeetCode" },
      { id: "wrap", label: "How I work" },
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
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: '"Source Serif Pro", serif' }}
    >
      {/* Reading progress */}
      <div className="fixed top-0 left-0 z-[60] h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-white/70"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Header />

      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute bottom-[-220px] right-[-140px] h-[520px] w-[520px] rounded-full bg-white/10 blur-[140px]" />
      </div>

      <main className="w-full pb-24 pt-16">
        {/* HERO */}
        <section className="px-4 md:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
              <div className="absolute inset-0">
                <img
                  src={photoHero}
                  alt="Photography and coding mood"
                  className="h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
              </div>

              <div className="relative p-6 md:p-10 lg:p-12">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-zinc-300/70">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    February 2025
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Blog
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    4 min read
                  </span>
                </div>

                <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-light">
                  Why I Balance Photography,
                  <br />
                  Code, and Problem Solving
                </h1>

                <p className="mt-4 max-w-2xl text-base md:text-xl text-zinc-200/90 leading-relaxed">
                  A personal note on how walking with a camera and sitting with
                  code both teach me to slow down, notice details, and enjoy the
                  process of getting unstuck.
                </p>

                {/* Author card */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm">
                      HR
                    </div>
                    <div>
                      <p className="text-sm text-white">Hemachandra Reddy</p>
                      <p className="text-xs text-zinc-300/70">
                        Software Developer & Problem Solver
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-300/70">
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span>Notice details • Iterate • Keep going</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT LAYOUT */}
        <section className="mt-10 px-4 md:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
              {/* ARTICLE */}
              <article className="min-w-0">
                {/* Intro */}
                <section
                  id="intro"
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
                >
                  <div className="space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
                    <p>
                      Most of my days are split between two quiet activities:
                      carrying a camera on long walks and sitting at my desk
                      solving problems in code. They may look different from the
                      outside, but for me they are the same habit—pay attention,
                      explore a few angles, and slowly shape something that
                      feels right.
                    </p>
                    <p>
                      Photography trains my eye; coding trains my mind. Together,
                      they keep me curious, patient, and comfortable with the
                      feeling of not knowing the answer yet.
                    </p>

                    {/* Pull quote */}
                    <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5 md:p-6">
                      <p className="text-zinc-100 text-lg md:text-2xl leading-snug font-light">
                        “Pay attention, explore a few angles, and slowly shape
                        something that feels right.”
                      </p>
                      <p className="mt-2 text-xs text-zinc-500 tracking-[0.2em] uppercase">
                        A mindset I reuse everywhere
                      </p>
                    </div>
                  </div>
                </section>

                {/* Photography */}
                <section
                  id="photography"
                  className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm">
                      1
                    </span>
                    <h2 className="text-xl md:text-3xl font-semibold text-white">
                      Photography: slowing down and seeing clearly
                    </h2>
                  </div>

                  <div className="mt-6 space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
                    <p>
                      Photography is how I slow everything down. It forces me to
                      notice small details—light on a wall, a reflection in a
                      window, the way people move through a street. The same
                      attention to detail that helps me write clean code is what
                      makes photography so satisfying to me.
                    </p>
                    <p>
                      I like working with natural light, quiet city corners, and
                      empty spaces. My favorite photos are rarely planned; they
                      usually happen on long walks, when I’m not thinking about
                      “getting a shot” but just paying attention to whatever is
                      in front of me.
                    </p>

                    <figure className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                      <img
                        src={photoStreet}
                        alt="Street scene from a walk"
                        className="w-full h-[240px] md:h-[320px] object-cover"
                      />
                      <figcaption className="px-4 py-3 text-xs md:text-sm text-zinc-500 italic">
                        A frame from one of my walks—simple light, simple shapes,
                        and a quiet moment.
                      </figcaption>
                    </figure>
                  </div>
                </section>

                {/* Code */}
                <section
                  id="coding"
                  className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm">
                      2
                    </span>
                    <h2 className="text-xl md:text-3xl font-semibold text-white">
                      Code, LeetCode, and the joy of getting unstuck
                    </h2>
                  </div>

                  <div className="mt-6 space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
                    <p>
                      When I’m not out taking photos, I’m usually in front of a
                      keyboard solving problems. I regularly code on
                      LeetCode—not just for a streak, but for that moment when a
                      tricky problem finally clicks and the solution feels
                      obvious in hindsight.
                    </p>
                    <p>
                      I treat each problem like a tiny design challenge:
                      understand the constraints, explore a few approaches, and
                      then aim for the cleanest solution I can write. Over time,
                      this habit has made me faster at spotting patterns and
                      more confident when working on real-world systems.
                    </p>

                    <figure className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                      <img
                        src={photoCode}
                        alt="Code on screen"
                        className="w-full h-[240px] md:h-[320px] object-cover"
                      />
                      <figcaption className="px-4 py-3 text-xs md:text-sm text-zinc-500 italic">
                        The same patience I use when composing a photo helps
                        when I’m debugging or refactoring code.
                      </figcaption>
                    </figure>

                    <div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/10 bg-black/30 p-5">
                      <p className="text-xs tracking-[0.25em] uppercase text-zinc-500">
                        Where I practice
                      </p>
                      <a
                        href="https://leetcode.com/u/Hemachandra9899/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-base md:text-xl text-sky-300 hover:underline underline-offset-4"
                      >
                        leetcode.com/u/Hemachandra9899
                        <span className="text-zinc-500 text-sm">↗</span>
                      </a>
                    </div>
                  </div>
                </section>

                {/* Wrap */}
                <section
                  id="wrap"
                  className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm">
                      3
                    </span>
                    <h2 className="text-xl md:text-3xl font-semibold text-white">
                      Bringing it back to how I work
                    </h2>
                  </div>

                  <div className="mt-6 space-y-6 text-base md:text-xl leading-relaxed text-zinc-200">
                    <p>
                      Both photography and coding remind me that good work
                      doesn’t happen in a rush. It comes from paying attention,
                      trying small ideas, and not giving up when something feels
                      stuck for a while.
                    </p>
                    <p>
                      Whether I’m debugging a backend service or waiting for the
                      light to fall just right on a building, I try to bring the
                      same mindset: stay patient, stay curious, and keep
                      improving one small step at a time.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-6">
                      <p className="text-lg md:text-2xl font-light text-zinc-100">
                        Thanks for reading.
                      </p>
                      <p className="mt-2 text-sm md:text-base text-zinc-300/80">
                        If any of this resonated—cameras, code, or both—I’d be
                        happy to connect.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href="https://leetcode.com/u/Hemachandra9899/"
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:bg-white/10"
                        >
                          LeetCode ↗
                        </a>
                        <a
                          href="#intro"
                          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:bg-white/10"
                        >
                          Back to top ↑
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="mt-10 pt-8 text-xs md:text-sm text-zinc-500">
                  <div className="border-t border-zinc-800 pt-6">
                    Built with patience, curiosity, and a lot of small iterations.
                  </div>
                </footer>
              </article>

              {/* SIDEBAR */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs tracking-[0.25em] uppercase text-zinc-500">
                      On this page
                    </p>
                    <nav className="mt-4 space-y-2">
                      {sections.map((s) => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className="block rounded-lg border border-transparent px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                        >
                          {s.label}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs tracking-[0.25em] uppercase text-zinc-500">
                      Quick meta
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-zinc-300">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Topic</span>
                        <span>Photography + Coding</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Style</span>
                        <span>Editorial</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Read</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs tracking-[0.25em] uppercase text-zinc-500">
                      Share
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => navigator.clipboard?.writeText(window.location.href)}
                        className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100 hover:bg-white/10"
                      >
                        Copy link
                      </button>
                      <a
                        href="https://leetcode.com/u/Hemachandra9899/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100 hover:bg-white/10"
                      >
                        LeetCode
                      </a>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500">
                      (Copy link for socials)
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
