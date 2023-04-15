import { DashboardHeader } from "@/modules/shared/components/header";
import { PostCreateButton } from "@/modules/shared/components/post-create-button";
import { PostItem } from "@/modules/shared/components/post-item";
import { DashboardShell } from "@/modules/shared/components/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
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
