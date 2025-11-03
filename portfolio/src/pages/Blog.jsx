// src/pages/Blog.jsx
import { Header } from "../pages/Header.jsx";

// Replace these with your own images
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

      <main className="w-full pb-24">
        {/* HERO IMAGE + OVERLAY TEXT */}
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <img
            src={photoHero}
            alt="Camera and landscape"
            className="h-full w-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
          <div className="absolute bottom-10 left-4 md:left-10 max-w-3xl space-y-4">
            <p className="text-sm tracking-[0.35em] uppercase text-gray-300">
              Blog
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight">
              Capturing moments.
              <br />
              Solving problems.
            </h1>
            <p className="text-lg md:text-2xl text-gray-200/80">
              A journal of my love for photography, code and the quiet focus of
              daily LeetCode sessions.
            </p>
          </div>
        </section>

        {/* FIRST ARTICLE: PHOTOGRAPHY */}
        <section className="mt-20 px-4 md:px-10 lg:px-16 space-y-10">
          <article className="max-w-5xl space-y-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl leading-tight">
              Why I keep going back to the camera.
            </h2>
            <p className="text-lg md:text-2xl leading-relaxed text-gray-200/90">
              Photography is how I slow everything down. It forces me to notice
              small details—light on a wall, a reflection in a window, the way
              people move through a street. The same attention to detail that
              helps me write clean code is what makes photography so satisfying
              to me.
            </p>
            <p className="text-lg md:text-2xl leading-relaxed text-gray-200/80">
              I like working with natural light, quiet city corners and empty
              spaces. My favorite photos are rarely planned; they usually happen
              on long walks, when I’m not thinking about “getting a shot” but
              just paying attention.
            </p>
          </article>

          {/* Big inline image */}
          <div className="w-full max-w-5xl">
            <img
              src={photoStreet}
              alt="Street photography"
              className="w-full h-[300px] md:h-[420px] lg:h-[500px] object-cover  border border-white/10"
            />
          </div>
        </section>

        {/* SECOND ARTICLE: CODING + LEETCODE */}
        <section className="mt-24 px-4 md:px-10 lg:px-16">
          <div className="max-w-6xl grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
            {/* Text */}
            <article className="space-y-6">
              <h2 className="text-2xl md:text-4xl lg:text-5xl leading-tight">
                Code, LeetCode and the joy of getting unstuck.
              </h2>
              <p className="text-lg md:text-2xl leading-relaxed text-gray-200/90">
                When I’m not out taking photos, I’m usually in front of a
                keyboard solving problems. I regularly code on LeetCode—not for
                the streak, but for the feeling when a tricky problem finally
                clicks and the solution becomes obvious in hindsight.
              </p>
              <p className="text-lg md:text-2xl leading-relaxed text-gray-200/80">
                I treat each problem like a tiny design challenge: understand
                the constraints, explore a few approaches, and then aim for the
                cleanest solution I can write. Over time, this habit has made me
                faster at spotting patterns and more confident when working on
                real-world systems.
              </p>

              <div className="space-y-2 pt-4">
                <p className="text-sm tracking-[0.25em] uppercase text-zinc-400">
                  Where I practice
                </p>
                <a
                  href="https://leetcode.com/u/Hemachandra9899/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-lg md:text-2xl hover:underline underline-offset-4"
                >
                  leetcode.com/hemachandra9899
                </a>
              </div>
            </article>

            {/* Big code image */}
            <div className="w-full">
              <img
                src={photoCode}
                alt="Code on screen"
                className="w-full h-[260px] md:h-[360px] lg:h-[420px] object-cover  border border-white/10"
              />
            </div>
          </div>
        </section>

        {/* FOOTER LINE */}
        <footer className="mt-20 px-4 md:px-10 lg:px-16 max-w-5xl text-sm text-zinc-500">
          This Is The End.
        </footer>
      </main>
    </div>
  );
};

export default Blog;
