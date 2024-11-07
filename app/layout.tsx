import "./globals.css";
import { LogoNext, LogoPython, LogoPhidata } from "./icons";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phidata + Vercel AI SDK + FastAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Link href="/">
          <div className="border-b p-4 flex flex-row gap-2">
            <LogoPhidata />
            <div className="text-sm text-zinc-500">+</div>
            <LogoPython />
            <div className="text-sm text-zinc-500">+</div>
            <LogoNext />
          </div>
        </Link>
        {children}
      </body>
    </html>
  );
}
