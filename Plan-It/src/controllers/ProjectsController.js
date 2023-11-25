import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { projectsService } from "../services/ProjectsService.js"
import { sprintsService } from "../services/SprintsService.js"
import { notesService } from "../services/NotesService.js"
import { tasksService } from "../services/TasksService.js"

export class ProjectsController extends BaseController{
  constructor() {
    super('api/projects')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getOne)
    .get('/:id/sprints', this.getSprints)
    .get('/:id/tasks', this.getTasks)
    .get('/:id/notes', this.getNotes)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .post('/:id/sprints', this.createSprint)
    .delete('/:id', this.delete)
    .delete('/:id/sprints/:sprintId', this.deleteSprint)

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

  async createSprint (req, res, next) {
  try {
    const sprintBody = req.body
    sprintBody.creatorId = req.userInfo.id
    sprintBody.projectId = req.params.id
    const sprint = await sprintsService.create(sprintBody)
    return res.send(sprint)
  } catch (error) {
    next(error)
  }
  }

  async deleteSprint (req, res, next) {
  try {
    const sprintData = {projectId: req.params.id, sprintId: req.params.sprintId, loggedInUser: req.userInfo.id}
    const message = await sprintsService.delete(sprintData)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }



  // !SECTION

  // SECTION TASK

  async getTasks (req, res, next) {
  try {
    const projectId = req.params.id
    const projects = await tasksService.getTasksByProjectId(projectId)
    return res.send(projects)
  } catch (error) {
    next(error)
  }
  }

  async createTask (req, res, next) {
  try {
    let taskBody = req.body
    taskBody = {...taskBody, creatorId: req.userInfo.id, projectId: req.params.id}
    const task = await tasksService.create(taskBody)
    return res.send(task)
  } catch (error) {
    next(error)
  }
  }








  // !SECTION

  async getNotes (req, res, next) {
  try {
    const taskId = req.params.id
    const notes = await notesService.getNotesByProjectId(taskId)
    return res.send(notes)
  } catch (error) {
    next(error)
  }
  }
}
