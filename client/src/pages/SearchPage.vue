<template>
  <div class="container-fluid pt-5">
    <div class="row">
      <ProfileCard v-for="p in profiles" :key="p.id" :profile="p" />
      <div class="col-2 p-2 d-flex justify-content-center" v-for="c in characters" :key="c.id">
        <CharacterCard :character="c" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onUnmounted } from "vue";
import { AppState } from "../AppState.js";
import ProfileCard from "../components/ProfileCard.vue";
import CharacterCard from "../components/CharacterCard.vue";

export default {
  setup() {

    onUnmounted(() => {
      AppState.profiles = [],
        AppState.characters = [],
        AppState.parties = []
    })

    return {
      profiles: computed(() => AppState.profiles),
      characters: computed(() => AppState.characters),
      parties: computed(() => AppState.parties)
    }
  },

  components: { ProfileCard, CharacterCard }
}
</script>


<style lang="scss" scoped></style>