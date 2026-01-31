import type { Metadata } from "next";
import "./globals.css";
import BackToTopButton from "./components/BackToTopButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding-pheakdey-dinin.vercel.app"),
  title: "Pheakdey & Dinin Wedding Invitation - ភក្តី និង ឌីនីន",
  description:
    "Join us in celebrating the wedding of Lmut Pheakdey & Srorn Dinin on February 27, 2026 at Koh Dach Village, Phnom Penh",
  keywords:
    "wedding, cambodian wedding, Pheakdey, Dinin, 2026, Phnom Penh, Koh Dach",
  openGraph: {
    title: "Pheakdey & Dinin Wedding Invitation",
    description:
      "Join us in celebrating the wedding of Lmut Pheakdey & Srorn Dinin on February 27, 2026 at Koh Dach Village, Phnom Penh",
    type: "website",
    images: [
      {
        url: "/meta-data-image.png",
        width: 1200,
        height: 630,
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
    images: ["/meta-data-image.png"],
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
