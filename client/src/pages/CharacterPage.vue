<template>
  <div class="container-fluid my-2">
    <div class="row">
      <form v-if="character.creatorId == user.id" class="col-12 col-md-6 g-0" @submit.prevent="saveSheet">

      </form>
      <div v-else class="col-12 col-md-6 g-0">

      </div>
      <div class="col-12 col-md-6">

      </div>
    </div>
  </div>
</template>


<script>
import { computed, onUnmounted, ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { charactersService } from "../services/CharactersService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();

    watchEffect(async () => {
      if (route.params.characterId) {
        await charactersService.getCharacterById(route.params.characterId)
      }
      if (AppState.character.id) {
        editable.value = { ...AppState.character }
      }
    })

    onUnmounted(() => {
      AppState.character = null;
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


<style lang="scss" scoped>
.character-picture {
  height: 25vh;
  width: 25vh;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  user-select: none;
}
</style>