import { notFound, redirect } from "next/navigation";

//import { authOptions } from "@/lib/auth";
//import { db } from "@/lib/db";
//import { getCurrentUser } from "@/lib/session";
import { Editor } from "@/containers/editor";

//async function getPostForUser(postId: any, userId: any) {
/*  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
}*/

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: any) {
  //const user = await getCurrentUser();

  //if (!user) {
  //  redirect(authOptions?.pages?.signIn || "/login");
  //}

  //const post = await getPostForUser(params.postId, user.id);

  /*if (!post) {
    notFound();
  }*/

  return (
    <Editor
      post={{
        id: params.postId,
        title: "Hello",
        content: "World",
        published: false,
      }}
    />
  );
}
