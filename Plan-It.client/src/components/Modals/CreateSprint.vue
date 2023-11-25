<template>
  <div
    class="modal fade"
    id="createSprintModal"
    tabindex="-1"
    aria-labelledby="ariaCreateSprint"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ariaCreateSprint">Create Sprint</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createSprint">
            <label class="form-label" for="name">Name</label>
            <input
              v-model="editable.name"
              name="name"
              id="name"
              class="form-control"
              type="text"
              placeholder="Name..."
            />
            <div class="text-end mt-3">
              <button
                type="button"
                class="btn px-4 me-1"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                type="submit"
                class="btn btn-primary px-4"
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { sprintsService } from "../../services/SprintsService.js";
import { AppState } from "../../AppState.js";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({});
    return {
      editable,

      async createSprint() {
        try {
          let sprintBody = editable.value;
          sprintBody = { ...sprintBody, projectId: AppState.activeProject.id };
          await sprintsService.create(sprintBody);
          Modal.getInstance("#createSprintModal").hide();
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
