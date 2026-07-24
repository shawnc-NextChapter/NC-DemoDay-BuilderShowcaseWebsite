import type { Presenter } from "@/types/presenter";
import { Tag, Layers, Cpu } from "lucide-react";

interface QuickFactsProps {
  presenter: Presenter;
}

export default function QuickFacts({ presenter }: QuickFactsProps) {
  const { project } = presenter;

  const facts = [
    {
      icon: Tag,
      label: "Category",
      value: project.category,
      pillClass: "pill--indigo",
    },
    {
      icon: Layers,
      label: "Tech Stack",
      value: `${project.techStack.length} technologies`,
      pillClass: "pill--purple",
    },
    {
      icon: Cpu,
      label: "AI-Assisted",
      value: project.aiUsage.length > 0
        ? project.aiUsage.join(", ")
        : "Not used",
      pillClass: "pill--lime",
    },
  ];

  return (
    <section className="px-6 sm:px-10 lg:px-14 py-8" aria-label="Quick facts">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-2 p-4 rounded-[var(--radius-md)] bg-cream/60 border border-border-default"
          >
            <div className="flex items-center gap-2">
              <fact.icon size={14} className="text-ink-muted" />
              <span className="text-label text-ink-muted">{fact.label}</span>
            </div>
            <p className="text-sm font-medium text-ink leading-snug">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
