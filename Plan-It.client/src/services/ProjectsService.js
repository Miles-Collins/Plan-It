import { AppState } from "../AppState.js";
import { Project } from "../models/Project.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProjectsService {
  async getProjects() {
    const res = await api.get("api/projects");
    // logger.log("[PROJECTS]", res.data);
    AppState.projects = res.data.map((project) => new Project(project));
  }
}

export const projectsService = new ProjectsService();
