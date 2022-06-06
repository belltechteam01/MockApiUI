import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { IJsonEditorProps } from "./JsonEditor.types";
import { editor } from "monaco-editor";

export const JsonEditor = (props: IJsonEditorProps) => {
  const { height, readOnly = false, ...others } = props;
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  return (
    <Editor
      height={`${height}vh`}
      defaultLanguage="json"
      options={{ readOnly: readOnly, domReadOnly: readOnly }}
      {...others}
    />
  );
};
