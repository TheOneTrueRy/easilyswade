<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-start">
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editProfile">
          Edit Profile
        </button>
      </div>
      <div class="col-12 text-center">
        <span class="fs-1">
          {{ profile.name }}
        </span>
      </div>
    </div>
  </div>

  <!-- SECTION Edit Profile Modal -->
  <Modal id="editProfile">
    <EditProfile />
  </Modal>
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
import EditProfile from "../components/EditProfile.vue";
import Modal from "../components/Modal.vue";

export default {
  setup() {
    const route = useRoute();
    const editable = ref({});
    const profileId = route.params.profileId;
    const filter = ref('all')

    async function getProfileById() {
      try {
        await profilesService.getProfileById(profileId);
      } catch (error) {
        Pop.error('Experienced an error getting that profile by the provided URL ID.', error.message)
      }
    }

    async function getArtByProfileId() {
      try {
        await artService.getArtByProfileId(profileId);
      } catch (error) {
        Pop.error('Experienced an error getting the Art associated with this profile.', error.message)
      }
    }

    async function getStoriesByProfileId() {
      try {
        await storiesService.getStoriesByProfileId(profileId);
      } catch (error) {
        Pop.error('Experienced an error getting the Stories associated with this profile.', error.message)
      }
    }

    async function getCharactersByProfileId() {
      try {
        await charactersService.getCharactersByProfileId(profileId);
      } catch (error) {
        Pop.error('Experienced an error getting the Characters associated with this profile.', error.message)
      }
    }

    async function getParties() {
      try {
        await partiesService.getParties();
      } catch (error) {
        Pop.error('Experienced an error getting parties.', error.message)
      }
    }

    // eslint-disable-next-line space-before-function-paren
    watchEffect(async () => {
      if (route.params.profileId) {
        getProfileById();
        getArtByProfileId();
        getStoriesByProfileId();
        getCharactersByProfileId();
        getParties();
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
      filter,
      profile: computed(() => AppState.profile),
      artArray: computed(() => AppState.artArray),
      stories: computed(() => AppState.stories),
      characters: computed(() => AppState.characters),
      parties: computed(() => AppState.filteredParties)
    }
  },

  components: { Modal, EditProfile }
}
</script>


<style lang="scss" scoped></style>