"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Presenter } from "@/types/presenter";
import PresenterCard from "./PresenterCard";

interface SidebarProps {
  presenters: Presenter[];
}

export default function Sidebar({ presenters }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        className="
          fixed bottom-6 right-6 z-40
          lg:hidden
          w-14 h-14 rounded-full
          bg-ink text-paper
          shadow-lg hover:shadow-hover
          flex items-center justify-center
          transition-all duration-200
          active:scale-95
        "
        onClick={() => setMobileOpen(true)}
        aria-label="Open builder list"
        aria-controls="sidebar"
        aria-expanded={mobileOpen}
      >
        <Menu size={22} />
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        id="sidebar"
        className={`
          fixed top-[var(--header-height)] bottom-0 left-0
          z-40 w-[var(--sidebar-width)]
          bg-paper border-r border-border-default
          flex flex-col
          transition-transform duration-300 ease-[var(--ease-out)]
          
          /* Mobile: slide in from left */
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          
          /* Desktop: always visible */
          lg:translate-x-0
        `}
        aria-label="Builder navigation"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
          <div>
            <h2 className="text-label text-purple">Builders</h2>
            <p className="text-[0.75rem] text-ink-muted mt-0.5">
              {presenters.length} products
            </p>
          </div>

          {/* Mobile close */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-[var(--radius-sm)] hover:bg-cream transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close builder list"
          >
            <X size={18} className="text-ink-muted" />
          </button>
        </div>

        {/* Presenter list */}
        <nav
          className="flex-1 overflow-y-auto hide-scrollbar py-2 px-2"
          aria-label="Builder list"
        >
          <div className="space-y-0.5">
            {presenters.map((presenter) => (
              <div key={presenter.id} onClick={() => setMobileOpen(false)}>
                <PresenterCard presenter={presenter} />
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-border-default">
          <p className="text-[0.6875rem] text-ink-muted leading-relaxed">
            Spring &apos;26 Cohort
            <br />
            <span className="text-indigo-soft">Next Chapter Project</span>
          </p>
        </div>
      </aside>
    </>
  );
}
