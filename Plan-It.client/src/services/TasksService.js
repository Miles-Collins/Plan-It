import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TasksService {
  async getTasks(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`);
    logger.log("[TASKS]", res.data);
    // AppState.tasks =
  }
}

export const tasksService = new TasksService();
