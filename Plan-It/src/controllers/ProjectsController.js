import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { projectsService } from "../services/ProjectsService.js"
import { sprintsService } from "../services/SprintsService.js"
import { notesService } from "../services/NotesService.js"
import { tasksService } from "../services/TaskService.js"

export class ProjectsController extends BaseController{
  constructor() {
    super('api/projects')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getOne)
    .get('/:id/sprints', this.getSprints)
    .get('/:id/notes', this.getNotes)
    .get('/:id/tasks', this.getTasks)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .post('/:id/notes', this.createNote)
    .post('/:id/task', this.createTask)
    .delete('/:id', this.delete)
    .delete('/:id/notes/:noteId', this.deleteNote)
    .delete('/:id/tasks/:taskId', this.deleteTask)
    .put('/:id/tasks/:taskId', this.editTask)
  }

  // SECTION PROJECTS

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

  // !SECTION

  // SECTION SPRINTS

  async getSprints (req, res, next) {
  try {
    const projectId = req.params.id
    const sprints = await sprintsService.getSprintsByProjectId(projectId)
    return res.send(sprints)
  } catch (error) {
    next(error)
  }
  }

  // !SECTION



  // SECTION NOTES

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

  // !SECTION

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

  // SECTION TASK

  async getTasks (req, res, next) {
  try {
    const projectId = req.params.projectId
    const projects = await tasksService.getTasksByProjectId(projectId)
    return res.send(projects)
  } catch (error) {
    next(error)
  }
  }

  async createTask (req, res, next) {
  try {
    const taskBody = req.body
    taskBody.creatorId = req.userInfo.id
    const task = await tasksService.create(taskBody)
    return res.send(task)
  } catch (error) {
    next(error)
  }
  }

  async editTask (req, res, next) {
  try {
    let taskData = req.body
    taskData = {projectId: req.params.id, loggedInUser: req.userInfo.id, taskId: req.params.taskId}
    const task = await tasksService.editTask(taskData)
    return res.send(task)
  } catch (error) {
    next(error)
  }
  }

  async deleteTask (req, res, next) {
  try {
    const taskData = {projectId: req.params.id, loggedInUser: req.userInfo.id, taskId: req.params.taskId}
    const message = await tasksService.delete(taskData)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }




  // !SECTION
}
