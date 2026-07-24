import type { Presenter } from "@/types/presenter";
import { GitFork, UserRound, Globe, Code2, Calendar } from "lucide-react";

interface FooterLinksProps {
  presenter: Presenter;
}

export default function FooterLinks({ presenter }: FooterLinksProps) {
  const { links, project } = presenter;
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/britannia-bloom/demo-day-follow-up';

  const allLinks = [
    {
      href: project.liveUrl,
      label: "Live Demo",
      icon: Globe,
      accent: true,
      large: true,
    },
    ...(bookingUrl ? [{
      href: bookingUrl,
      label: "Start a Conversation",
      icon: Calendar,
      accent: true,
      large: true,
    }] : []),
    {
      href: project.repositoryUrl,
      label: "Repository",
      icon: Code2,
      accent: false,
    },
    {
      href: links.github,
      label: "GitHub",
      icon: GitFork,
      accent: false,
    },
    {
      href: links.linkedin,
      label: "LinkedIn",
      icon: UserRound,
      accent: false,
    },
    {
      href: links.portfolio,
      label: "Portfolio",
      icon: Globe,
      accent: false,
    },
  ];

  return (
    <section
      className="px-6 sm:px-10 lg:px-14 py-10 border-t border-border-default"
      aria-label="Professional links"
    >
      <div className="max-w-3xl">
        <div className="kicker mb-6">Connect</div>

        <div className="flex flex-wrap gap-3">
          {allLinks.filter(link => !!link.href).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn group ${link.accent ? "btn--accent" : "btn--secondary"} ${link.large ? "is-lg" : ""}`}
            >
              <link.icon
                size={16}
                className="transition-transform group-hover:-translate-y-0.5"
              />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
