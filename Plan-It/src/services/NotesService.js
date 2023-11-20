import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class NotesService {

  async getOne(noteId) {
    const note = await dbContext.Notes.findById(noteId).populate('creator project task')
    if(!note) {
      throw new BadRequest(`No Note at ID: [${noteId}]`)
    }
    return note
  }
  async delete(noteData) {
    const note = await this.getOne(noteData.noteId)
    if(note.creatorId != noteData.loggedInUser) {
      throw new Forbidden(`You do not have permission to delete this note!`)
    }
    await note.remove()
    return `You have successfully delete the note!`
  }
  async getNotesByProjectId(projectId) {
    const notes = await dbContext.Notes.find({projectId}).populate('creator project task')
    return notes
  }
  async create(noteBody) {
    const note = await dbContext.Notes.create(noteBody)
    await note.populate('creator')
    await note.populate('project')
    await note.populate('task')
    return note
  }

}

export const notesService = new NotesService()
