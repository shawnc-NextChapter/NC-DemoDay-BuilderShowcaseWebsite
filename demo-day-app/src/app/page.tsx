import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllPresenters } from "@/lib/presenters";

export default function HomePage() {
  const presenters = getAllPresenters();

  return (
    <main>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-ink grid-texture bloom">
        <div
          className="relative z-10 section-inner"
          style={{ padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 4vw, 4rem)" }}
        >
          <div className="max-w-3xl">
            <div className="kicker kicker--light mb-6">
              Spring &apos;26 Cohort
            </div>
            <h1 className="text-display text-paper text-[clamp(2.5rem,5vw,4.5rem)] mb-6">
              Demo Day{" "}
              <span className="text-lime">Showcase</span>
            </h1>
            <p className="text-paper/70 text-lg leading-relaxed max-w-xl mb-10">
              Explore the products built by Next Chapter&apos;s Spring 2026 cohort.
              Real software solving real problems, built by builders ready to
              ship, prove, and lead.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#products"
                className="btn btn--accent is-lg group"
              >
                Explore Products
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <Link
                href="https://www.nextchapterproject.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn is-lg text-paper/80 border-paper/20 hover:border-paper/40 hover:text-paper"
              >
                About Next Chapter
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-paper to-transparent z-20"
          aria-hidden="true"
        />
      </section>

      {/* Products grid */}
      <section
        id="products"
        className="section"
        style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}
      >
        <div className="section-inner">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="kicker mb-4">Products</div>
              <h2 className="text-heading text-[clamp(1.5rem,3vw,2.25rem)]">
                {presenters.length} products. One stage.
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-ink-muted">
              <Sparkles size={14} />
              <span>Click to explore</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {presenters.map((presenter, index) => (
              <Link
                key={presenter.id}
                href={`/builders/${presenter.slug}`}
                className="card group p-0 overflow-hidden animate-fade-in-up"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {/* Card top accent */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, var(--indigo), var(--teal))`,
                  }}
                  aria-hidden="true"
                />

                <div className="p-6">
                  {/* Category badge */}
                  <span className="pill pill--indigo text-xs mb-4 inline-block">
                    {presenter.project.category}
                  </span>

                  {/* Product name */}
                  <h3 className="text-heading text-lg mb-2 group-hover:text-indigo transition-colors">
                    {presenter.project.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-ink-muted leading-relaxed mb-5 line-clamp-2">
                    {presenter.project.tagline}
                  </p>

                  {/* Builder */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-default">
                    <span className="text-sm font-medium text-ink/80">
                      {presenter.name}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-ink-muted group-hover:text-indigo group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-12">
        <div className="section-inner text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-[3px] h-5 bg-indigo-soft rounded-sm" aria-hidden="true" />
            <span className="text-paper text-sm font-bold tracking-tight">
              next chapter
            </span>
          </div>
          <p className="text-paper/50 text-sm">
            Talent is everywhere. Opportunity is not.
          </p>
          <p className="text-paper/30 text-xs mt-2">
            © {new Date().getFullYear()} Next Chapter Project
          </p>
        </div>
      </footer>
    </main>
  );
}
