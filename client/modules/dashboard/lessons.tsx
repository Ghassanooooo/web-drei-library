import { EmptyPlaceholder } from "@/containers/empty-placeholder";
import { DashboardHeader } from "@/containers/header";
import { LessonCreateButton } from "@/containers/lesson-create-button";
import { PostItem } from "@/containers/post-item";
import { buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";

export default function LessonsPage() {
  const posts: any = [];
  return (
    <>
      <DashboardHeader heading="Lessons" text="Create and manage lessons.">
        <LessonCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {posts.map((post: any) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="play" />
            <EmptyPlaceholder.Title>No lessons created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any lessons yet. Start creating content.
            </EmptyPlaceholder.Description>
            <LessonCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </>
  );
}
