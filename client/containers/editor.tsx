"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
//import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { postPatchSchema } from "@/lib/validations/post";
import { Icons } from "@/containers/icons";
import { buttonVariants } from "@/components/button";
import { useGetLessonQuery } from "@/store/services/lessonsService";

interface EditorProps {
  // post: Pick<Post, "id" | "title" | "content" | "published">;
}

type FormData = z.infer<typeof postPatchSchema>;

export default function Editor({ lesson }: any) {
  /*const {
    data: lesson,
    isLoading,
    isSuccess,
    isError,
    error,
  }: any = useGetLessonQuery(id);
  console.log(lesson, "useGetLessonQuery ", id);*/
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    // @ts-ignore
    const EditorJS = (await import("@editorjs/editorjs")).default;
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default;
    // @ts-ignore
    const Image = (await import("@editorjs/simple-image")).default;
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    // @ts-ignore
    const List = (await import("@editorjs/list")).default;
    // @ts-ignore
    const Code = (await import("@editorjs/code")).default;
    // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default;
    // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default;

    const body = postPatchSchema.parse(lesson);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your lesson...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: Image,
        },
      });
    }
  }, [lesson]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted && lesson) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor, lesson]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    const response = await fetch(`/api/lessons/${lesson.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }

    router.refresh();

    return toast({
      description: "Your post has been saved.",
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
              <p className="text-sm text-slate-600">
                {lesson.published ? "Published" : "Draft"}
              </p>
            </div>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </div>
          <div className="prose prose-stone mx-auto w-[800px]">
            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue={lesson.title}
              placeholder="Post title"
              className="w-full resize-none appearance-none overflow-hidden text-5xl font-bold focus:outline-none"
              {...register("title")}
            />
            <div id="editor" className="min-h-[500px]" />
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-slate-50 px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </div>
      </form>
    </React.Suspense>
  );
}
