"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { cn } from "@/lib/utils";
import { Icons } from "@/containers/icons";
import { buttonVariants } from "@/components/button";
import { useCreateLessonsMutation } from "@/store/services/lessonsService";

interface FolderCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function LessonCreateButton({ className, ...props }: any) {
  const [createLesson]: any = useCreateLessonsMutation();
  const router = useRouter();
  const onCresteLessonHandler = async () => {
    const { data } = await createLesson();
    router.push(`/editor/${data.id}`);
  };
  return (
    <button
      onClick={onCresteLessonHandler}
      className={cn(buttonVariants(), className)}
      {...props}
    >
      <Icons.add className="mr-2 h-4 w-4" />
      New lesson
    </button>
  );
}
