import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import { ReactNode } from "react";

const Code = ({ children }: { children: ReactNode }) => {
  return (
    <code
      className={`${GeistMono.className} text-xs bg-zinc-100 p-1 rounded-md border`}
    >
      {children}
    </code>
  );
};
