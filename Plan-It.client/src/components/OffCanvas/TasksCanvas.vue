<template>
  <!-- SECTION PROJECTS OFF-CANVAS -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasTask"
    aria-labelledby="offcanvasTasksLabel"
  >
    <div
      class="offcanvas-header d-flex flex-column align-items-stretch border-primary border-bottom"
    >
      <div v-if="task" class="d-flex align-items-center">
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        <h6
          class="text-primary m-0 p-0 ps-4 d-flex align-items-center"
          id="offcanvasTasksLabel
"
        >
          <span class="text-danger"
            >S{{ taskIndex }} - {{ task.sprint.name }}</span
          >

          <span class="fs-4 px-1 mdi mdi-greater-than"></span>
          <span class="text-primary">{{ task.name }}</span>
        </h6>
      </div>
    </div>
    <div class="offcanvas-body text-center">
      <div class="row">
        <div class="col-12 text-start">
          <p>Status</p>
        </div>
      </div>
      <div class="row justify-content-around align-items-center">
        <div class="col-5">
          <button class="btn bg-gradient text-white rounded-pill w-100">
            Pending
          </button>
        </div>
        <div class="col-2">
          <i class="text-primary fs-1 mdi mdi-minus"></i>
        </div>
        <div class="col-5">
          <button class="btn btn-outline-success rounded-pill w-100">
            Done
          </button>
        </div>
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-8 border-bottom border-primary text-center">
          <p class="fs-4 text-primary text-shadow">Notes</p>
        </div>
      </div>
      <!-- SECTION NOTE FORM -->
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
          class="col-10 border border-primary p-3 mb-3 rounded"
        >
          <Note :note="note" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { AppState } from "../../AppState.js";
import { notesService } from "../../services/NotesService.js";
import Note from "../Notes/Note.vue";

export default {
  setup() {
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
    const taskIndex = computed(() => {
      return (
        AppState.tasks.findIndex((task) => task.id == AppState.activeTask.id) +
        1
      );
    });

    return {
      editable,
      notes,
      task,
      taskIndex,
      account: computed(() => AppState.account),

      async createNote() {
        try {
          let noteBody = editable.value;
          noteBody = {
            ...noteBody,
            taskId: AppState.activeTask.id,
            projectId: AppState.activeProject.id,
          };
          await notesService.createNote(noteBody);
          editable.value = {};
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

<style scoped>
textarea {
  height: 3.5rem;
}
button {
  height: 3.5rem;
}
</style>
