import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Tactyqal Labs — Empower Your Kid To Build The Next App That Impacts Millions",
  description:
    "1:1 mentoring that takes teens from idea to a full-stack app in 8 weeks. No coding experience needed. Real revenue, top university admits, life-long support.",
  openGraph: {
    title: "Tactyqal Labs — Build The Next App That Impacts Millions, in 8 Weeks",
    description:
      "1:1 mentoring • Idea to full-stack app • No coding • Admissions to the best colleges",
    url: "https://tactyqal.com",
    siteName: "Tactyqal Labs",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
