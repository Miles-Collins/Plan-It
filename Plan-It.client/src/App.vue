<template>
  <header class="shadow">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <ProjectCanvas />
  <TasksCanvas />
  <EditTaskCanvas />
  <EditAccount />
  <CreateProject />
  <CreateSprint />
  <CreateTask />
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar/Navbar.vue";
import CreateProject from "./components/Modals/CreateProject.vue";
import CreateSprint from "./components/Modals/CreateSprint.vue";
import CreateTask from "./components/Modals/CreateTask.vue";
import ProjectCanvas from "./components/OffCanvas/ProjectCanvas.vue";
import TasksCanvas from "./components/OffCanvas/TasksCanvas.vue";
import EditTaskCanvas from "./components/OffCanvas/EditTaskCanvas.vue";
import EditAccount from "./components/Modals/EditAccount.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: {
    Navbar,
    ProjectCanvas,
    CreateProject,
    CreateSprint,
    CreateTask,
    TasksCanvas,
    EditTaskCanvas,
    EditAccount,
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
