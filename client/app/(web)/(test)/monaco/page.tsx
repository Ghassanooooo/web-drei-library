import dynamic from "next/dynamic";

const FoldersPage = dynamic(() => import("@/modules/monacoEditor"), {
  ssr: false,
});

export default async function EditorPage() {
  return <FoldersPage />;
}
