import type { Presenter } from "@/types/presenter";
import { AlertCircle, Lightbulb, Rocket, CheckCircle2, Users } from "lucide-react";

interface ProjectOverviewProps {
  presenter: Presenter;
}

export default function ProjectOverview({ presenter }: ProjectOverviewProps) {
  const { project } = presenter;

  return (
    <section className="px-6 sm:px-10 lg:px-14 py-10" aria-label="Product overview">
      <div className="kicker mb-8">Product Overview</div>

      <div className="space-y-10 max-w-3xl">
        {/* Problem */}
        <div className="transition-transform duration-300 ease-out origin-left hover:scale-[1.15] cursor-default">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-soft flex items-center justify-center">
              <AlertCircle size={16} className="text-purple" />
            </div>
            <h3 className="text-heading text-lg">The Problem</h3>
          </div>
          <p className="text-ink-muted leading-relaxed pl-[42px]">
            {project.problem}
          </p>
        </div>

        {/* Target Audience */}
        <div className="transition-transform duration-300 ease-out origin-left hover:scale-[1.15] cursor-default">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-teal-soft flex items-center justify-center">
              <Users size={16} className="text-teal" />
            </div>
            <h3 className="text-heading text-lg">Target Audience</h3>
          </div>
          <p className="text-ink-muted leading-relaxed pl-[42px]">
            {project.targetAudience}
          </p>
        </div>

        {/* Key Features */}
        <div className="transition-transform duration-300 ease-out origin-left hover:scale-[1.15] cursor-default">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-soft flex items-center justify-center">
              <CheckCircle2 size={16} className="text-teal" />
            </div>
            <h3 className="text-heading text-lg">Key Features</h3>
          </div>
          <div className="pl-[42px] space-y-3">
            {project.keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex gap-3 items-start"
              >
                <span className="text-label text-indigo-soft mt-0.5 shrink-0 w-5 text-center">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-ink/80 text-[0.9375rem] leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Biggest Challenge */}
        <div className="transition-transform duration-300 ease-out origin-left hover:scale-[1.15] cursor-default">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-bg flex items-center justify-center">
              <Lightbulb size={16} className="text-indigo" />
            </div>
            <h3 className="text-heading text-lg">Biggest Challenge</h3>
          </div>
          <p className="text-ink-muted leading-relaxed pl-[42px]">
            {project.biggestChallenge}
          </p>
        </div>

        {/* Future Plans (optional) */}
        {project.futurePlans && (
          <div className="transition-transform duration-300 ease-out origin-left hover:scale-[1.15] cursor-default">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-lime-soft flex items-center justify-center">
                <Rocket size={16} className="text-ink/70" />
              </div>
              <h3 className="text-heading text-lg">What&apos;s Next</h3>
            </div>
            <p className="text-ink-muted leading-relaxed pl-[42px]">
              {project.futurePlans}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
