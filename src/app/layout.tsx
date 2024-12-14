import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/_components/layout/header";
import { Footer } from "@/app/_components/layout/footer";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ProgressBarProvider from "@/app/_components/providers/progress-bar-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider enableColorScheme enableSystem defaultTheme="system">
          <ProgressBarProvider>
            <div className="container">
              <Header />
              <main className="flex min-h-[calc(100vh-20rem)] max-w-3xl mx-auto items-center flex-col justify-between px-6 ">
                {children}
              </main>
              <Footer />
            </div>
            <Vercel />
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
