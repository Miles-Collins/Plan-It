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
      <div
        v-if="task"
        class="d-flex justify-content-between align-items-center"
      >
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <h6
          class="text-primary m-0 p-0"
          id="offcanvasTasksLabel
"
        >
          S{{ taskIndex }} - {{ task.sprint.name }} > {{ task.name }}
        </h6>
      </div>
    </div>
    <div class="offcanvas-body text-center"></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { AppState } from "../../AppState.js";

export default {
  setup() {
    return {
      task: computed(() => AppState.activeTask),
      taskIndex: computed(() => {
        return (
          AppState.tasks.findIndex(
            (task) => task.id == AppState.activeTask.id
          ) + 1
        );
      }),
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style></style>
