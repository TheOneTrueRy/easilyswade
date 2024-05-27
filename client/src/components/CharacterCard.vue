<template>
  <div class="character-card" :style="{ backgroundImage: `url(${character.picture})` }">
    <div class="w-100 bg-blur bottom-corners-rounded text-center ellipsis px-2">
      <span class="fs-5 text-light">
        {{ character.name }}
      </span>
      <div class="div d-flex justify-content-between pb-1">
        <router-link :to="{ name: 'CharacterPage', params: { characterId: character?.id } }"
          :title="`Visit ${character?.name}'s Character Page!`">
          <button class="btn selectable px-2 py-0 character-btn"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">Page</button>
        </router-link>
        <router-link :to="{ name: 'CharacterSheet', params: { characterId: character?.id } }"
          :title="`Visit ${character?.name}'s Character Sheet!`">
          <button class="btn selectable px-2 py-0 character-btn"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">Sheet</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { Character } from "../models/Character.js";
import { AppState } from "../AppState.js";

export default {
  props: {
    character: {
      type: Character,
      required: true
    }
  },
  setup() {
    return {
      theme: computed(() => AppState.theme)
    }
  }
}
</script>


<style lang="scss" scoped>
.character-card {
  height: 20vh;
  width: 26vh;
  border-radius: 8px;
  display: flex;
  align-items: end;
  background-size: cover;
  background-position: center;
}

.bg-blur {
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.400);
}

.bottom-corners-rounded {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}

.character-btn {
  display: none;
}

.character-card:hover {
  .character-btn {
    display: block;
  }
}

@media screen and (max-width: 576px) {
  .character-card {
    width: 40vh;
    max-width: 100%;
  }
}
</style>