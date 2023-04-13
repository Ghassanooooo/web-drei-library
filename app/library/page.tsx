import dynamic from "next/dynamic";

const Library: any = dynamic(() => import("@/containers/Library"), {
  ssr: false,
});

function Index() {
  return <Library />;
}

export default Index;
