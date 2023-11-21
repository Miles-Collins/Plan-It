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

  async createProject(projectBody) {
    const res = await api.post("api/projects", projectBody);
    AppState.projects.push(new Project(res.data));
    return new Project(res.data);
  }

  async setActiveProject(projectId) {
    const res = await api.get(`api/projects/${projectId}`);
    AppState.activeProject = new Project(res.data);
  }

  async deleteProject(projectId) {
    const res = await api.delete(`api/projects/${projectId}`);
    AppState.projects = AppState.projects.filter(
      (project) => project.id != projectId
    );
    AppState.activeProject = null;
    return res.data;
  }
}

export const projectsService = new ProjectsService();
