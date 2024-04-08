<template>
  <form v-if="character.creatorId == user.id" class="container-fluid" @submit.prevent="saveSheet">

  </form>
  <div v-else class="container-fluid">

  </div>
</template>


<script>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { charactersService } from '../services/CharactersService.js';
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({})
    const route = useRoute();

    // eslint-disable-next-line space-before-function-paren
    watchEffect(async () => {
      if (route.params.characterId) {
        await charactersService.getCharacterById(route.params.characterId);
      }
      if (AppState.character.id) {
        editable.value = { ...AppState.character }
      }
    })

    return {
      editable,
      character: computed(() => AppState.character),
      user: computed(() => AppState.user),
      async saveSheet(e) {
        try {
          const picture = e.target.fileInput.files[0]
          const sheetData = editable.value
          await charactersService.updateCharacter(picture, sheetData)
        } catch (error) {
          Pop.error('Experienced an error attempting to save your Character Sheet.', error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>