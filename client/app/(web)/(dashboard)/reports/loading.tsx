import { DashboardHeader } from "@/containers/header";
import { DashboardShell } from "@/containers/shell";
import { Card } from "@/components/card";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Reports" text="Manage reports and analytics." />
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
