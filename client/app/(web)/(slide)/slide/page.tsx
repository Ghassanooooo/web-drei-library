"use client";

//import TextareaAutosize from "react-textarea-autosize";

const md = `## Hello world

### This is a test


#### This is a test

#### This is a test

ajsdjkasdjsa

#### This is a test

#### This is a test`;
function lines(text: any) {
  return text.split("\n");
}

export default function EditorPage() {
  console.log(
    lines(md).map((line: any) => {
      if (line === "") {
        line = "$";
      }
      return line;
    })
  );
  return (
    <textarea
      autoFocus
      id="title"
      defaultValue={md}
      placeholder="Post title"
      className="w-full h-screen resize-none overflow-scroll"
    />
  );
}
