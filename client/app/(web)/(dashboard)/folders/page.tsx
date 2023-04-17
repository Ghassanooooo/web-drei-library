import dynamic from "next/dynamic";
import { DashboardShell } from "@/containers/shell";

const FoldersPage: any = dynamic(() => import("@/modules/dashboard/folders"), {
  ssr: false,
});
export const metadata = {
  title: "Folders",
  description: "Manage folders",
};

export default async function Folders() {
  return (
    <DashboardShell>
      <FoldersPage />
    </DashboardShell>
  );
}
