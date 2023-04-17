import { cn } from "@/lib/utils";
import { EmptyPlaceholder } from "@/containers/empty-placeholder";
import { DashboardHeader } from "@/containers/header";
import { PostCreateButton } from "@/containers/post-create-button";
import { PostItem } from "@/containers/post-item";
import { DashboardShell } from "@/containers/shell";
import LessonsPage from "@/modules/dashboard/lessons";

export const metadata = {
  title: "Dashboard",
};

export default async function Lessons() {
  return (
    <DashboardShell>
      <LessonsPage />
    </DashboardShell>
  );
}
