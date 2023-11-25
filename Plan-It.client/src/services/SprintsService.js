import { AppState } from "../AppState.js";
import { Sprint } from "../models/Sprint.js";
import { Task } from "../models/Task.js";
import { api } from "./AxiosService.js";

class SprintsService {
  async getSprints(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`);
    AppState.sprints = res.data.map((sprint) => new Sprint(sprint));
  }

  async getTasks(sprintId) {
    const res = await api.get(`api/sprints/${sprintId}/tasks`);
    AppState.tasks = res.data.map((task) => new Task(task));
  }

  async create(sprintBody) {
    const res = await api.post("api/sprints", sprintBody);
    AppState.sprints.push(new Sprint(res.data));
  }

  async deleteSprint(sprintId) {
    const res = await api.delete(`api/sprints/${sprintId}`);
    AppState.sprints = AppState.sprints.filter(
      (sprint) => sprint.id != sprintId
    );
  }
}

export const sprintsService = new SprintsService();
