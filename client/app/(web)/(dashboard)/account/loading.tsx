import { DashboardHeader } from "@/containers/header";
import { DashboardShell } from "@/containers/shell";
import { Card } from "@/components/card";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Account" text="Manage account" />
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
