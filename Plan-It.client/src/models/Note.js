export class Note {
  constructor(data) {
    this.id = data.id;
    this.body = data.body;
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.project = data.project;
    this.projectId = data.projectId;
    this.task = data.task;
    this.taskId = data.taskId;
  }
}
