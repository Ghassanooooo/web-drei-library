import RevealChalkboard from "@/plugin/chalkboard/plugin.js";
import RevealCustomControls from "@/plugin/customcontrols/plugin.js";

import { useEffect } from "react";
import Reveal from "@/lib/reveal/reveal.js";
import RevealMarkdown from "@/plugin/markdown/markdown.esm.js";
import RevealHighlight from "@/plugin/highlight/highlight.esm.js";
//import RevealAnything from "@/plugin/anything/plugin";
import RevealNotes from "@/plugin/notes/notes.esm.js";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "@/lib/socket";
import customcontrols from "./configuration/customcontrols";
import chalkboard from "./configuration/chalkboard";

// plugin to bootcast https://github.com/rajgoel/reveal.js-plugins/blob/master/seminar/plugin.js
// bootcast https://github.com/reveal/multiplex
// menu plugin https://github.com/denehyg/reveal.js-menu
// gen token https://github.com/reveal/multiplex/blob/master/index.js

export default function useMasterReveal() {
  function post(evt: any, state: any) {
    console.log("evt", evt);
    console.log("state", state);
    state.indexh = evt.indexh || 0;
    state.indexv = evt.indexv || 0;
    state.indexf = evt.indexf || 0;

    var messageData = {
      state: state,
      secret: "123456",

      socketId: "room-1",
      content: (evt || {}).content,
    };

    socket.emit("broadcast-multiplex", messageData);
  }

  const broadcast = (reveal: any) => {
    reveal.on("slidechanged", async ({ indexh, indexv }: any) => {
      // mutate({ indexh, indexv });

      socket.emit("update", { indexh, indexv });
      socket.on("reloadPage", () => {
        socket.emit("update", { indexh, indexv });
      });
    });

    // Monitor events that trigger a change in state
    const revealState = reveal.getState();
    reveal.on("slidechanged", (e: any) => post(e, revealState));
    reveal.on("fragmentshown", (e: any) => post(e, revealState));
    reveal.on("fragmenthidden", (e: any) => post(e, revealState));
    reveal.on("overviewhidden", (e: any) => post(e, revealState));
    reveal.on("overviewshown", (e: any) => post(e, revealState));
    reveal.on("paused", (e: any) => post(e, revealState));
    reveal.on("resumed", (e: any) => post(e, revealState));
    // broadcast custom events w/o recipient which are sent by other plugins
    document.addEventListener("broadcast", (e) => post(e, revealState));
  };
  useEffect(() => {
    (async () => {
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
      reveal.initialize({
        showNotes: true,
        defaultTiming: 123,
        totalTime: 123,
        chalkboard,
        customcontrols,
      });

      reveal.layout();
      console.log(reveal.getTotalSlides(), "getTotalSlides");
      console.log(reveal.getVerticalSlides(), "getVerticalSlides");
      console.log(reveal.getState(), "getState");
      console.log(reveal.getSlidesAttributes(), "getSlidesAttributes");

      console.log(reveal.getSlides(), "getSlides");

      console.log(reveal.getHorizontalSlides(), "getHorizontalSlides");
      console.log(reveal.getCurrentSlide(), "CurrentSlide");
      console.log(reveal.getConfig(), "getConfig");

      broadcast(reveal);
    })();
  }, []);
  return null;
}
