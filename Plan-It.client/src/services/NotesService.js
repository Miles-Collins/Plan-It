import { AppState } from "../AppState.js";
import { Note } from "../models/Note.js";
import { api } from "./AxiosService.js";

class NotesService {
  async createNote(noteBody) {
    const res = await api.post("api/notes", noteBody);
    AppState.notes.push(new Note(res.data));
  }

  async deleteNote(noteId) {
    await api.delete(`api/notes/${noteId}`);
    AppState.notes = AppState.notes.filter((note) => note.id != noteId);
  }
}

export const notesService = new NotesService();
