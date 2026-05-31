import Dexie, { type EntityTable } from "dexie";
import type { Note } from "../model/types";

export class NotesDatabase extends Dexie {
  notes!: EntityTable<Note, "id">;

  constructor() {
    super("NotesAppDB");
    this.version(1).stores({
      notes: "id, updatedAt, createdAt",
    });
  }
}

export const db = new NotesDatabase();

function deriveTitle(content: string, fallback = "Новая заметка"): string {
  const firstLine = content
    .split("\n")[0]
    ?.replace(/^#+\s*/, "")
    .trim();
  return firstLine || fallback;
}

const SEED_NOTES: Omit<Note, "id">[] = [
  {
    title: "Покупки",
    content: "Молоко, яйца, хлеб, сыр",
    createdAt: 0,
    updatedAt: 0,
  },
  {
    title: "React — JavaScript-библиотека",
    content:
      "# React — JavaScript-библиотека\n\nReact — библиотека для построения пользовательских интерфейсов.",
    createdAt: 0,
    updatedAt: 0,
  },
  {
    title: "Идеи для проекта",
    content: "FSD, PWA, IndexedDB, офлайн-режим",
    createdAt: 0,
    updatedAt: 0,
  },
];

export async function seedNotesIfNeeded(): Promise<void> {
  const count = await db.notes.count();
  if (count > 0) return;

  const base = Date.now();
  await db.notes.bulkAdd(
    SEED_NOTES.map((note, index) => {
      const ts = base - index * 86_400_000;
      return {
        id: crypto.randomUUID(),
        title: note.title || deriveTitle(note.content),
        content: note.content,
        createdAt: ts,
        updatedAt: ts,
      };
    }),
  );
}

export function deriveNoteTitle(content: string): string {
  return deriveTitle(content);
}

export async function getAllNotes(): Promise<Note[]> {
  await seedNotesIfNeeded();
  return db.notes.orderBy("updatedAt").reverse().toArray();
}

export async function getNoteById(id: string): Promise<Note | undefined> {
  await seedNotesIfNeeded();
  return db.notes.get(id);
}

export async function createNoteInDb(
  input: { title?: string; content?: string } = {},
): Promise<Note> {
  await seedNotesIfNeeded();
  const now = Date.now();
  const content = input.content ?? "";
  const note: Note = {
    id: crypto.randomUUID(),
    title: input.title ?? deriveTitle(content),
    content,
    createdAt: now,
    updatedAt: now,
  };
  await db.notes.add(note);
  return note;
}

export async function updateNoteInDb(
  id: string,
  patch: { title?: string; content?: string },
): Promise<Note> {
  const existing = await db.notes.get(id);
  if (!existing) {
    throw new Error("Note not found");
  }

  const content = patch.content ?? existing.content;
  const title =
    patch.title ??
    (patch.content !== undefined ? deriveTitle(content) : existing.title);

  const updated: Note = {
    ...existing,
    ...patch,
    title,
    content,
    updatedAt: Date.now(),
  };

  await db.notes.put(updated);
  return updated;
}

export async function deleteNoteInDb(id: string): Promise<string> {
  await db.notes.delete(id);
  return id;
}
