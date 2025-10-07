import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next";

const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kollektivly",
  description: "Kollektivly – Svenska CSR-projekt och samhällsinitiativ",
};

// Disable static generation for all pages (required for Cloudflare Pages with client components)
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
