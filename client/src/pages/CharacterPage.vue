<template>
  <div class="container-fluid">


  </div>
</template>


<script>
import { computed, onUnmounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { charactersService } from "../services/CharactersService.js";

export default {
  setup() {
    const route = useRoute();

    watchEffect(async () => {
      if (route.params.characterId) {
        await charactersService.getCharacterById(route.params.characterId)
      }
    })

    onUnmounted(() => {
      AppState.character = null;
    })

    return {
      character: computed(() => AppState.character)
    }
  }
}
</script>


<style lang="scss" scoped></style>