import "@/styles/reveal/reveal.scss";
import "@/styles/reveal/theme/source/black.scss";
import "@/plugin/highlight/atom-one-dark.css";
import "@/plugin/chalkboard/style.css";
import "@/plugin/customcontrols/style.css";
import "@/lib/fontawesome/css/all.min.css";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="reveal">
      <div className="slides ">{children}</div>
    </div>
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
