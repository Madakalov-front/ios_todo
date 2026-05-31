import { NotesUiProvider } from "@/app/providers/NotesUiProvider";
import { MainLayout } from "@/app/layout";

export function NotesPage() {
  return (
    <NotesUiProvider>
      <MainLayout />
    </NotesUiProvider>
  );
}
