"use client";
import { Fragment } from "react";

import SlidesComponent from "@/containers/Slides";
import useMasterReveal from "@/hooks/useMasterReveal";

function Master() {
  useMasterReveal();

  return (
    <Fragment>
      <SlidesComponent />
    </Fragment>
  );
}

// @ts-ignore
export default Master;
