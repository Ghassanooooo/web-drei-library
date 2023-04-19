import dynamic from "next/dynamic";
import { Suspense } from "react";

const MonacoEditor = dynamic(() => import("@/modules/monacoEditor"), {
  ssr: false,
});
const Studio: any = dynamic(() => import("@/modules/studio"), {
  ssr: false,
});

async function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-2 h-[100%]">
        <div className="span-1 h-[100%]">
          <MonacoEditor />
        </div>
        <div className="grid grid-row-2 span-1">
          <div className="row-span-1 bg-red-800"></div>
          <div className="row-span-1 bg-red-300"></div>
        </div>
      </div>
    </Suspense>
  );
}

export default Index;
