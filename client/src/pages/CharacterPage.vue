<template>
  <div class="container-fluid my-2">
    <div class="row">
      <form v-if="character.creatorId == user.id" class="col-12 col-lg-8" @submit.prevent="saveSheet">
        <div class="row">
          <div class="col-6 col-sm-4">
            <div class="row px-2">
              <div class="col-12 text-center">
                <span class="fs-3 fw-bold text-danger">
                  ATTRIBUTES
                </span>
              </div>
              <!-- SECTION AGILITY -->
              <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                <div class="text-center border attribute-number selectable">
                  <span>
                    4
                  </span>
                </div>
                <div class="text-center border attribute-number selectable">
                  <span>
                    6
                  </span>
                </div>
                <div class="text-center border attribute-number selectable">
                  <span>
                    8
                  </span>
                </div>
                <div class="text-center border attribute-number selectable">
                  <span>
                    10
                  </span>
                </div>
                <div class="text-center border attribute-number selectable">
                  <span>
                    12
                  </span>
                </div>
                <div class="ms-2 text-center border attribute-number rounded">
                  <input required v-model="editable.agility" type="number" class="fw-bold form-control w-100 h-100">
                </div>
                <div class="col-4 ps-2">
                  <span class="fs-5 fw-bold">
                    AGILITY
                  </span>
                </div>
              </div>
              <!-- SECTION SMARTS -->
              <div class="col-1 g-0 text-center">

              </div>
              <div class="col-1 g-0 text-center">

              </div>
              <div class="col-1 g-0 text-center">

              </div>
              <div class="col-1 g-0 text-center">

              </div>
              <div class="col-1 g-0 text-center">

              </div>
              <div class="col-1 g-0 text-center">

              </div>
              <div class="col-6">

              </div>
            </div>
          </div>
          <div class="col-6 col-sm-4">

          </div>
          <div class="col-4 d-none d-sm-flex justify-content-center">
            <img :src="character.picture" :alt="`${character.name}'s Picture'`" class="character-picture shadow">
          </div>
        </div>
      </form>
      <div v-else class="col-12 col-lg-8 g-0">

      </div>
      <div class="col-12 col-lg-4">

      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { charactersService } from "../services/CharactersService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();

    // eslint-disable-next-line space-before-function-paren
    watchEffect(async () => {
      if (route.params.characterId) {
        await charactersService.getCharacterById(route.params.characterId)
      }
      if (AppState.character.id) {
        editable.value = { ...AppState.character }
      }
    })

    onMounted(() => {
      document.title = `EasilySWADE - ${AppState.character.name}`
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
  max-height: 25vh;
  max-width: 100%;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  user-select: none;
}

.attribute-number {
  height: 25px;
  width: 10%;
}
</style>