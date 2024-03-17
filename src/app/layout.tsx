import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeyad Etman",
  description: "Zeyad's Space on the internet.",
};

const Vercel = () => {
  "use client";
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Header />
          <main className="flex min-h-[calc(100vh-20rem)] flex-col justify-between px-6 ">
            {children}
          </main>
          <Footer />
        </div>
        <Vercel />
      </body>
    </html>
  );
}
