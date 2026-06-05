import type { Metadata } from "next";
import { Roboto, Kantumruy_Pro } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["300", "400", "700"],
  variable: "--font-kantumruy-pro",
  display: "swap",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${kantumruyPro.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
