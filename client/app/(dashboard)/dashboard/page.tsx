import { cn } from "@/modules/shared/lib/utils";
import { EmptyPlaceholder } from "@/modules/shared/components/empty-placeholder";
import { DashboardHeader } from "@/modules/shared/components/header";
import { PostCreateButton } from "@/modules/shared/components/post-create-button";
import { PostItem } from "@/modules/shared/components/post-item";
import { DashboardShell } from "@/modules/shared/components/shell";
import { buttonVariants } from "@/modules/shared/components/ui/button";
import LessonsPage from "@/modules/lessons/pages";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <LessonsPage />
    </DashboardShell>
  );
}
