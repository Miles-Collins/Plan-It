export class Sprint {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.isOpen = data.isOpen;
    this.tasks = data.tasks;
    this.weight = data.weight;
    this.creatorId = data.creatorId;
    this.projectId = data.projectId;
  }
}
