import { useNotesUi } from "@/app/providers/NotesUiProvider";
import { useCreateNoteMutation } from "@/entities/note/api/notesApi";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonDefault } from "@/shared/ui";
import "./CreateNote.scss";

export const CreateNote = () => {
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const { selectNote } = useNotesUi();

  const handleCreate = async () => {
    const note = await createNote({ content: "" }).unwrap();
    selectNote(note.id);
  };

  return (
    <div className="create-note">
      <ButtonDefault
        block
        icon={<PlusOutlined />}
        loading={isLoading}
        onClick={() => void handleCreate()}
      >
        Создать заметку
      </ButtonDefault>
    </div>
  );
};
