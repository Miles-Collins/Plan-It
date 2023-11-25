import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class SprintsService {
  async getTasks(sprintId) {
    const tasks = await dbContext.Tasks.find({sprintId}).populate('notes creator sprint project')
    return tasks
  }

  async getOne(sprintId) {
    const sprint = await dbContext.Sprints.findById(sprintId).populate('creator project tasks')
    if(!sprint) {
      throw new BadRequest(`No Sprint at Id: ${sprintId}`)
    }
    return sprint
  }
  async delete(sprintData) {
    const sprint = await this.getOne(sprintData.id)
    if(sprint.creatorId != sprintData.loggedInUser) {
      throw new Forbidden(`You do not have permission to delete ${sprint.name}`)
    }
    await sprint.remove()
    return `Successfully deleted ${sprint.name}!`
  }
  async create(sprintBody) {
    const sprint = await dbContext.Sprints.create(sprintBody)
    await sprint.populate('creator')
    await sprint.populate('project')
    await sprint.populate('tasks')
    return sprint
  }
  async getSprintsByProjectId(projectId) {
    const sprints = await dbContext.Sprints.find({projectId}).populate('creator project tasks')
    return sprints
  }

}

export const sprintsService = new SprintsService()
