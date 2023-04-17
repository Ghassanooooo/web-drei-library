import dynamic from "next/dynamic";
import { DashboardShell } from "@/containers/shell";

const FolderPage: any = dynamic(() => import("@/modules/dashboard/folder"), {
  ssr: false,
});
export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function Folder({ params }: any) {
  const { folderId } = params;
  console.log(folderId, "Folder Id");
  return (
    <DashboardShell>
      <FolderPage id={folderId} />
    </DashboardShell>
  );
}
