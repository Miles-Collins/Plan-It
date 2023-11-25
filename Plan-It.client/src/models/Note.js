export class Note {
  constructor(data) {
    this.id = data.id;
    this.body = data.body;
    this.creator = data.creator;
    this.project = data.project;
    this.task = data.task;
  }
}
