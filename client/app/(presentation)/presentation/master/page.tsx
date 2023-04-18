//import Preloader from "@/containers/Redux/Preloader";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Master: any = dynamic(() => import("@/modules/presentation/Master"), {
  ssr: false,
});

async function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Master />
    </Suspense>
  );
}

export default Index;
