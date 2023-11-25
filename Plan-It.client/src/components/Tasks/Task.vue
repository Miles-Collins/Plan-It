<template>
  <div class="row ps-5">
    <div class="col-8 col-xl-3 d-flex align-items-center">
      <p
        @click="setActive"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTask
"
        class="rounded-pill px-3 text-center"
        :class="randomColor"
      >
        {{ task.name }}
      </p>
      <i
        @click.prevent="deleteTask"
        role="button"
        type="button"
        :title="'Delete ' + task.name"
        class="selectable ps-2 fs-5 text-secondary mdi mdi-delete-forever"
      ></i>
    </div>
    <div class="mt-2">
      <p class="text-secondary">
        <i class="mdi mdi-run"></i> Created<i class="mdi mdi-circle-small"></i>
        {{ task.createdAt }}
      </p>
    </div>
    <div class="d-flex mt-2">
      <p v-if="task.notes">
        {{ task.notes.length }}
        <i class="text-primary text-shadow mdi mdi-message-reply-text"></i>
      </p>
      <p class="ps-4">
        {{ task.weight }}
        <i class="text-secondary mdi mdi-weight"></i>
      </p>
    </div>
  </div>
</template>

<script>
import { Task } from "../../models/Task.js";
import Pop from "../../utils/Pop.js";
import { logger } from "../../utils/Logger.js";
import { tasksService } from "../../services/TasksService.js";
import { AppState } from "../../AppState.js";
import { computed } from "vue";

export default {
  props: { task: { type: Object, required: true } },

  setup(props) {
    const bgColor = [
      "bg-info text-wite text-shadow",
      "bg-success text-black text-shadow",
      "bg-primary text-white text-shadow",
      "bg-secondary",
      "bg-warning text-black text-shadow",
      "bg-danger text-white text-shadow",
    ];
    const randomIndex = Math.floor(Math.random() * bgColor.length);
    const randomColor = bgColor[randomIndex];

    const notes = computed(() =>
      AppState.notes.filter((note) => note.taskId == props.id)
    );

    return {
      randomColor,
      notes,

      async deleteTask() {
        try {
          const taskId = props.task.id;
          await tasksService.delete(taskId);
          Pop.success(`${props.task.name} was successfully deleted!`);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },

      test() {
        try {
          Pop.success("Test successful!");
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },

      async setActive() {
        try {
          const taskId = props.task.id;
          await tasksService.getOne(taskId);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
};
</script>

<style></style>
