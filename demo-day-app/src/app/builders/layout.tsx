import Sidebar from "@/components/Sidebar";
import { getAllPresenters } from "@/lib/presenters";

export default function PresentersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const presenters = getAllPresenters();

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))]">
      <Sidebar presenters={presenters} />

      {/* Main content area */}
      <main
        className="flex-1 lg:ml-[var(--sidebar-width)]"
      >
        {children}
      </main>
    </div>
  );
}
