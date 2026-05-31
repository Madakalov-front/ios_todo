import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateNoteInput, Note, UpdateNoteInput } from "../model/types";
import {
  createNoteInDb,
  deleteNoteInDb,
  getAllNotes,
  getNoteById,
  updateNoteInDb,
} from "../lib/db";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Note", "NoteList"],
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      async queryFn() {
        try {
          const data = await getAllNotes();
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Note" as const, id })),
              { type: "NoteList", id: "LIST" },
            ]
          : [{ type: "NoteList", id: "LIST" }],
    }),
    getNoteById: builder.query<Note | undefined, string>({
      async queryFn(id) {
        try {
          const data = await getNoteById(id);
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      providesTags: (_result, _error, id) => [{ type: "Note", id }],
    }),
    createNote: builder.mutation<Note, CreateNoteInput | void>({
      async queryFn(input) {
        try {
          const data = await createNoteInDb(input ?? {});
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: [{ type: "NoteList", id: "LIST" }],
    }),
    updateNote: builder.mutation<Note, UpdateNoteInput>({
      async queryFn({ id, ...patch }) {
        try {
          const data = await updateNoteInDb(id, patch);
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Note", id },
        { type: "NoteList", id: "LIST" },
      ],
    }),
    deleteNote: builder.mutation<string, string>({
      async queryFn(id) {
        try {
          const data = await deleteNoteInDb(id);
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: (_result, _error, id) => [
        { type: "Note", id },
        { type: "NoteList", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
