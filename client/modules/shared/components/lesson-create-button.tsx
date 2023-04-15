"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/modules/shared/hooks/use-toast";

import { cn } from "@/modules/shared/lib/utils";
import { Icons } from "@/modules/shared/components/icons";
import { buttonVariants } from "@/modules/shared/components/ui/button";

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
