<template>
  <form class="container-fluid p-lg-4" @submit.prevent="createCharacter">
    <div class="row">
      <div id="ATTRIBUTES" class="col-4 d-flex justify-content-center flex-column">
        <span class="text-danger fs-3 fw-bold text-center">
          ATTRIBUTES
        </span>
        <div class="row">
          <div class="col-5 g-0 d-flex align-items-end flex-column">
            <input type="number" id="agility" class="form-control attribute-number me-2 text-center"
              v-model="editable.agility">
            <input type="number" id="smarts" class="form-control attribute-number me-2 text-center"
              v-model="editable.smarts">
            <input type="number" id="spirit" class="form-control attribute-number me-2 text-center"
              v-model="editable.spirit">
            <input type="number" id="strength" class="form-control attribute-number me-2 text-center"
              v-model="editable.strength">
            <input type="number" id="vigor" class="form-control attribute-number me-2 text-center"
              v-model="editable.vigor">
          </div>
          <div class="col-7 g-0 d-flex flex-column">
            <span class="fs-4 fw-bold h-35">
              AGILITY
            </span>
            <span class="fs-4 fw-bold h-35">
              SMARTS
            </span>
            <span class="fs-4 fw-bold h-35">
              SPIRIT
            </span>
            <span class="fs-4 fw-bold h-35">
              STRENGTH
            </span>
            <span class="fs-4 fw-bold h-35">
              VIGOR
            </span>
          </div>
        </div>
      </div>
      <div id="INFO" class="col-4">

      </div>
      <div id="PICTURE" class="col-4">

      </div>
    </div>
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
          editable.value = {}
          router.push({ name: 'Character', params: { characterId: AppState.character.id } })
        } catch (error) {
          Pop.error('Experienced an error attempting to create the character.', error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.attribute-number {
  height: 35px;
  width: 35px;
  border-right: none;
  border-left: none;
  border-top: none;
  border-bottom: 2px solid;
  outline: none !important;
  border-radius: 0;
  padding: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-control:focus {
  box-shadow: none;
}

.h-35 {
  height: 35px;
}
</style>