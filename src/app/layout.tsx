import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// self-hosted by next/font at build time — no external font request at runtime
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitnessClub — Train Better. Live Stronger.",
  description:
    "Twelve clubs on one keycard, 25+ class formats included, and coaches certified in both strength and rehab. Memberships from ₹1,499 a month, no joining fee and no lock-in.",
  openGraph: {
    title: "FitnessClub — Train Better. Live Stronger.",
    description:
      "12 clubs, one keycard. 200+ classes a month. Your first week is free — no card, no contract.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
