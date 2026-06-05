import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Techpreneur Bootcamp 2026 - Launching Ceremony",
  description:
    "You are cordially invited to the Techpreneur Bootcamp 2026 Launching Ceremony on June 25th, 2026 at the Ministry of Posts and Telecommunications, Phnom Penh, Cambodia.",
  keywords:
    "Techpreneur, Bootcamp, DICHI Academy, ELIX, Cambodia, 2026, AI, Tech, Launching Ceremony",
  openGraph: {
    title: "Techpreneur Bootcamp 2026 - Launching Ceremony",
    description:
      "You are cordially invited to the Techpreneur Bootcamp 2026 Launching Ceremony on June 25th, 2026.",
    siteName: "Techpreneur Bootcamp 2026",
    type: "website",
    locale: "en_US",
    alternateLocale: "km_KH",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preload"
          href="/fonts/KhKantumruy-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GoogleSans-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Moul.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
