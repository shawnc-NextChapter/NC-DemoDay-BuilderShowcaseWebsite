"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Presenter } from "@/types/presenter";

interface PresenterCardProps {
  presenter: Presenter;
}

export default function PresenterCard({ presenter }: PresenterCardProps) {
  const pathname = usePathname();
  const isActive = pathname === `/builders/${presenter.slug}`;

  return (
    <Link
      href={`/builders/${presenter.slug}`}
      className={`
        group block rounded-[var(--radius-md)] px-4 py-3
        transition-all duration-200
        border border-transparent
        ${
          isActive
            ? "bg-lime/10 border-lime/40"
            : "hover:bg-cream hover:border-border-default"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="flex items-start gap-3">
        {/* Active indicator */}
        <div
          className={`
            mt-1.5 w-2 h-2 rounded-full shrink-0
            transition-all duration-200
            ${
              isActive
                ? "bg-lime scale-100"
                : "bg-border-default scale-75 group-hover:bg-indigo-soft group-hover:scale-100"
            }
          `}
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          {/* Builder name */}
          <p
            className={`
              text-[0.9375rem] font-semibold leading-tight truncate
              transition-colors duration-150
              ${isActive ? "text-ink" : "text-ink/80 group-hover:text-ink"}
            `}
          >
            {presenter.name}
          </p>

          {/* Product name */}
          <p
            className={`
              text-[0.8125rem] leading-snug mt-0.5 truncate
              transition-colors duration-150
              ${
                isActive
                  ? "text-ink/70"
                  : "text-ink-muted group-hover:text-ink/60"
              }
            `}
          >
            {presenter.project.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
