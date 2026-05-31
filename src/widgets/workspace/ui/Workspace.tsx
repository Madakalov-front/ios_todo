import { useNotesUi } from "@/app/providers/NotesUiProvider";
import { NoteEditor } from "@/feature/note-editor/ui/NoteEditor";
import {
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
} from "@/entities/note/api/notesApi";
import { renderMarkdownToHtml } from "@/shared/lib/markdown/renderMarkdown";
import { Button, Modal, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import "./Workspace.scss";

export function Workspace() {
  const {
    selectedNoteId,
    isEditing,
    setIsEditing,
    setSelectedNoteId,
  } = useNotesUi();

  const { data: note, isLoading } = useGetNoteByIdQuery(selectedNoteId ?? "", {
    skip: !selectedNoteId,
  });

  const [draftContent, setDraftContent] = useState("");
  const [deleteNote] = useDeleteNoteMutation();

  useEffect(() => {
    if (note) {
      setDraftContent(note.content);
    }
  }, [selectedNoteId]);

  const html = useMemo(
    () => (note ? renderMarkdownToHtml(note.content) : ""),
    [note],
  );

  const handleDelete = () => {
    if (!note) return;

    Modal.confirm({
      title: "Удалить заметку?",
      content: `«${note.title}» будет удалена без возможности восстановления.`,
      okText: "Удалить",
      okType: "danger",
      cancelText: "Отмена",
      onOk: async () => {
        await deleteNote(note.id).unwrap();
        setSelectedNoteId(null);
        setIsEditing(false);
      },
    });
  };

  if (!selectedNoteId) {
    return (
      <div className="workspace workspace--empty">
        <p className="workspace__placeholder-title">Выберите заметку</p>
        <p>или создайте новую в списке слева</p>
      </div>
    );
  }

  if (isLoading || !note) {
    return (
      <div className="workspace workspace--loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="workspace">
      <div className="workspace__toolbar">
        <h1 className="workspace__title">{note.title}</h1>
        <div className="workspace__actions">
          {!isEditing && (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          )}
          {isEditing && (
            <Button
              onClick={() => {
                setIsEditing(false);
                if (note) setDraftContent(note.content);
              }}
            >
              Готово
            </Button>
          )}
          <Button danger onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </div>

      <div className="workspace__body ios-scrollbar">
        {isEditing ? (
          <NoteEditor
            noteId={note.id}
            content={draftContent}
            onChange={setDraftContent}
          />
        ) : (
          <article
            className="workspace__markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
