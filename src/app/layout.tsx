import type { Metadata } from "next";
import { Special_Elite, Courier_Prime, Zeyada, Newsreader } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
});

const zeyada = Zeyada({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zeyada",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Tactile Nostalgia Message Portal",
  description: "A digital postal service that feels tangible. Analog warmth meets digital interactivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${specialElite.variable} ${courierPrime.variable} ${zeyada.variable} ${newsreader.variable} min-h-full flex flex-col font-body`}
      >
        {children}
      </body>
    </html>
  );
}
