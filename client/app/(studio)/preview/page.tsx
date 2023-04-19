import dynamic from "next/dynamic";
const Client: any = dynamic(() => import("@/modules/studio/preview"), {
  ssr: false,
});

import { Suspense } from "react";

async function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  );
}

export default Index;
