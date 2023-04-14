import dynamic from "next/dynamic";

const Library: any = dynamic(() => import("@/modules/library/pages"), {
  ssr: false,
});

function Index() {
  return <Library />;
}

export default Index;
