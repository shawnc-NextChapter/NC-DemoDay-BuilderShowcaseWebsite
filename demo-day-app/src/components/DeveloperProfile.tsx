import Image from "next/image";
import type { Presenter } from "@/types/presenter";
import { Award, BookOpen } from "lucide-react";

interface DeveloperProfileProps {
  presenter: Presenter;
}

export default function DeveloperProfile({ presenter }: DeveloperProfileProps) {
  return (
    <section className="px-6 sm:px-10 lg:px-14 py-10" aria-label="Meet the builder">
      <div className="kicker mb-8">Meet the Builder</div>

      <div className="max-w-3xl">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          <div className="shrink-0">
            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-cream ring-offset-2 ring-offset-paper bg-ink/5 flex items-center justify-center">
              {presenter.headshot ? (
                <Image
                  src={presenter.headshot}
                  alt={presenter.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <span className="text-3xl font-bold text-ink-muted">
                  {presenter.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Name + Bio */}
          <div className="flex-1">
            <h3 className="text-heading text-xl mb-2">{presenter.name}</h3>
            <p className="text-ink-muted leading-relaxed">{presenter.bio}</p>
          </div>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Proudest Accomplishment */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-lime-soft flex items-center justify-center">
                <Award size={14} className="text-ink/70" />
              </div>
              <h4 className="text-label text-ink-muted">
                Proudest Accomplishment
              </h4>
            </div>
            <p className="text-sm text-ink/80 leading-relaxed">
              {presenter.proudestAccomplishment}
            </p>
          </div>

          {/* Lesson Learned */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-indigo-bg flex items-center justify-center">
                <BookOpen size={14} className="text-indigo" />
              </div>
              <h4 className="text-label text-ink-muted">
                Lesson Learned
              </h4>
            </div>
            <p className="text-sm text-ink/80 leading-relaxed">
              {presenter.lessonLearned}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
