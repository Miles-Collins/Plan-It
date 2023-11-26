<template>
  <!-- SECTION PROJECTS OFF-CANVAS -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasTask"
    aria-labelledby="offcanvasTasksLabel"
  >
    <div
      class="offcanvas-header d-flex flex-column align-items-stretch border-primary border-bottom p-0 px-1"
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
          id="offcanvasTasksLabel"
        >
          <span class="text-danger"
            >S{{ taskIndex }} - {{ task.sprint.name }}</span
          >

          <span class="fs-4 px-1 mdi mdi-greater-than"></span>
          <span class="text-primary">{{ task.name }}</span>
        </h6>
        <i
          data-bs-toggle="offcanvas"
          data-bs-target="#editTaskCanvas"
          role="button"
          title="Edit Task"
          class="ps-2 fs-5 text-secondary mdi mdi-pen"
        ></i>
      </div>
    </div>
    <div v-if="task" class="offcanvas-body text-center">
      <div class="row">
        <div class="col-12 text-start">
          <p>Status</p>
        </div>
      </div>
      <div class="row justify-content-around align-items-center">
        <div class="col-5">
          <button
            :class="
              editable.isComplete == false
                ? 'bg-gradient text-white'
                : 'btn-outline-success'
            "
            class="btn p-0 rounded-pill w-100"
          >
            Pending
          </button>
        </div>
        <div class="col-2">
          <i class="text-primary fs-1 mdi mdi-minus"></i>
        </div>
        <div class="col-5">
          <button
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
      <div v-if="notes.length > 0" class="row mt-4 justify-content-center">
        <div
          v-for="note in notes"
          :key="note.id"
          class="col-11 border border-primary p-3 mb-3 rounded"
        >
          <Note :note="note" />
        </div>
      </div>
    </div>
    <div
      v-else
      class="offcanvas-body text-center d-flex align-items-center justify-content-center"
    >
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
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

    watchEffect(() => {
      editable.value = AppState.activeTask;
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

.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #000000;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
