<template>
  <div
    class="modal fade"
    id="createTaskModal"
    tabindex="-1"
    aria-labelledby="createTask"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-white border-bottom border-black">
          <h1
            v-if="sprint"
            class="modal-title text-primary fs-5"
            id="createTask"
          >
            <span class="text-danger"
              ><img
                class="img-fluid mountain pe-3"
                src="../../assets/img/Moutain.png"
              />S{{ sprintIndex + 1 }} {{ sprint.name }}</span
            >
            > Create Task
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <form @submit.prevent="createTask">
              <div class="row justify-content-between">
                <div class="mb-3 col-6">
                  <label for="name" class="form-label">Task Name</label>
                  <input
                    v-model="editable.name"
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    aria-describedby="helpId"
                    placeholder=""
                    maxlength="25"
                  />
                  <small id="helpId" class="form-text text-muted"
                    >Max length 25</small
                  >
                </div>
                <div class="mb-3 col-6">
                  <label for="weight" class="form-label"
                    >Task Weight <i class="text-secondary mdi mdi-weight"></i
                  ></label>
                  <input
                    v-model="editable.weight"
                    class="form-control"
                    name="weight"
                    id="weight"
                  />
                  <small id="helpDescription" class="form-text text-muted"
                    >Set a weight between 1 - 10</small
                  >
                </div>
                <div class="text-end">
                  <button
                    data-bs-dismiss="modal"
                    aria-label="Cancel"
                    class="btn mx-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn bg-gradient-secondary text-white px-5"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { tasksService } from "../../services/TasksService.js";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { AppState } from "../../AppState.js";

export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      sprint: computed(() => AppState.activeSprint),
      sprintIndex: computed(() =>
        AppState.sprints.findIndex(
          (sprint) => sprint.id == AppState.activeSprint.id
        )
      ),

      async createTask() {
        try {
          let taskBody = editable.value;
          taskBody = {
            ...taskBody,
            projectId: AppState.activeProject.id,
            sprintId: AppState.activeSprint.id,
          };
          await tasksService.create(taskBody);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
};
</script>

<style scoped>
.mountain {
  height: 2rem;
}
</style>
