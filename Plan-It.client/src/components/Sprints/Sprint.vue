<template>
  <div class="d-flex justify-content-between border-bottom border-primary py-4">
    <div
      role="button"
      data-bs-toggle="collapse"
      :href="'#' + sprint.id"
      class="col-6 col-xl-9 rounded-pill ps-4 fw-semibold"
    >
      <div class="row">
        <div
          class="col-9 col-md-6 col-xl-4 col-xxl-3 d-flex align-items-center"
        >
          <img
            class="img-fluid pe-3 mountain"
            src="../../assets/img/Moutain.png"
          />
          <span class="m-0 my-auto">
            S{{ sprintIndex + 1 }}
            -
            {{ sprint.name }}
          </span>
        </div>
        <div class="col-2 col-md-1 text-start my-auto">
          <p>
            {{ weight }}
            <i class="mdi mdi-weight"></i>
          </p>
        </div>
      </div>
    </div>
    <div v-if="tasks" class="col-6 col-xl-3 my-auto">
      <div class="row align-items-center">
        <div class="col-6 text-center">
          <button
            @click="setActive"
            data-bs-toggle="modal"
            data-bs-target="#createTaskModal"
            class="btn btn-outline-secondary"
          >
            Add Task <i class="mdi mdi-plus"></i>
          </button>
        </div>
        <div class="col-6 text-center">
          <p v-if="tasks.length > 0">
            {{ tasks.filter((task) => task.isComplete == true).length }}/{{
              tasks.length
            }}
            Tasks Completed
          </p>
          <p v-else>No task started</p>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="tasks.length > 0"
    class="collapse position-relative p-4"
    :id="sprint.id"
  >
    <div v-for="task in tasks" :key="task.id" class="card-body px-4">
      <Task :task="task" />
    </div>
    <p
      @click="deleteSprint"
      role="button"
      type="button"
      class="text-secondary position-absolute bottom-0 end-0 p-3 fs-5 m-0 d-flex align-items-center"
    >
      Delete Sprint <i class="ps-3 fs-2 mdi mdi-delete-forever"></i>
    </p>
  </div>

  <div v-else class="collapse" :id="sprint.id">
    <div class="row align-items-center">
      <div class="col-10">
        You do not have any Sprints. Add a task to see them here.
      </div>
      <div class="col-2">
        <p
          @click="deleteSprint"
          role="button"
          type="button"
          class="text-secondary p-3 fs-5 m-0 d-flex align-items-center"
        >
          Delete Sprint <i class="ps-3 fs-2 mdi mdi-delete-forever"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from "../../AppState.js";
import { Sprint } from "../../models/Sprint.js";
import Pop from "../../utils/Pop.js";
import { logger } from "../../utils/Logger.js";
import { sprintsService } from "../../services/SprintsService.js";
import { computed } from "vue";
import Task from "../../components/Tasks/Task.vue";

export default {
  props: { sprint: { type: Sprint, required: true } },
  setup(props) {
    const sprintIndex = computed(() =>
      AppState.sprints.findIndex((sprint) => sprint.id == props.sprint.id)
    );
    const tasks = computed(() =>
      AppState.tasks.filter((task) => task.sprintId == props.sprint.id)
    );
    const weight = computed(() => {
      let sum = 0;
      if (tasks.value) {
        tasks.value.forEach((task) => {
          sum += task.weight || 0;
        });
      }
      return sum;
    });

    return {
      sprintIndex,
      tasks,
      weight,

      async getTasks() {
        try {
          const sprintId = props.sprint.id;
          await sprintsService.getTasks(sprintId);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },

      async deleteSprint() {
        try {
          const yes = await Pop.confirm(
            `Are you sure you want to delete ${props.sprint.name}?`
          );
          if (!yes) {
            return;
          }
          await sprintsService.deleteSprint(props.sprint.id);
          Pop.success(`Successfully deleted ${props.sprint.name}!`);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },

      async setActive() {
        try {
          AppState.activeSprint = props.sprint;
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
  components: { Task },
};
</script>

<style>
p {
  margin: 0;
}

.mountain {
  height: 2rem;
  filter: hue-rotate(180);
}
</style>
