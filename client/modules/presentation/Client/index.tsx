"use client";

import { Fragment } from "react";
import SlidesComponent from "@/containers/Slides";

import useClientReveal from "@/hooks/useClientReveal";

function Client() {
  useClientReveal();

  return (
    <Fragment>
      <SlidesComponent />
    </Fragment>
  );
}

// @ts-ignore
export default Client;
