<template>
  <div
    class="modal fade"
    id="createProjectModal"
    tabindex="-1"
    aria-labelledby="createProject"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-white border-bottom border-black">
          <h1 class="modal-title text-primary fs-5" id="createProject">
            Create Project
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
            <form @submit.prevent="createProject">
              <div>
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
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
                <div class="mb-3">
                  <label for="description" class="form-label"
                    >Description</label
                  >
                  <textarea
                    v-model="editable.description"
                    class="form-control"
                    name="description"
                    id="description"
                    rows="3"
                  ></textarea>
                  <small id="helpDescription" class="form-text text-muted"
                    >Min length 5, Max length 500</small
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
                  <button type="submit" class="btn btn-primary">Submit</button>
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
import { ref } from "vue";
import { projectsService } from "../../services/ProjectsService.js";
import Pop from "../../utils/Pop.js";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({});
    return {
      editable,

      async createProject() {
        const projectBody = editable.value;
        const project = await projectsService.createProject(projectBody);
        Modal.getInstance("#createProjectModal").hide();
        Pop.success(`Successfully created ${project.name}`);
      },
    };
  },
};
</script>

<style></style>
