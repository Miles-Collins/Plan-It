import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tasksService } from "../services/TaskService.js";
import { assignService } from "../services/AssignService.js";

export class TasksController extends BaseController{
  constructor() {
    super('api/tasks')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/:id/assign', this.createAssign)
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

}
