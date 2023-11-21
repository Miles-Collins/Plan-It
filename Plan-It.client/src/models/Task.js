export class Task {
  constructor(data) {
    this.id = data.id;
    this.weight = data.weight;
    this.projectId = data.projectId;
    this.sprintId = data.sprintId;
    this.creatorId = data.creatorId;
    this.isComplete = data.isComplete;
  }
}
