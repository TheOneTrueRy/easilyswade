<template>
  <form class="container-fluid" @submit.prevent="createCharacter">

  </form>
</template>


<script>
import { charactersService } from "../services/CharactersService.js";
import Pop from "../utils/Pop.js";
import { ref } from 'vue';
import { router } from '../router.js';
import { AppState } from "../AppState.js";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createCharacter(e) {
        try {
          const picture = e.target.fileInput.files[0]
          const characterData = editable.value
          await charactersService.createCharacter(picture, characterData)
          router.push({ name: 'Character', params: { characterId: AppState.character.id } })
        } catch (error) {
          Pop.error('Experienced an error attempting to create the character.', error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>