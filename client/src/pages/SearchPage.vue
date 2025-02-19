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
import { computed, onUnmounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import ProfileCard from "../components/ProfileCard.vue";
import CharacterCard from "../components/CharacterCard.vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { charactersService } from "../services/CharactersService.js";
import { profilesService } from "../services/ProfilesService.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const route = useRoute();

    onUnmounted(() => {
      AppState.profiles = [],
        AppState.characters = [],
        AppState.parties = []
    })

    async function searchProfiles(query) {
      try {
        const profileQuery = { query: query }
        await profilesService.searchProfiles(profileQuery)
      } catch (error) {
        Pop.error('Experienced an error when attempting to search profiles.', error.message)
      }
    }

    async function searchCharacters(query) {
      try {
        const characterQuery = { query: query }
        await charactersService.searchCharacters(characterQuery)
      } catch (error) {
        Pop.error('Experienced an error when attempting to search characters.', error.message)
      }
    }

    // eslint-disable-next-line space-before-function-paren
    watchEffect(async () => {
      if (route.query.characterName != undefined) {
        searchCharacters(route.query.characterName)
      }
      if (route.query.profileName != undefined) {
        searchProfiles(route.query.profileName)
      }
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