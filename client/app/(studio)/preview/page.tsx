import dynamic from "next/dynamic";
import { Suspense } from "react";

const Preview: any = dynamic(() => import("@/modules/studio/preview"), {
  ssr: false,
});

async function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Preview />
    </Suspense>
  );
}

export default Index;
