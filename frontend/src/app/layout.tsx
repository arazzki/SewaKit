import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SewaKit — Platform Sewa Alat Kuliah Antar-Mahasiswa",
  description:
    "Platform sewa-menyewa perangkat IoT, elektronika, multimedia, dan perlengkapan kuliah antar-mahasiswa dengan sistem deposit dan COD kampus.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}