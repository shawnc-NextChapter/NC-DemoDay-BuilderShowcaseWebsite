"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-200
        ${
          scrolled
            ? "bg-ink/95 backdrop-blur-md shadow-lg"
            : "bg-ink"
        }
      `}
      style={{ height: "var(--header-height)" }}
    >
      <nav
        className="flex items-center justify-between h-full mx-auto px-6"
        style={{ maxWidth: "var(--page-max)" }}
        aria-label="Primary navigation"
      >
        {/* Branding */}
        <div className="flex items-center gap-3">
          {/* NC brand mark */}
          <a
            href="https://www.nextchapterproject.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 hover:opacity-80 transition-opacity"
            aria-label="Next Chapter Project"
          >
            <div
              className="w-[3px] h-7 bg-indigo-soft rounded-sm"
              aria-hidden="true"
            />
            <div className="flex flex-col leading-none">
              <span className="text-paper text-sm font-bold tracking-tight">
                next
              </span>
              <span className="text-paper text-sm font-bold tracking-tight">
                chapter
              </span>
            </div>
          </a>

          {/* Divider */}
          <div
            className="w-px h-6 bg-paper/20"
            aria-hidden="true"
          />

          {/* Event badge */}
          <Link 
            href="/" 
            className="flex flex-col leading-tight hover:opacity-80 transition-opacity group"
            aria-label="Demo Day Showcase home"
          >
            <span className="text-paper/90 text-[13px] font-semibold tracking-wide group-hover:text-paper transition-colors">
              Demo Day
            </span>
            <span className="text-label text-lime/80" style={{ fontSize: "0.5625rem" }}>
              Spring &apos;26
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <Link
            href="https://www.nextchapterproject.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost text-paper/60 hover:text-paper text-sm hidden sm:inline-flex"
          >
            About Next Chapter
          </Link>
          <Link href="/builders" className="btn btn--accent is-sm">
            View All Products
          </Link>
        </div>
      </nav>
    </header>
  );
}
