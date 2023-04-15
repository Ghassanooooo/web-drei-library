import dynamic from "next/dynamic";
import { DashboardShell } from "@/modules/shared/components/shell";

const Library: any = dynamic(() => import("@/modules/library/pages"), {
  ssr: false,
});
export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  return (
    <DashboardShell>
      <Library />
    </DashboardShell>
  );
}
