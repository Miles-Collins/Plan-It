<template>
  <div class="container-fluid position-relative">
    <p
      role="button"
      title="Button to open off canvas for projects"
      class="fs-2 position-absolute project-canvas-button bg-gradient-secondary text-white text-center px-4"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasProjects"
      aria-controls="offcanvasProjects"
    >
      P
    </p>

    <p
      role="button"
      title="Button to open off modal for editing account."
      type="button"
      data-bs-target="#editAccountModal
"
      data-bs-toggle="modal"
      class="position-absolute account-setting-button fs-2 px-4 mdi mdi-cog-outline"
    ></p>

    <div v-if="project" class="row justify-content-center mt-3">
      <!-- TODO MAKE THIS A COMPONENT -->
      <div v-if="sprints" class="col-10">
        <h1 class="m-0">
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
            <button
              data-bs-toggle="modal"
              data-bs-target="#createSprintModal"
              class="btn btn-outline-primary px-5 text-center"
            >
              Add Sprint
            </button>
          </div>
        </div>
        <div
          v-for="sprint in sprints"
          :key="sprint.id"
          class="row justify-content-between border border-primary rounded"
        >
          <Sprint :sprint="sprint" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Sprint from "../components/Sprints/Sprint.vue";
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
      getNotes();
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

    async function getNotes() {
      try {
        const projectId = AppState.activeProject.id;
        await tasksService.getNotes(projectId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }

    return {
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),

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
  components: { Sprint },
};
</script>

<style scoped lang="scss">
p {
  margin: 0;
}

.account-setting-button {
  left: 0;
  top: 5rem;
  background-color: lightgrey;
  color: purple;
  width: 5rem;
  transition: ease-in-out 0.1s;
  opacity: 0.75;
}

.account-setting-button:hover {
  box-shadow: 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black;
  opacity: 1;
}

.project-canvas-button {
  left: 0;
  top: 1.5rem;
  width: 5rem;
  transition: ease-in-out 0.1s;
  opacity: 0.75;
}

.project-canvas-button:hover {
  box-shadow: 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black;
  opacity: 1;
}
</style>
