<template>
  <router-link :to="{ name: 'Character', params: { characterId: character?.id } }" class="w-auto">
    <div class="character-card selectable" :style="{ backgroundImage: `url(${character.picture})` }">
      <div class="w-100 bg-blur bottom-corners-rounded text-center ellipsis px-2">
        <span class="fs-5 text-light">
          {{ character.name }}
        </span>
      </div>
    </div>
  </router-link>
</template>


<script>
import { Character } from "../models/Character.js";

export default {
  props: {
    character: {
      type: Character,
      required: true
    }
  },
  setup() {
    return {}
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

@media screen and (max-width: 576px) {
  .character-card {
    width: 40vh;
    max-width: 100%;
  }
}
</style>