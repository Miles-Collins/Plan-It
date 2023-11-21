import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tasksService } from "../services/TasksService.js";
import { assignService } from "../services/AssignService.js";

export class TasksController extends BaseController{
  constructor() {
    super('api/tasks')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTask)
    .post('/:id/assign', this.createAssign)
    .put('/:id', this.editTask)
    .delete('/:id', this.deleteTask)
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


  async createAssign (req, res, next) {
  try {
    const assignBody = req.body
    assignBody.creatorId = req.userInfo.id
    const assign = await assignService.createAssign(assignBody)
    return res.send(assign)
  } catch (error) {
    next(error)
  }
  }

  async editTask (req, res, next) {
  try {
    let taskData = req.body
    taskData = {...taskData, loggedInUser: req.userInfo.id, taskId: req.params.id}
    const task = await tasksService.editTask(taskData)
    return res.send(task)
  } catch (error) {
    next(error)
  }
  }

    async deleteTask (req, res, next) {
  try {
    const taskData = {loggedInUser: req.userInfo.id, taskId: req.params.id}
    const message = await tasksService.delete(taskData)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }

}
