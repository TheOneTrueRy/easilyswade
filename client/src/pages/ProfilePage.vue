<template>
  <div class="profile">


  </div>
</template>


<script>
import { computed, onUnmounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Pop from '../utils/Pop.js';
import { profilesService } from "../services/ProfilesService.js";
import { artService } from "../services/ArtService.js";
import { storiesService } from "../services/StoriesService.js";
import { charactersService } from "../services/CharactersService.js";
import { AppState } from "../AppState.js";
import { partiesService } from "../services/PartiesService.js";

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

    async function getPartiesByProfileId() {
      try {
        await partiesService.getPartiesByProfileId(profileId);
      } catch (error) {
        Pop.error(error.message, 'Experienced an error getting the Parties associated with this profile.')
      }
    }

    // eslint-disable-next-line space-before-function-paren
    watchEffect(async () => {
      if (route.params.profileId) {
        getProfileById();
        getArtByProfileId();
        getStoriesByProfileId();
        getCharactersByProfileId();
        getPartiesByProfileId();
      }
    })

    onUnmounted(() => {
      AppState.profile = null;
      AppState.artArray = [];
      AppState.stories = [];
      AppState.characters = [];
      AppState.parties = [];
    })

    return {
      editable,
      profile: computed(() => AppState.profile),
      artArray: computed(() => AppState.artArray),
      stories: computed(() => AppState.stories),
      characters: computed(() => AppState.characters),
      parties: computed(() => AppState.parties)
    }
  }
}
</script>


<style lang="scss" scoped></style>