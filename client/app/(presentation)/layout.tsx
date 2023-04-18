import "@/styles/reveal/reveal.scss";
import "@/styles/reveal/theme/source/black.scss";
import "@/plugin/highlight/atom-one-dark.css";
import "@/plugin/chalkboard/style.css";
import "@/plugin/customcontrols/style.css";
import "@/lib/fontawesome/css/all.min.css";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="reveal">
          <div className="slides">{children}</div>
        </div>
      </body>
    </html>
  );
}
