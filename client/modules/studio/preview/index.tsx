"use client";

import { Fragment } from "react";
import SlidesComponent from "@/containers/Slides";

import useStudioReveal from "@/hooks/useStudioReveal";

function Client() {
  useStudioReveal();

  return (
    <Fragment>
      <SlidesComponent />
    </Fragment>
  );
}

// @ts-ignore
export default Client;
