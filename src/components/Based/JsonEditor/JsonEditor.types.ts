import { EditorProps } from "@monaco-editor/react";
import { height } from "@mui/system";
import { IBaseUIProps } from "./../types";

export interface IJsonEditorProps extends EditorProps {
  height: number;
  readOnly?: boolean;
}
