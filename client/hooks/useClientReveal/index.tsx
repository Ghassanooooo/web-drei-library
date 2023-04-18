import { useEffect, useState, useMemo, useRef } from "react";
import Reveal from "@/lib/reveal/reveal.js";
import RevealMarkdown from "@/plugin/markdown/markdown.esm.js";
import RevealHighlight from "@/plugin/highlight/highlight.esm.js";
import RevealNotes from "@/plugin/notes/notes.esm.js";
import { socket } from "@/lib/socket";
import RevealChalkboard from "@/plugin/chalkboard/plugin.js";
import RevealCustomControls from "@/plugin/customcontrols/plugin.js";

import customcontrols from "./configuration/customcontrols";
export default function useClientReveal() {
  const socketId = "room-1";
  //const revealX = useRef(null);

  const broadcast = (reveal: any) => {
    socket.emit("reloadPage");
    socket.on("reciveUpdate", (data: any) => {
      reveal.slide(data.indexh, data.indexv);
    });
    socket.on(socketId, function (message: any) {
      // ignore data from sockets that aren't ours
      console.log(message, "message socketId");
      if (message.socketId !== socketId) {
        return;
      }

      if (message.state) {
        reveal.setState(message.state);
      }
      if (message.content) {
        // forward custom events to other plugins
        var event: any = new CustomEvent("received");
        event.content = message.content;
        document.dispatchEvent(event);
      }
    });
  };

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
    //room-1
    reveal.initialize({
      // Display presentation control arrows
      controls: false,
      // Enable keyboard shortcuts for navigation
      keyboard: false,
      // Enables touch navigation on devices with touch input
      touch: false,
      customcontrols,
    });
    broadcast(reveal);
    reveal.layout();
    console.log(reveal, "reveal");
  }, []);

  return null;
}
