import { useNotesUi } from "@/app/providers/NotesUiProvider";
import type { Note } from "@/entities/note/model/types";
import "./ListItem.scss";

function formatNoteDate(timestamp: number): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(new Date(timestamp));
}

function getPreview(note: Note): string {
  const line = note.content.split("\n").find((row) => row.trim()) ?? "";
  return line.replace(/^#+\s*/, "").trim() || "Без содержимого";
}

interface ListItemProps {
  note: Note;
}

export function ListItem({ note }: ListItemProps) {
  const { selectedNoteId, selectNote } = useNotesUi();
  const isActive = selectedNoteId === note.id;

  return (
    <button
      type="button"
      className={["note-list__item", isActive && "note-list__item--active"]
        .filter(Boolean)
        .join(" ")}
      onClick={() => selectNote(note.id)}
    >
      <span className="note-list__title">{note.title}</span>
      <span className="note-list__preview">{getPreview(note)}</span>
      <span className="note-list__date">{formatNoteDate(note.updatedAt)}</span>
    </button>
  );
}
