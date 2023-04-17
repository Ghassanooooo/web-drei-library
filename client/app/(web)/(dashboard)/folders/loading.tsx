import { DashboardHeader } from "@/containers/header";
import { DashboardShell } from "@/containers/shell";
import { Card } from "@/components/card";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Folder" text="Manage folder content." />
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
