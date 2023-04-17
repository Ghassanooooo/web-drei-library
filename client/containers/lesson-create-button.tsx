"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { cn } from "@/lib/utils";
import { Icons } from "@/containers/icons";
import { buttonVariants } from "@/components/button";

interface FolderCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function LessonCreateButton({ className, openModal, ...props }: any) {
  return (
    <button
      onClick={openModal}
      className={cn(buttonVariants(), className)}
      {...props}
    >
      <Icons.add className="mr-2 h-4 w-4" />
      New lesson
    </button>
  );
}
