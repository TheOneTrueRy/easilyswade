<template>
  <div class="container-fluid my-2">
    <div class="row justify-content-end">
      <div class="col-4 text-center">
        <img class="profile-picture shadow-sm" :src="profile?.picture" :alt="profile?.picture">
      </div>
      <div class="col-4 text-end">
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
    <!-- SECTION Player Characters -->
    <div class="row mt-3">
      <div class="col-12 text-center">
        <span class="fs-3">

        </span>
      </div>
      <div class="col-10 offset-1">
        <div class="row">
          <div v-for="c in playerCharacters" :key="c.id" class="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-2"
            id="characterCard">

          </div>
        </div>
      </div>
    </div>
    <!-- SECTION Non Player Characters -->
    <div v-if="profile.id == user.id" class="row mt-3">
      <div class="col-12 text-center">
        <span class="fs-3">

        </span>
      </div>
      <div class="col-10 offset-1">
        <div class="row">
          <div v-for="npc in nonPlayerCharacters" :key="npc.id" class="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-2">

          </div>
        </div>
      </div>
    </div>
    <!-- SECTION Parties -->
    <div class="row mt-3">
      <div class="col-12 text-center">
        <span class="fs-3">

        </span>
      </div>
      <div class="col-10 offset-1">
        <div class="row">
          <div v-for="p in parties" :key="p.id" class="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-2">

          </div>
        </div>
      </div>
    </div>
    <!-- SECTION Art -->
    <div class="row mt-3">
      <div class="col-12 text-center">
        <span class="fs-3">

        </span>
      </div>
      <div class="col-10 offset-1">
        <div class="row">
          <div v-for="a in artArray" :key="a.id" class="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-2">

          </div>
        </div>
      </div>
    </div>
    <!-- SECTION Stories -->
    <div class="row mt-3">
      <div class="col-12 text-center">
        <span class="fs-3">

        </span>
      </div>
      <div class="col-10 offset-1">
        <div class="row">
          <div v-for="s in stories" :key="s.id" class="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-2">

          </div>
        </div>
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
      user: computed(() => AppState.user),
      profile: computed(() => AppState.profile),
      artArray: computed(() => AppState.artArray),
      stories: computed(() => AppState.stories),
      playerCharacters: computed(() => AppState.characters.filter(c => c.playerCharacter == true)),
      nonPlayerCharacters: computed(() => AppState.characters.filter(c => c.playerCharacter == false)),
      parties: computed(() => AppState.filteredParties)
    }
  },

  components: { Modal, EditProfile }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 15vh;
  width: 15vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  /* border: 1px solid black; */
  user-select: none;
}
</style>