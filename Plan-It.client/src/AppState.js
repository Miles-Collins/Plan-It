import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  // SECTION PROJECTS

  /** @type {import('./models/Project.js').Project[]} */
  projects: [],

  /** @type {import('./models/Project.js').Project|null} */
  activeProject: null,

  // SECTION SPRINTS

  /**  @type {import('./models/Sprint.js).Sprint[]} */
  sprints: [],

  /** @type {import('./models/Sprint.js').Sprint|null} */
  activeSprint: null,

  // SECTION TASKS

  /**  @type {import('./models/Task.js).Task[]} */
  tasks: [],
  /** @type {import('./models/Task.js').Task|null} */
  activeTask: null,
  /**  @type {import('./models/Note.js).Note[]} */
  notes: [],
});
