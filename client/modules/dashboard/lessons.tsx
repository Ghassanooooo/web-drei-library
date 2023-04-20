"use client";
import { EmptyPlaceholder } from "@/containers/empty-placeholder";
import { DashboardHeader } from "@/containers/header";
import { LessonCreateButton } from "@/containers/lesson-create-button";
import { PostItem } from "@/containers/post-item";
import { buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  useGetLessonsQuery,
  useGetLessonQuery,
} from "@/store/services/lessonsService";

export default function LessonsPage() {
  const { data, isLoading, isSuccess, isError, error }: any =
    useGetLessonsQuery(null);

  return (
    <>
      <DashboardHeader heading="Lessons" text="Create and manage lessons.">
        <LessonCreateButton />
      </DashboardHeader>
      <div>
        {data?.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white shadow-sm p-4 min-h-screen auto-rows-min">
            {data?.map((lesson: any, index: number) => {
              return (
                <Link
                  key={index}
                  href={"/studio/markdown/" + lesson.id}
                  className="shadow-sm flex cursor-pointer h-10 border  rounded-md  border-slate-200"
                >
                  <div className="border-r px-2 flex items-center justify-center grow">
                    {lesson.id}
                  </div>
                </Link>
              );
            })}
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
