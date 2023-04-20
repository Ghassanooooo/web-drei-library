import dynamic from "next/dynamic";

const Studio: any = dynamic(() => import("@/modules/studio"), {
  ssr: false,
});

async function Index() {
  return <Studio />;
}

export default Index;
