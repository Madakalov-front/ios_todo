import { useUpdateNoteMutation } from "@/entities/note/api/notesApi";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useEffect, useRef } from "react";

export function useAutosave(
  noteId: string | null,
  content: string,
  enabled: boolean,
) {
  const [updateNote] = useUpdateNoteMutation();
  const debouncedContent = useDebounce(content, 500);
  const initialContentRef = useRef<string | null>(null);
  const noteIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!noteId || !enabled) return;

    if (noteIdRef.current !== noteId) {
      noteIdRef.current = noteId;
      initialContentRef.current = content;
      return;
    }

    if (initialContentRef.current === null) {
      initialContentRef.current = debouncedContent;
      return;
    }

    if (debouncedContent === initialContentRef.current) return;

    void updateNote({ id: noteId, content: debouncedContent });
    initialContentRef.current = debouncedContent;
  }, [noteId, debouncedContent, enabled, updateNote, content]);
}
