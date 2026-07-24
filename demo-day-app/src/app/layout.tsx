import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Demo Day | Next Chapter — Spring '26",
    template: "%s | Next Chapter Demo Day",
  },
  description:
    "Explore the products built by Next Chapter's Spring 2026 cohort. Conference-quality showcases of real software built by justice-impacted technologists.",
  metadataBase: new URL("https://demo.nextchapterproject.org"),
  openGraph: {
    title: "Demo Day | Next Chapter — Spring '26",
    description:
      "Explore the products built by Next Chapter's Spring 2026 cohort.",
    type: "website",
    siteName: "Next Chapter Demo Day",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo Day | Next Chapter — Spring '26",
    description:
      "Explore the products built by Next Chapter's Spring 2026 cohort.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <div
          className="flex-1"
          style={{ paddingTop: "var(--header-height)" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
