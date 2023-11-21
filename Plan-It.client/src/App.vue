<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <ProjectCanvas />
  <CreateProject />
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar/Navbar.vue";
import ProjectCanvas from "./components/OffCanvas/ProjectCanvas.vue";
import CreateProject from "./components/Modals/CreateProject.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: { Navbar, ProjectCanvas, CreateProject },
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
