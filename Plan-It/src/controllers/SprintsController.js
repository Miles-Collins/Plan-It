import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { sprintsService } from "../services/SprintsService.js";

export class SprintsController extends BaseController{
  constructor() {
    super('api/sprints')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .delete('/:id', this.delete)
  }

  async create (req, res, next) {
  try {
    const sprintBody = req.body
    sprintBody.creatorId = req.userInfo.id
    const sprint = await sprintsService.create(sprintBody)
    return res.send(sprint)
  } catch (error) {
    next(error)
  }
  }

  async delete (req, res, next) {
  try {
    const sprintData = {id: req.params.id, loggedInUser: req.userInfo.id}
    const message = await sprintsService.delete(sprintData)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }


}
