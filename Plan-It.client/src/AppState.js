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

  // SECTION TASKS

  /**  @type {import('./models/Task.js).Task[]} */
  tasks: [],
});
