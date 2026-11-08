import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RentalSessionProvider } from "@/context/RentalSessionContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SewaKit — Sewa Alat Praktikum & Kegiatan Kampus Tel-U",
  description:
    "Platform sewa-menyewa peralatan praktikum, perangkat IoT, kamera multimedia, dan perlengkapan kepanitiaan antar mahasiswa Telkom University.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased">
        <RentalSessionProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </RentalSessionProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
