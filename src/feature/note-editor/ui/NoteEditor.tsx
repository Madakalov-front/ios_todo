import { useAutosave } from "../hooks/useAutosave";
import { Input } from "antd";
import "./NoteEditor.scss";

const { TextArea } = Input;

interface NoteEditorProps {
  noteId: string;
  content: string;
  onChange: (value: string) => void;
}

export function NoteEditor({ noteId, content, onChange }: NoteEditorProps) {
  useAutosave(noteId, content, true);

  return (
    <TextArea
      className="note-editor"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      autoSize={{ minRows: 16 }}
      placeholder="Введите текст в формате Markdown…"
    />
  );
}
