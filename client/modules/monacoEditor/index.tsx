"use client";

import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";

const App = ({
  content,
  id,
  editorValue,
}: {
  content: string;
  id: string;
  editorValue: any;
}) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    console.log("hhh", editor, monaco);
    editorRef.current = editor;
  }
  async function handleEditorChange(value: any, event: any) {
    // const { data } = await updateMarkdown({ content: value, id });
    editorValue.current = value;
    console.log("here is the current model value:", value);
  }

  return (
    <div className="h-[100%] w-[100%]">
      <Editor
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
        }}
        height="100%"
        theme="vs-dark"
        defaultLanguage="markdown"
        defaultValue={content}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default App;
