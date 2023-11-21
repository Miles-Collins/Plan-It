import { AppState } from "../AppState.js";
import { Sprint } from "../models/Sprint.js";
import { api } from "./AxiosService.js";

class SprintsService {
  async getSprints(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`);
    AppState.sprints = res.data.map((sprint) => new Sprint(sprint));
  }
}

export const sprintsService = new SprintsService();
