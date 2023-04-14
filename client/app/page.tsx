import Home from "@/modules/home/pages";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";

async function Index() {
  return <Home />;
}

export default Index;
