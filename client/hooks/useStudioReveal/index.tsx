import { useEffect, useState, useMemo, useRef } from "react";
import Reveal from "@/lib/reveal/reveal.js";
import RevealMarkdown from "@/plugin/markdown/markdown.esm.js";
import RevealHighlight from "@/plugin/highlight/highlight.esm.js";
import RevealNotes from "@/plugin/notes/notes.esm.js";
import RevealChalkboard from "@/plugin/chalkboard/plugin.js";
import RevealCustomControls from "@/plugin/customcontrols/plugin.js";

import customcontrols from "./configuration/customcontrols";
export default function useStudioReveal() {
  //const revealX = useRef(null);
  ///monaco-editor: https://github.com/microsoft/monaco-editor
  useEffect(() => {
    // @ts-ignore
    const reveal: any = new Reveal({
      plugins: [
        RevealChalkboard,
        RevealCustomControls,
        RevealMarkdown,
        RevealHighlight,
        RevealNotes,
      ],
    });
    // reveal.toggleMode();
    //room-1
    // reveal.toggleOverview(true);
    reveal.initialize({
      slideNumber: "c/t",
      // Disables the default reveal.js slide layout (scaling and centering)
      // so that you can use custom CSS layout
      disableLayout: false,
      // Display presentation control arrows
      controls: true,
      // Enable keyboard shortcuts for navigation
      keyboard: true,
      // Enables touch navigation on devices with touch input
      touch: true,
      customcontrols,
    });
    console.log(reveal, " useStudioReveal");
    //console.log(reveal.toggleOverview(), " toggleOverview");

    // console.log(reveal.getSlides(), " getSlides");
  }, []);

  return null;
}
