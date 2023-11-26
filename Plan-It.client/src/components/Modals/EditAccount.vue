<template>
  <div
    class="modal fade"
    id="editAccountModal"
    tabindex="-1"
    aria-labelledby="editAccount"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-bottom border-primary">
          <h1
            class="modal-title fs-5 text-primary text-shadow"
            id="editAccount"
          >
            Edit Account
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row pb-4">
            <div class="col-4 text-end">
              <img
                class="img-fluid rounded-circle"
                :src="account.picture"
                alt=""
              />
            </div>
            <div class="col-8">
              <p class="fs-4 text-primary text-shadow">
                {{ account.name }}
              </p>
              <p class="text-secondary" v-if="account.title">
                {{ account.title }}
              </p>
            </div>
          </div>
          <form @submit.prevent="editAccount" class="row">
            <div class="col-5">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                id="title"
                v-model="editable.title"
                class="form-control"
              />
            </div>
            <div class="col-6">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                v-model="editable.name"
              />
            </div>
            <div class="col-12 py-3">
              <label for="picture" class="form-label">Picture Url</label>
              <input
                type="url"
                class="form-control"
                id="picture"
                v-model="editable.picture"
              />
            </div>
            <div class="d-flex justify-content-end mt-5">
              <div class="col-4">
                <button data-bs-dismiss="modal" class="btn btn-outline w-100">
                  Cancel
                </button>
              </div>
              <div class="col-4">
                <button
                  type="submit"
                  class="btn bg-gradient-secondary w-100 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { AppState } from "../../AppState.js";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { accountService } from "../../services/AccountService.js";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({});
    const account = computed(() => AppState.account);
    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      account,
      editable,

      async editAccount() {
        try {
          const accountBody = editable.value;
          await accountService.editAccount(accountBody);
          Pop.success("Successfully edited Account!");
          Modal.getInstance("#editAccountModal").hide();
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
img {
  height: 5rem !important;
  max-height: 5rem !important;
  border: 2px solid black;
}

.text-shadow {
  text-shadow: 0px 0px 0.8px black;
  font-weight: 400;
}
</style>
