import dynamic from "next/dynamic";
import { Suspense } from "react";

const Client: any = dynamic(() => import("@/modules/studio"), {
  ssr: false,
});

async function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  );
}

export default Index;
