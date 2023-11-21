export class Sprint {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.isOpen = data.isOpen;
    this.creatorId = data.creatorId;
    this.projectId = data.projectId;
  }
}
