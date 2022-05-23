import { EditorProps } from '@monaco-editor/react';

export interface IJsonEditorProps extends EditorProps {
  height: number;
  readOnly?: boolean;
}
