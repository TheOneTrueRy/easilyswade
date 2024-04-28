<template>
  <div class="container-fluid my-2">
    <div class="row">
      <form v-if="character.creatorId == user.id" class="col-12 col-xl-8" @submit.prevent="saveSheet">
        <div class="row">
          <div class="col-6 order-3 order-md-1 col-md-4">
            <div class="row px-2">
              <div class="col-12 text-center">
                <span class="fs-3 fw-bold text-danger">
                  ATTRIBUTES
                </span>
              </div>
              <!-- SECTION AGILITY -->
              <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(4)">
                  <span :class="[editable.agility == 4 ? 'fw-bold' : 'opacity-50']">
                    4
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(6)">
                  <span :class="[editable.agility == 6 ? 'fw-bold' : 'opacity-50']">
                    6
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(8)">
                  <span :class="[editable.agility == 8 ? 'fw-bold' : 'opacity-50']">
                    8
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(10)">
                  <span :class="[editable.agility == 10 ? 'fw-bold' : 'opacity-50']">
                    10
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(12)">
                  <span :class="[editable.agility == 12 ? 'fw-bold' : 'opacity-50']">
                    12
                  </span>
                </div>
                <div class="ms-2 text-center border-bottom attribute-number"
                  :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                  <input required v-model="editable.agility" type="number"
                    class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                </div>
                <div class="col-4 ps-2">
                  <span class="fs-5 fw-bold">
                    AGILITY
                  </span>
                </div>
              </div>
              <!-- SECTION SMARTS -->
              <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(4)">
                  <span :class="[editable.smarts == 4 ? 'fw-bold' : 'opacity-50']">
                    4
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(6)">
                  <span :class="[editable.smarts == 6 ? 'fw-bold' : 'opacity-50']">
                    6
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(8)">
                  <span :class="[editable.smarts == 8 ? 'fw-bold' : 'opacity-50']">
                    8
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(10)">
                  <span :class="[editable.smarts == 10 ? 'fw-bold' : 'opacity-50']">
                    10
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(12)">
                  <span :class="[editable.smarts == 12 ? 'fw-bold' : 'opacity-50']">
                    12
                  </span>
                </div>
                <div class="ms-2 text-center border-bottom attribute-number"
                  :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                  <input required v-model="editable.smarts" type="number"
                    class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                </div>
                <div class="col-4 ps-2">
                  <span class="fs-5 fw-bold">
                    SMARTS
                  </span>
                </div>
              </div>
              <!-- SECTION SPIRIT -->
              <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(4)">
                  <span :class="[editable.spirit == 4 ? 'fw-bold' : 'opacity-50']">
                    4
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(6)">
                  <span :class="[editable.spirit == 6 ? 'fw-bold' : 'opacity-50']">
                    6
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(8)">
                  <span :class="[editable.spirit == 8 ? 'fw-bold' : 'opacity-50']">
                    8
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(10)">
                  <span :class="[editable.spirit == 10 ? 'fw-bold' : 'opacity-50']">
                    10
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(12)">
                  <span :class="[editable.spirit == 12 ? 'fw-bold' : 'opacity-50']">
                    12
                  </span>
                </div>
                <div class="ms-2 text-center border-bottom attribute-number"
                  :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                  <input required v-model="editable.spirit" type="number"
                    class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                </div>
                <div class="col-4 ps-2">
                  <span class="fs-5 fw-bold">
                    SPIRIT
                  </span>
                </div>
              </div>
              <!-- SECTION STRENGTH -->
              <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(4)">
                  <span :class="[editable.strength == 4 ? 'fw-bold' : 'opacity-50']">
                    4
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(6)">
                  <span :class="[editable.strength == 6 ? 'fw-bold' : 'opacity-50']">
                    6
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(8)">
                  <span :class="[editable.strength == 8 ? 'fw-bold' : 'opacity-50']">
                    8
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(10)">
                  <span :class="[editable.strength == 10 ? 'fw-bold' : 'opacity-50']">
                    10
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(12)">
                  <span :class="[editable.strength == 12 ? 'fw-bold' : 'opacity-50']">
                    12
                  </span>
                </div>
                <div class="ms-2 text-center border-bottom attribute-number"
                  :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                  <input required v-model="editable.strength" type="number"
                    class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                </div>
                <div class="col-4 ps-2">
                  <span class="fs-5 fw-bold">
                    STRENGTH
                  </span>
                </div>
              </div>
              <!-- SECTION VIGOR -->
              <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(4)">
                  <span :class="[editable.vigor == 4 ? 'fw-bold' : 'opacity-50']">
                    4
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(6)">
                  <span :class="[editable.vigor == 6 ? 'fw-bold' : 'opacity-50']">
                    6
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(8)">
                  <span :class="[editable.vigor == 8 ? 'fw-bold' : 'opacity-50']">
                    8
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(10)">
                  <span :class="[editable.vigor == 10 ? 'fw-bold' : 'opacity-50']">
                    10
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(12)">
                  <span :class="[editable.vigor == 12 ? 'fw-bold' : 'opacity-50']">
                    12
                  </span>
                </div>
                <div class="ms-2 text-center border-bottom attribute-number"
                  :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                  <input required v-model="editable.vigor" type="number"
                    class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                </div>
                <div class="col-4 ps-2">
                  <span class="fs-5 fw-bold">
                    VIGOR
                  </span>
                </div>
              </div>
            </div>
            <div class="row px-2 mt-3">
              <div class="col-12 text-center">
                <span class="fs-3 fw-bold text-danger">
                  SKILLS
                </span>
              </div>
              <div v-for="s in editable.skills" :key="s.id"
                class="col-12 align-items-center justify-content-center g-0 d-flex">
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.id, 4)">
                  <span :class="[s.die == 4 ? 'fw-bold' : 'opacity-50']">
                    4
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.id, 6)">
                  <span :class="[s.die == 6 ? 'fw-bold' : 'opacity-50']">
                    6
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.id, 8)">
                  <span :class="[s.die == 8 ? 'fw-bold' : 'opacity-50']">
                    8
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.id, 10)">
                  <span :class="[s.die == 10 ? 'fw-bold' : 'opacity-50']">
                    10
                  </span>
                </div>
                <div class="text-center border attribute-number selectable no-highlight"
                  :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.id, 12)">
                  <span :class="[s.die == 12 ? 'fw-bold' : 'opacity-50']">
                    12
                  </span>
                </div>
                <div class="ms-2 text-center border-bottom attribute-number"
                  :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                  <input required v-model="s.die" type="number"
                    class="fw-bold attribute-input text-danger w-100 h-100 p-0 text-center" readonly>
                </div>
                <div class="col-4 ps-2">
                  <span class="fs-small">
                    {{ s.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 order-2 col-md-5">

          </div>
          <div class="col-6 order-1 order-md-3 col-md-3 justify-content-center">
            <img :src="character.picture" :alt="`${character.name}'s Picture'`" class="character-picture shadow">
          </div>
        </div>
      </form>
      <div v-else class="col-12 col-xl-8 g-0">

      </div>
      <div class="col-12 col-xl-4">

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
      theme: computed(() => AppState.theme),
      async saveSheet(e) {
        try {
          const picture = e.target.fileInput.files[0]
          const sheetData = editable.value
          await charactersService.updateCharacter(picture, sheetData)
        } catch (error) {
          Pop.error('Experienced an error attempting to save your Character Sheet.', error.message)
        }
      },
      changeAgility(num) {
        try {
          editable.value.agility = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value.', error.message)
        }
      },
      changeSmarts(num) {
        try {
          editable.value.smarts = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value.', error.message)
        }
      },
      changeSpirit(num) {
        try {
          editable.value.spirit = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value.', error.message)
        }
      },
      changeStrength(num) {
        try {
          editable.value.strength = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value.', error.message)
        }
      },
      changeVigor(num) {
        try {
          editable.value.vigor = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value.', error.message)
        }
      },
      changeSkillDie(skillId, die) {
        try {
          let skill = editable.value.skills.find(s => s.id == skillId)
          skill.die = die
        } catch (error) {
          Pop.error('Experienced an error attempting to change the die level of that skill.', error.message)
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
  height: 27px;
  width: 27px;
}

.attribute-input {
  border: none;
  background-color: inherit;
  cursor: default;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.fs-small {
  font-size: small;
  text-wrap: nowrap;
}
</style>