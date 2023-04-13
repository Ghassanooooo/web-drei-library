import dynamic from "next/dynamic";

const Folder: any = dynamic(() => import("@/containers/Library/Folder"), {
  ssr: false,
});

function Index({ params }: any) {
  return <Folder id={params.folderId} />;
}

export default Index;
