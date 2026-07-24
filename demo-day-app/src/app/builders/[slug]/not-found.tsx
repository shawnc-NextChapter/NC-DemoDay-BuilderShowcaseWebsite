import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="kicker mb-6">404</div>
      <h1 className="text-display text-[clamp(2rem,4vw,3rem)] mb-4">
        Builder Not Found
      </h1>
      <p className="text-ink-muted text-lg max-w-md mb-8">
        The builder you&apos;re looking for doesn&apos;t exist or hasn&apos;t
        been published yet.
      </p>
      <Link href="/" className="btn btn--primary">
        Back to All Products
      </Link>
    </div>
  );
}
