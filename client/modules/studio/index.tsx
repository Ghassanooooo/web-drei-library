"use client";

import { Fragment } from "react";
import SlidesComponent from "@/containers/Slides";

import useStudioReveal from "@/hooks/useStudioReveal";

function Studio() {
  useStudioReveal();

  return (
    <Fragment>
      <SlidesComponent />
    </Fragment>
  );
}

// @ts-ignore
export default Studio;
