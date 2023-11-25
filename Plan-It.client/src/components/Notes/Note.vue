<template>
  <div class="row">
    <div class="col-12">
      <div class="row align-items-center mb-2">
        <div class="col-10 text-start">
          <img
            class="img-fluid rounded-circle"
            :src="note.creator.picture"
            :title="note.creator.name + ' picture'"
            alt=""
            srcset=""
          />
          <span class="ps-2">{{ note.creator.name }} </span>
        </div>
        <div v-if="note.creatorId == account.id" class="col-2 text-center">
          <i
            @click="deleteNote"
            role="button"
            title="Delete note"
            class="text-secondary fs-5 mdi mdi-delete-forever"
          ></i>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-start">
          <p>
            {{ note.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Note } from "../../models/Note.js";
import { computed } from "vue";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import { AppState } from "../../AppState.js";
import { notesService } from "../../services/NotesService.js";

export default {
  props: { note: { type: Note, required: true } },

  setup(props) {
    const account = computed(() => AppState.account);
    return {
      account,

      async deleteNote() {
        try {
          const yes = await Pop.confirm(
            `Are you sure you want to delete this note ${account.value.name}?`
          );
          if (!yes) {
            return;
          }
          const noteId = props.note.id;
          await notesService.deleteNote(noteId);
          Pop.success(`Note successfully deleted!`);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
};
</script>

<style>
img {
  max-height: 2rem;
}
</style>
