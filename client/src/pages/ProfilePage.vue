<template>
  <div class="profile">


  </div>
</template>


<script>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Pop from '../utils/Pop.js';
import { profilesService } from "../services/ProfilesService.js";
import { artService } from "../services/ArtService.js";
import { storiesService } from "../services/StoriesService.js";
import { charactersService } from "../services/CharactersService.js";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const route = useRoute();
    const editable = ref({});
    const profileId = route.params.profileId;

    async function getProfileById() {
      try {
        await profilesService.getProfileById(profileId);
      } catch (error) {
        Pop.error(error.message, 'Experienced an error getting that profile by the provided URL ID.')
      }
    }

    async function getArtByProfileId() {
      try {
        await artService.getArtByProfileId(profileId);
      } catch (error) {
        Pop.error(error.message, 'Experienced an error getting the Art associated with this profile.')
      }
    }

    async function getStoriesByProfileId() {
      try {
        await storiesService.getStoriesByProfileId(profileId);
      } catch (error) {
        Pop.error(error.message, 'Experienced an error getting the Stories associated with this profile.')
      }
    }

    async function getCharactersByProfileId() {
      try {
        await charactersService.getCharactersByProfileId(profileId);
      } catch (error) {
        Pop.error(error.message, 'Experienced an error getting the Characters associated with this profile.')
      }
    }

    watchEffect(async () => {
      if (route.params.profileId) {
        getProfileById();
        getArtByProfileId();
        getStoriesByProfileId();
        getCharactersByProfileId();
      }
    })

    return {
      editable,
      profile: computed(() => AppState.profile),
      art: computed(() => AppState.art),
      stories: computed(() => AppState.stories),
      characters: computed(() => AppState.characters)
    }
  }
}
</script>


<style lang="scss" scoped></style>