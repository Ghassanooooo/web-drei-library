import dynamic from "next/dynamic";

const Studio: any = dynamic(() => import("@/modules/studio/editor"), {
  ssr: false,
});

interface EditorPageProps {
  params: { lessonId: string };
}
async function Index({ params }: EditorPageProps) {
  const URL = "http://lessons-api:3011/lesson/" + params.lessonId;
  const res = await fetch(URL);
  const lesson = await res.json();
  return <Studio lesson={lesson} />;
}

export default Index;
