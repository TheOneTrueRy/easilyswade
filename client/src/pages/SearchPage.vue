<template>
  <div class="container-fluid pt-5">
    <!-- <div class="row justify-content-center">
      <img src="https://udixydcfgbzwwnvpwubp.supabase.co/storage/v1/object/public/sandbox/God/Panda-Cowboy.png" class="w-25"/>
    </div>
    <div class="row flex-column">
      <span class="text-center fs-3">
        🏗️ Under Construction 🚧
      </span>
      <span class="text-center fs-3">
        Check back in another time! - Ry :)
      </span>
    </div> -->
    <ProfileCard v-for="p in profiles" :key="p.id" :profile="p" />
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import ProfileCard from "../components/ProfileCard.vue";

export default {
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      characters: computed(() => AppState.characters)
    }
  },

  components: { ProfileCard }
}
</script>


<style lang="scss" scoped></style>