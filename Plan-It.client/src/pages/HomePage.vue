<template>
  <div class="container-fluid position-relative">
    <p
      role="button"
      title="Button to open off canvas for projects"
      class="fs-2 mt-3 position-absolute top-0 start-0 bg-primary text-white px-4"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasProjects"
      aria-controls="offcanvasProjects"
    >
      P
    </p>

    <div v-if="project" class="row justify-content-center mt-3">
      <!-- TODO MAKE THIS A COMPONENT -->
      <div class="col-10">
        <h1>
          {{ project.name }}
          <span
            role="button"
            type="button"
            :title="'Delete ' + project.name"
            @click="deleteProject(project.name)"
            class="ps-3 text-secondary mdi mdi-delete-forever"
          ></span>
        </h1>
        <p>{{ project.description }}</p>
        <!-- TODO MAKE THIS A COMPONENT AS WELL -->
        <div class="row my-5">
          <div class="col-6">
            <p class="fs-5 text-primary fw-semibold">Sprints</p>
            <p>
              Group your tasks into sprints for over-arching collections for
              better organization.
            </p>
          </div>
          <!-- Add Sprint -->
          <div class="col-6 text-end">
            <button class="btn btn-outline-primary px-5 text-center">
              Add Sprint
            </button>
          </div>
        </div>
        <div v-for="sprint in sprints" :key="sprint.id" class="row">
          <div class="col-2">
            {{ sprint.name }}
          </div>
          <div class="col-1">
            <i class="mdi mdi-weight"></i>{{ sprint.weight }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { projectsService } from "../services/ProjectsService.js";
import { sprintsService } from "../services/SprintsService.js";
import { tasksService } from "../services/TasksService.js";

export default {
  setup() {
    const project = computed(() => AppState.activeProject);
    watch(project, () => {
      getSprints();
      getTasks();
    });

    async function getSprints() {
      try {
        const projectId = AppState.activeProject.id;
        await sprintsService.getSprints(projectId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }

    async function getTasks() {
      try {
        const projectId = AppState.activeProject.id;
        await tasksService.getTasks(projectId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }

    return {
      project: computed(() => AppState.activeProject),
      sprints: computed(() =>
        AppState.sprints.sort((a, b) => a.weight - b.weight)
      ),

      async deleteProject(name) {
        try {
          const yes = await Pop.confirm(
            `Are you sure you want to delete ${name}?`
          );
          if (!yes) {
            return;
          }
          const message = await projectsService.deleteProject(
            AppState.activeProject.id
          );
          Pop.success(message);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
p {
  margin: 0;
}
</style>
