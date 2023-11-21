<template>
  <!-- SECTION PROJECTS OFF-CANVAS -->
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasProjects"
    aria-labelledby="offcanvasProjectsLabel"
  >
    <div class="offcanvas-header d-flex flex-column align-items-stretch">
      <div class="d-flex justify-content-between">
        <h5 class="text-primary" id="offcanvasProjectsLabel">Projects</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div>
        <p>for {{ account.email }}</p>
      </div>
    </div>
    <div class="offcanvas-body text-center">
      <div
        class="text-secondary border-bottom border-secondary d-flex fw-medium justify-content-between mb-2"
      >
        <p class="m-0 mb-2">NAME</p>
        <p class="m-0">STARTED</p>
      </div>
      <div
        class="d-flex justify-content-between py-2 selectable rounded"
        v-for="project in projects"
        :key="project.id"
      >
        <p class="m-0">{{ project.name }}</p>
        <p class="m-0">{{ project.createdAt }}</p>
      </div>
      <button
        data-bs-toggle="modal"
        data-bs-target="#createProjectModal"
        class="btn btn-outline-secondary mt-2 w-100"
      >
        Create Project
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { projectsService } from "../../services/ProjectsService.js";
import { AppState } from "../../AppState.js";

export default {
  setup() {
    onMounted(() => {
      getProjects();
    });
    async function getProjects() {
      try {
        await projectsService.getProjects();
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }

    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style></style>
