import { dbContext } from "../db/DbContext.js"

class AssignService {
  async createAssign(assignBody) {
    const assign = await dbContext.Assigns.create(assignBody)
    await assign.populate('creator')
    await assign.populate('task')
    return assign
  }

}

export const assignService = new AssignService()
