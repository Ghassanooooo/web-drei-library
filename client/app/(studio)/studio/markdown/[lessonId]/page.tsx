import dynamic from "next/dynamic";

const Studio: any = dynamic(() => import("@/modules/studio/markdown"), {
  ssr: false,
});

interface EditorPageProps {
  params: { lessonId: string };
}
async function Index({ params }: EditorPageProps) {
  const URL = "http://lessons-api:3011/lesson/" + params.lessonId;
  const res = await fetch(URL, { cache: "no-store" });
  const lesson = await res.json();

  console.log("lesson", lesson);
  return <Studio lesson={lesson} />;
}

export default Index;
