import { useMemo } from "react";
import type { Note } from "@/entities/note/model/types";

export function useNoteSearch(notes: Note[] | undefined, query: string): Note[] {
  return useMemo(() => {
    if (!notes) return [];
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return notes;

    return notes.filter((note) => {
      const haystack = `${note.title}\n${note.content}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [notes, query]);
}
