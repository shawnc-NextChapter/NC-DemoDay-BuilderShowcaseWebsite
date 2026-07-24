import type { Presenter } from "@/types/presenter";
import { Bot } from "lucide-react";

interface TechStackProps {
  presenter: Presenter;
}

export default function TechStack({ presenter }: TechStackProps) {
  const { project } = presenter;

  return (
    <section
      className="px-6 sm:px-10 lg:px-14 py-10 bg-cream/40"
      aria-label="Technology stack"
    >
      <div className="max-w-3xl">
        <div className="kicker mb-6">Technology</div>

        {/* Tech Stack pills */}
        <div className="mb-8">
          <h3 className="text-heading text-base mb-4">Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="pill pill--default">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* AI Usage */}
        {project.aiUsage.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bot size={16} className="text-indigo" />
              <h3 className="text-heading text-base">AI-Assisted Development</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.aiUsage.map((usage) => (
                <span key={usage} className="pill pill--purple">
                  {usage}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
