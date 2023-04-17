import { DashboardShell } from "@/containers/shell";
import dynamic from "next/dynamic";
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
