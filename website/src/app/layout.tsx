import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { viewport } from "@/config/seo-metadata";
import "./globals.css";
import AtomicBatFooter from "@/components/ab-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garden District GR",
  icons: "/favicon.ico",
  description: "Garden District GR - Your premier destination for authentic Cajun and Southern cuisine in Grand Rapids, Michigan.",
};

export { viewport };

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
        {children}
        <AtomicBatFooter/>
      </body>
    </html>
  );
}
