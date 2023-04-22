"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/containers/icons";
import {
  useGetLessonQuery,
  useCreateMarkdownHorizontalSlideMutation,
} from "@/store/services/lessonsService";
import { Suspense } from "react";

interface StudioNavProps {
  items: SidebarNavItem[];
}

export function StudioNav({ items }: any) {
  const { lessonId } = useParams();

  const { data, isLoading, isSuccess, isError, error }: any =
    useGetLessonQuery(lessonId);
  const [createMarkdownHorizontalSlide] =
    useCreateMarkdownHorizontalSlideMutation();

  //const path = usePathname();
  const onCreateSection = () => {
    createMarkdownHorizontalSlide(lessonId);
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <nav className="grid items-start gap-2 pt-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold text-gray-500">
          Horizontal Slides
        </h3>
        <span className="text-md cursor-pointer" onClick={onCreateSection}>
          <Icons.add>Icon</Icons.add>
        </span>
      </div>

      {data.content.map((item: any, index: any) => {
        const id = item._id;
        return (
          <Link key={index} href={""}>
            <span
              className={cn(
                "bg-white dark:bg-gray-200 shadow rounded-md pl-1 pr-14 py-2 flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 relative select-none ring-2 ring-emerald-400"
              )}
            >
              <Icons.dragHorizontal className="mr-2 h-4 w-4" />
              <span>{id.substring(0, 10)}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
