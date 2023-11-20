import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class ProjectsService {
  async getAll() {
    const projects = await dbContext.Projects.find().populate('creator')
    return projects
  }
  async getOne(projectId) {
    const project = await dbContext.Projects.findById(projectId).populate('creator')
    if(!project) {
      throw new BadRequest(`No project at ID: ${projectId}`)
    }
    return project
  }
  async create(projectBody) {
    const project = await dbContext.Projects.create(projectBody)
    await project.populate('creator')
    return project
  }
  async delete(project) {
    const foundProject = await this.getOne(project.id)
    if(foundProject.creatorId != project.creatorId) {
      throw new Forbidden(`You do not have permission to edit ${foundProject.name}`)
    }
    await foundProject.remove()
    return `You have successfully deleted ${foundProject.name}!`
  }

}

export const projectsService = new ProjectsService()
