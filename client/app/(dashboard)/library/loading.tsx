import { DashboardHeader } from "@/modules/shared/components/header";
import { DashboardShell } from "@/modules/shared/components/shell";
import { Card } from "@/modules/shared/components/ui/card";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
