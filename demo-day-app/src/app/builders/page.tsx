import { redirect } from "next/navigation";
import { getAllPresenters } from "@/lib/presenters";

export default function BuildersIndexPage() {
  const presenters = getAllPresenters();
  
  if (presenters.length > 0) {
    redirect(`/builders/${presenters[0].slug}`);
  }

  // Fallback if no presenters exist
  return (
    <div className="flex h-full items-center justify-center p-8 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold mb-4">No Builders Found</h2>
        <p className="text-ink-muted">There are currently no builders available to showcase.</p>
      </div>
    </div>
  );
}
