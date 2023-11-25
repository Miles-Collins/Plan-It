import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createNote)
    .delete('/:id', this.deleteNote)
  }

    async createNote (req, res, next) {
  try {
    let noteBody = req.body
    noteBody = {...noteBody, creatorId: req.userInfo.id}
    const note = await notesService.create(noteBody)
    return res.send(note)
  } catch (error) {
    next(error)
  }
  }

    async deleteNote (req, res, next) {
  try {
    const noteData = {loggedInUser: req.userInfo.id, noteId: req.params.id}
    const message = await notesService.delete(noteData)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }
}
