import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { projectsService } from "../services/ProjectsService.js"
import { sprintsService } from "../services/SprintsService.js"
import { notesService } from "../services/NotesService.js"

export class ProjectsController extends BaseController{
  constructor() {
    super('api/projects')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getOne)
    .get('/:id/sprints', this.getSprints)
    .get('/:id/notes', this.getNotes)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .post('/:id/notes', this.createNote)
    .delete('/:id', this.delete)
    .delete('/:id/notes/:noteId', this.deleteNote)
  }

  async getAll (req, res, next) {
  try {
    const projects = await projectsService.getAll()
    return res.send(projects)
  } catch (error) {
    next(error)
  }
  }

  async getOne (req, res, next) {
  try {
    const projectId = req.params.id
    const project = await projectsService.getOne(projectId)
    return res.send(project)
  } catch (error) {
    next(error)
  }
  }

  async create (req, res, next) {
  try {
    const projectBody = req.body
    projectBody.creatorId = req.userInfo.id
    const project = await projectsService.create(projectBody)
    return res.send(project)
  } catch (error) {
    next(error)
  }
  }

  async delete (req, res, next) {
  try {
    const project = {id: req.params.id, creatorId: req.userInfo.id }
    const message = await projectsService.delete(project)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }

  // SPRINTS

  async getSprints (req, res, next) {
  try {
    const projectId = req.params.id
    const sprints = await sprintsService.getSprintsByProjectId(projectId)
    return res.send(sprints)
  } catch (error) {
    next(error)
  }
  }


  // NOTES

  async createNote (req, res, next) {
  try {
    const noteBody = req.body
    noteBody.creatorId = req.userInfo.id
    const note = await notesService.create(noteBody)
    return res.send(note)
  } catch (error) {
    next(error)
  }
  }

  async getNotes (req, res, next) {
  try {
    const projectId = req.params.id
    const notes = notesService.getNotesByProjectId(projectId)
    return res.send(notes)
  } catch (error) {
    next(error)
  }
  }

  async deleteNote (req, res, next) {
  try {
    const noteData = {loggedInUser: req.userInfo.id, projectId: req.params.id, noteId: req.params.noteId}
    const message = await notesService.delete(noteData)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }




}
