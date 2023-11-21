export class Project {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.creator = data.creator;
    this.createdAt = data.createdAt
      ? new Date(data.createdAt).toLocaleDateString("en-US")
      : new Date();
    this.updatedAt = data.updatedAt
      ? new Date(data.updatedAt).toLocaleDateString("en-US")
      : new Date();
  }
}

const project = {
  _id: "655b056584314ef58ed0876f",
  name: "Jurrasic Systems",
  description: "A Park like no other any *where* or *when* you go.",
  creatorId: "64adc599eb8cf726e2f42afd",
  createdAt: "2023-11-20T07:06:13.298Z",
  updatedAt: "2023-11-20T07:06:13.298Z",
  __v: 0,
  creator: {
    _id: "64adc599eb8cf726e2f42afd",
    subs: ["auth0|64adc599ee6719d9da99d383"],
    email: "neonquake@twitch.tv",
    name: "neonquake",
    picture:
      "https://s.gravatar.com/avatar/76991101ff9a76cfbc30255925c1ac33?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fne.png",
    createdAt: "2023-11-20T06:44:05.108Z",
    updatedAt: "2023-11-20T06:44:05.108Z",
    __v: 0,
    id: "64adc599eb8cf726e2f42afd",
  },
  id: "655b056584314ef58ed0876f",
};
