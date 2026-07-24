import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPresenterBySlug, getAllPresenterSlugs } from "@/lib/presenters";
import ProjectHero from "@/components/ProjectHero";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import QuickFacts from "@/components/QuickFacts";
import ProjectOverview from "@/components/ProjectOverview";
import TechStack from "@/components/TechStack";
import DeveloperProfile from "@/components/DeveloperProfile";
import FooterLinks from "@/components/FooterLinks";

interface PresenterPageProps {
  params: Promise<{ slug: string }>;
}

// Static generation: pre-render all presenter pages at build time
export async function generateStaticParams() {
  return getAllPresenterSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata per presenter
export async function generateMetadata({
  params,
}: PresenterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const presenter = getPresenterBySlug(slug);

  if (!presenter) {
    return { title: "Builder Not Found" };
  }

  return {
    title: `${presenter.project.name} by ${presenter.name}`,
    description: presenter.project.tagline,
    openGraph: {
      title: `${presenter.project.name} | Next Chapter Demo Day`,
      description: presenter.project.tagline,
      type: "article",
    },
  };
}

export default async function PresenterPage({ params }: PresenterPageProps) {
  const { slug } = await params;
  const presenter = getPresenterBySlug(slug);

  if (!presenter) {
    notFound();
  }

  return (
    <article>
      {/* 1. Product Hero */}
      <div className="animate-fade-in">
        <ProjectHero presenter={presenter} />
      </div>

      {/* 2. Screenshots Gallery */}
      <div className="animate-fade-in-up delay-1">
        <ScreenshotGallery presenter={presenter} />
      </div>

      {/* 3. Quick Facts */}
      <div className="animate-fade-in-up delay-2">
        <QuickFacts presenter={presenter} />
      </div>

      {/* 4. Product Overview (Problem, Features, Challenge, Future) */}
      <div className="animate-fade-in-up delay-3">
        <ProjectOverview presenter={presenter} />
      </div>

      {/* 5. Technology Stack + AI Usage */}
      <div className="animate-fade-in-up delay-4">
        <TechStack presenter={presenter} />
      </div>

      {/* 6. Meet the Builder */}
      <div className="animate-fade-in-up delay-5">
        <DeveloperProfile presenter={presenter} />
      </div>

      {/* 7. Professional Links */}
      <div className="animate-fade-in-up delay-6">
        <FooterLinks presenter={presenter} />
      </div>

      {/* Page footer */}
      <footer className="px-6 sm:px-10 lg:px-14 py-8 bg-cream/40 animate-fade-in delay-7">
        <div className="max-w-3xl">
          <p className="text-[0.75rem] text-ink-muted">
            Spring &apos;26 Demo Day · Next Chapter Project
          </p>
        </div>
      </footer>
    </article>
  );
}
