import { notFound, redirect } from "next/navigation";
import dynamic from "next/dynamic";
const Editor: any = dynamic(() => import("@/containers/editor"), {
  ssr: false,
});

interface EditorPageProps {
  params: { lessonId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  // Handle the error case where the post doesn't exist
  const URL = "http://lessons-api:3011/lesson/" + params.lessonId;
  const res = await fetch(URL);
  const lesson = await res.json();

  return <Editor lesson={lesson} />;
}

//
