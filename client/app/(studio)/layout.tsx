import { ReactNode } from "react";

import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/reveal/reveal.scss";
import "@/styles/reveal/theme/source/black.scss";
import "@/plugin/highlight/atom-one-dark.css";
import "@/plugin/chalkboard/style.css";
import "@/plugin/customcontrols/style.css";
import "@/lib/fontawesome/css/all.min.css";
import { siteConfig } from "@/config/site";
import { absoluteUrl, cn } from "@/lib/utils";
import { Providers } from "@/store/provider";
import { TailwindIndicator } from "@/containers/tailwind-indicator";
import { Toaster } from "@/components/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
      <head />
      <body>
        <Providers>{children}</Providers>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}

/*
 style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}

 style={{
            width: "100vw",
            height: "200px",
            backgroundColor: "black",
          }}

           style={{
              display: "flex",
            }}
*/
