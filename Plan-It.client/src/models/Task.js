export class Task {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.weight = data.weight;
    this.projectId = data.projectId;
    this.sprintId = data.sprintId;
    this.creatorId = data.creatorId;
    this.notes = data.notes;
    this.isComplete = data.isComplete;
    this.sprint = data.sprint;
    this.createdAt = new Date(data.createdAt).toDateString("en-US");
  }
}
