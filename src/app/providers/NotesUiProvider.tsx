import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface NotesUiContextValue {
  selectedNoteId: string | null;
  isEditing: boolean;
  searchQuery: string;
  setSelectedNoteId: (id: string | null) => void;
  setIsEditing: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
  selectNote: (id: string) => void;
}

const NotesUiContext = createContext<NotesUiContextValue | null>(null);

export function NotesUiProvider({ children }: { children: ReactNode }) {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectNote = useCallback((id: string) => {
    setSelectedNoteId(id);
    setIsEditing(false);
  }, []);

  const value = useMemo<NotesUiContextValue>(
    () => ({
      selectedNoteId,
      isEditing,
      searchQuery,
      setSelectedNoteId,
      setIsEditing,
      setSearchQuery,
      selectNote,
    }),
    [selectedNoteId, isEditing, searchQuery, selectNote],
  );

  return (
    <NotesUiContext.Provider value={value}>{children}</NotesUiContext.Provider>
  );
}

export function useNotesUi(): NotesUiContextValue {
  const ctx = useContext(NotesUiContext);
  if (!ctx) {
    throw new Error("useNotesUi must be used within NotesUiProvider");
  }
  return ctx;
}
