import { useNotesUi } from "@/app/providers/NotesUiProvider";
import { useGetNotesQuery } from "@/entities/note/api/notesApi";
import { useNoteSearch } from "@/shared/lib/hooks/useNoteSearch";
import { Spin } from "antd";
import { ListItem } from "./ListItem";
import "./NoteList.scss";

export function NoteList() {
  const { searchQuery } = useNotesUi();
  const { data: notes, isLoading } = useGetNotesQuery();
  const filteredNotes = useNoteSearch(notes, searchQuery);

  if (isLoading) {
    return (
      <div className="note-list note-list--loading">
        <Spin />
      </div>
    );
  }

  if (!filteredNotes.length) {
    return (
      <div className="note-list note-list--empty">
        <p>{searchQuery ? "Ничего не найдено" : "Нет заметок"}</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <div className="note-list__group">
        {filteredNotes.map((note) => (
          <ListItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
