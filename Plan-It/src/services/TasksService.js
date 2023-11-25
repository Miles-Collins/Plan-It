import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TasksService {
  async getOne(taskId) {
    const project = await dbContext.Tasks.findById(taskId).populate('project sprint creator assignedTo notes')
    if(!project) {
      throw new BadRequest(`Could not find Task with ID: [${taskId}]!`)
    }

    return project
  }
  async delete(taskData) {
    const task = await this.getOne(taskData.taskId)
    if(task.creatorId != taskData.loggedInUser) {
      throw new Forbidden(`You do not have permission to delete Task: [${task.name}]!`)
    }
    await task.remove()
    return `Successfully removed Task: [${task.name}]!`
  }
  async editTask(taskData) {
    const task = await this.getOne(taskData.taskId)
    if(task.creatorId != taskData.loggedInUser) {
      throw new Forbidden(`You do not have permission to edit Task: [${task.name}]!`)
    }

    taskData.name ? task.name = taskData.name : null
    taskData.weight ? task.weight = taskData.weight : null
    taskData.isComplete ? task.isComplete = taskData.isComplete : null
    taskData.completedOn ? task.completedOn = taskData.completedOn : null

    await task.save()
    return task

  }
  async create(taskBody) {
    const task = await dbContext.Tasks.create(taskBody)
    await task.populate('creator')
    await task.populate('sprint')
    await task.populate('project')


    return task
  }
  async getTasksByProjectId(projectId) {
    const tasks = await dbContext.Tasks.find({projectId}).populate('project sprint creator assignedTo notes')
    return tasks
  }

}

export const tasksService = new TasksService()
