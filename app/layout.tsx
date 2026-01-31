import type { Metadata } from "next";
import "./globals.css";
import BackToTopButton from "./components/BackToTopButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://pheakdey-dinin.vercel.app"),
  title: "Pheakdey & Dinin Wedding Invitation - ភក្តី និង ឌីនីន",
  description:
    "Join us in celebrating the wedding of Lmut Pheakdey & Srorn Dinin on February 27, 2026 at Koh Dach Village, Phnom Penh",
  keywords:
    "wedding, cambodian wedding, Pheakdey, Dinin, 2026, Phnom Penh, Koh Dach",
  openGraph: {
    title: "Pheakdey & Dinin Wedding Invitation",
    description:
      "Join us in celebrating the wedding of Lmut Pheakdey & Srorn Dinin on February 27, 2026 at Koh Dach Village, Phnom Penh",
    url: "https://pheakdey-dinin.vercel.app",
    siteName: "Pheakdey & Dinin Wedding",
    type: "website",
    images: [
      {
        url: "https://pheakdey-dinin.vercel.app/preview_link_image.jpg",
        secureUrl: "https://pheakdey-dinin.vercel.app/preview_link_image.jpg",
        width: 1200,
        height: 630,
        alt: "Pheakdey & Dinin Wedding Invitation - February 27, 2026",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    alternateLocale: "km_KH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pheakdey & Dinin Wedding Invitation",
    description:
      "Join us in celebrating the wedding of Lmut Pheakdey & Srorn Dinin on February 27, 2026 at Koh Dach Village, Phnom Penh",
    images: [
      {
        url: "https://pheakdey-dinin.vercel.app/preview_link_image.jpg",
        alt: "Pheakdey & Dinin Wedding Invitation",
      },
    ],
  },
  facebook: {
    appId: "1234567890", // Optional: Replace with your actual Facebook App ID if you have one
  },
  other: {
    "telegram:image": "https://pheakdey-dinin.vercel.app/preview_link_image.jpg",
    "telegram:title": "Pheakdey & Dinin Wedding Invitation",
    "telegram:description": "Join us in celebrating the wedding on February 27, 2026",
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
          href="/photos/initial_text_with_frame.png"
          as="image"
        />
        <link rel="preload" href="/photos/gate_background_1.jpg" as="image" />
        <link
          rel="preload"
          href="/fonts/Moul.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
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
      </head>
      <body className="antialiased">
        {children}

        {/* Back to top button */}
        <BackToTopButton />
      </body>
    </html>
  );
}
