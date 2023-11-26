import { AppState } from "../AppState.js";
import { Note } from "../models/Note.js";
import { Task } from "../models/Task.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TasksService {
  async getTasks(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`);
    logger.log("[TASKS]", res.data);
    AppState.tasks = res.data.map((task) => new Task(task));
  }

  async create(taskBody) {
    const res = await api.post("api/tasks", taskBody);
    AppState.tasks.push(new Task(res.data));
  }

  async delete(taskId) {
    await api.delete(`api/tasks/${taskId}`);
    AppState.tasks = AppState.tasks.filter((task) => task.id != taskId);
  }

  async getOne(taskId) {
    AppState.activeTask = null;
    const res = await api.get(`api/tasks/${taskId}`);
    AppState.activeTask = new Task(res.data);
  }

  async getNotes(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`);
    logger.log("[NOTES]", res.data);
    AppState.notes = res.data.map((note) => new Note(note));
  }

  async edit(taskBody) {
    const res = await api.put(`api/tasks/${taskBody.id}`, taskBody);
    debugger;
    const index = AppState.tasks.findIndex((task) => task.id == taskBody.id);
    const task = new Task(res.data);
    AppState.tasks.splice(index, 1, task);
  }
}

export const tasksService = new TasksService();
