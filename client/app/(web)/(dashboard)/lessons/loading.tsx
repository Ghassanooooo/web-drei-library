import { DashboardHeader } from "@/containers/header";
import { PostCreateButton } from "@/containers/post-create-button";
import { PostItem } from "@/containers/post-item";
import { DashboardShell } from "@/containers/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Lessons" text="Create and manage lessons.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
