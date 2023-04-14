import dynamic from "next/dynamic";

const Folder: any = dynamic(() => import("@/modules/library/pages/folder"), {
  ssr: false,
});

function Index({ params }: any) {
  return <Folder id={params.folderId} />;
}

export default Index;
