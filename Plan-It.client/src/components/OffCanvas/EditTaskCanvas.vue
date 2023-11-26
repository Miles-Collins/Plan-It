<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="editTaskCanvas"
    aria-labelledby="editTaskCanvasLabel"
  >
    <div
      class="offcanvas-header d-flex flex-column align-items-stretch border-primary border-bottom p-0 px-1"
    >
      <div v-if="task" class="d-flex align-items-center p-3">
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        <h6
          class="text-primary m-0 p-0 ps-4 d-flex align-items-center"
          id="offcanvasTasksLabel"
        >
          <span class="text-danger"
            >S{{ taskIndex }} - {{ task.sprint.name }}</span
          >

          <span class="fs-4 px-1 mdi mdi-greater-than"></span>
          <span class="text-primary">{{ task.name }}</span>
        </h6>
      </div>
    </div>
    <div v-if="sprints && task" class="offcanvas-body">
      <div class="container-fluid">
        <form @submit.prevent="editTask" class="row align-items-center">
          <div class="col-12 mb-3">
            <label for="name">Name</label>
            <input
              class="form-control"
              v-model="editable.name"
              type="text"
              id="name"
            />
          </div>
          <div class="col-4">
            <label class="form-label" for="weight"
              >Weight <i class="text-secondary mdi mdi-weight"></i
            ></label>
            <input
              class="form-control"
              v-model="editable.weight"
              type="number"
              id="weight"
            />
          </div>
          <div class="col-8">
            <label class="form-label" for="sprint"
              >Sprint <i class="mdi mdi-run"></i
            ></label>
            <select
              v-model="editable.sprintId"
              class="form-select"
              aria-label="Default select example"
            >
              <option
                :value="sprint.id"
                v-for="sprint in sprints"
                :key="sprint.id"
              >
                {{ sprint.name }}
              </option>
            </select>
          </div>
          <div class="col-5">
            <button
              @click="editable.isComplete = false"
              :class="
                editable.isComplete == false
                  ? 'bg-gradient text-white'
                  : 'btn-outline-success'
              "
              class="btn rounded-pill w-100"
            >
              Pending
            </button>
          </div>
          <div class="col-2">
            <i class="text-primary fs-1 mdi mdi-minus"></i>
          </div>
          <div class="col-5">
            <button
              @click="editable.isComplete = true"
              :class="
                editable.isComplete == true
                  ? 'bg-gradient text-white'
                  : 'btn-outline-success'
              "
              class="btn rounded-pill w-100"
            >
              Done
            </button>
          </div>
          <div class="col-12 my-4">
            <div class="row justify-content-end">
              <div class="col-3">
                <button class="btn btn-outline">Cancel</button>
              </div>
              <div class="col-5">
                <button
                  type="submit"
                  role="submit"
                  class="btn bg-gradient-secondary w-100 text-light"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="row mt-3 justify-content-center">
          <div class="col-8 border-bottom border-primary text-center">
            <p class="fs-4 text-primary text-shadow">Notes</p>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 text-start mb-2">
            <p>Add a Note</p>
          </div>
          <div class="col-12">
            <form
              @keydown.enter.prevent="createNote"
              @submit.prevent="createNote"
            >
              <div class="input-group">
                <textarea
                  v-model="editable.body"
                  placeholder="Say Something..."
                  class="form-control"
                  rows="2"
                  aria-label="With textarea"
                ></textarea>
                <button
                  type="submit"
                  class="input-group-text bg-gradient-secondary text-white btn d-flex align-items-center"
                >
                  <i class="fs-1 mdi mdi-menu-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="row mt-4 justify-content-center">
          <div
            v-for="note in notes"
            :key="note.id"
            class="col-11 border border-primary p-3 mb-3 rounded"
          >
            <Note :note="note" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { AppState } from "../../AppState.js";
import Note from "../Notes/Note.vue";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { tasksService } from "../../services/TasksService.js";

export default {
  setup() {
    const sprints = computed(() => AppState.activeProject?.sprints);
    const firstSprint = computed(() => AppState.activeProject.sprints[0] || []);
    const editable = ref({});
    const task = computed(() => AppState.activeTask);
    const notes = computed(() => {
      let taskArray = [];
      if (task.value) {
        taskArray = AppState.notes.filter(
          (note) => note.taskId == task.value.id
        );
      }
      return taskArray;
    });

    watchEffect(() => {
      editable.value = AppState.activeTask;
    });

    const taskIndex = computed(() => {
      return (
        AppState.tasks.findIndex((task) => task.id == AppState.activeTask.id) +
        1
      );
    });
    return {
      editable,
      task,
      taskIndex,
      notes,
      sprints,
      firstSprint,

      async editTask() {
        try {
          let taskBody = editable.value;
          logger.log("[TASK BODY]", taskBody);
          await tasksService.edit(taskBody);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
  components: { Note },
};
</script>

<style scoped></style>
