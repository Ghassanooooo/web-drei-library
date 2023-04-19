"use client";

import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";

const App = () => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    console.log("hhh", editor, monaco);
    editorRef.current = editor;
  }
  function handleEditorChange(value: any, event: any) {
    console.log("here is the current model value:", value);
  }
  return (
    <div className="h-[100%]">
      <Editor
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
        }}
        height="100%"
        theme="vs-dark"
        defaultLanguage="markdown"
        defaultValue="// some comment"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default App;
