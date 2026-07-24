import Image from "next/image";
import type { Presenter } from "@/types/presenter";
import { ExternalLink, Lock, Calendar } from "lucide-react";

interface ProjectHeroProps {
  presenter: Presenter;
}

export default function ProjectHero({ presenter }: ProjectHeroProps) {
  const { project } = presenter;

  return (
    <section
      className="relative overflow-hidden bg-ink grid-texture bloom"
      aria-label={`${project.name} hero`}
    >
      <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-14 sm:py-20">
        <div className="max-w-2xl">
          {/* Category kicker */}
          <div className="kicker kicker--light mb-5">
            {project.category}
          </div>

          {/* Project name */}
          <h1 className="text-display text-paper text-[clamp(2rem,4.5vw,3.5rem)] mb-4">
            {project.name}
          </h1>

          {/* Tagline / Value proposition */}
          <p className="text-paper/70 text-lg leading-relaxed mb-8 max-w-xl">
            {project.tagline}
          </p>

          {/* CTA area */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--accent is-lg group"
            >
              <ExternalLink size={18} />
              Experience Live Demo
            </a>

            {(() => {
              const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/britannia-bloom/demo-day-follow-up';
              return (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--accent is-lg group"
                >
                  <Calendar size={18} />
                  Start a Conversation
                </a>
              );
            })()}

            {/* Login required indicator */}
            {project.requiresLogin && project.demoCredentials && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] bg-paper/10 border border-paper/10">
                <Lock size={14} className="text-lime/70" />
                <div className="text-paper/70 text-sm">
                  <span className="font-medium text-paper/90">Login required</span>
                  <span className="mx-1.5 text-paper/30">·</span>
                  <span className="font-mono text-xs">
                    {project.demoCredentials.username}
                  </span>
                  <span className="mx-1 text-paper/30">/</span>
                  <span className="font-mono text-xs">
                    {project.demoCredentials.password}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {project.heroGraphic ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
          <div className="absolute bottom-0 right-0 hidden h-[28rem] w-[28rem] translate-x-12 translate-y-12 overflow-hidden rounded-[2rem] border border-white/10 bg-paper/5 shadow-[0_40px_120px_-40px_rgba(255,255,255,0.8)] md:block">
            <Image
              src={project.heroGraphic}
              alt={`${project.name} hero graphic`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
              priority
            />
          </div>
        </div>
      ) : null}

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-paper to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
