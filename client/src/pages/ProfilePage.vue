<template>
  <div class="container-fluid mb-2">
    <div class="row pt-2 px-4" :class="[theme == 'light' ? 'vg-light' : 'vg-dark']">
      <div class="col-12 g-0">
        <div class="d-flex flex-column flex-sm-row">
          <img class="profile-picture shadow" :src="profile?.picture" :alt="profile?.picture">
          <div class="d-flex flex-column ps-sm-2">
            <span class="fw-bold fs-2" :class="[theme == 'light' ? 'text-dark' : 'text-light']">
              {{ profile.name }}
            </span>
            <span class="description-overflow pe-2 stylized-scrollbar">
              {{ profile.description }}
            </span>
          </div>
          <button v-if="profile.id == user.id" class="btn mt-2 d-sm-none"
            :class="[theme == 'light' ? 'my-btn-dark' : 'btn-light']" data-bs-toggle="modal"
            data-bs-target="#editProfile" title="Edit your Profile's information.">
            Edit <i class="mdi-account-edit mdi"></i>
          </button>
        </div>
      </div>
      <div v-if="profile.id == user.id" class="col-3 g-0 d-none d-sm-block mt-2">
        <button class="btn" :class="[theme == 'light' ? 'my-btn-dark' : 'btn-light']" data-bs-toggle="modal"
          data-bs-target="#editProfile" title="Edit your Profile's information.">
          Edit <i class="mdi-account-edit mdi d-none d-sm-inline"></i>
        </button>
      </div>
    </div>
    <!-- SECTION Player Characters -->
    <div class="row mt-4 px-4">
      <div class="col-12 g-0 pb-1 ps-2 rounded text-light" :class="[theme == 'light' ? 'hg-light' : 'hg-dark']">
        <span class="fs-4">
          {{ profile.name }}'s Player Characters
        </span>
      </div>
      <div class="col-12">
        <div class="row pb-1 row-of-cards mt-2 stylized-scrollbar rtl">
          <div class="row ltr g-0 justify-content-center justify-content-sm-start">
            <div v-for="c in playerCharacters" :key="c.id" class="px-2 py-2 w-auto" id="characterCard">
              <CharacterCard :character="c" />
            </div>
          </div>
          <i v-if="playerCharacters.length == 0" class="fs-5 ps-1">
            {{ profile.name }} has no Player Characters... yet.
          </i>
        </div>
      </div>
    </div>
    <!-- SECTION Parties -->
    <div class="row mt-5 px-4">
      <div class="col-12 g-0 pb-1 ps-2 rounded text-light" :class="[theme == 'light' ? 'hg-light' : 'hg-dark']">
        <span class="fs-4">
          {{ profile.name }}'s Parties
        </span>
      </div>
      <div class="col-12">
        <div class="row pb-1 row-of-cards mt-2 stylized-scrollbar rtl">
          <div class="row ltr g-0">
            <div v-for="p in parties" :key="p.id" class="w-auto px-3 py-2">

            </div>
            <i v-if="parties.length == 0" class="fs-5 ps-1">
              {{ profile.name }} has no parties they're participating in... yet.
            </i>
          </div>
        </div>
      </div>
    </div>
    <!-- SECTION Art -->
    <div class="row mt-5 px-4">
      <div class="col-12 g-0 pb-1 ps-2 rounded text-light" :class="[theme == 'light' ? 'hg-light' : 'hg-dark']">
        <span class="fs-4">
          {{ profile.name }}'s Art
        </span>
      </div>
      <div class="col-12">
        <div class="row pb-1 row-of-cards mt-2 stylized-scrollbar rtl">
          <div class="row ltr g-0">
            <div v-for="a in artArray" :key="a.id" class="w-auto px-3 py-2">

            </div>
            <i v-if="artArray.length == 0" class="fs-5 ps-1">
              {{ profile.name }} has no art posted... yet.
            </i>
          </div>
        </div>
      </div>
    </div>
    <!-- SECTION Stories -->
    <div class="row mt-5 px-4">
      <div class="col-12 g-0 pb-1 ps-2 rounded text-light" :class="[theme == 'light' ? 'hg-light' : 'hg-dark']">
        <span class="fs-4">
          {{ profile.name }}'s Stories
        </span>
      </div>
      <div class="col-12">
        <div class="row pb-1 row-of-cards mt-2 stylized-scrollbar rtl">
          <div class="row ltr g-0">
            <div v-for="s in stories" :key="s.id" class="w-auto px-3 py-2">

            </div>
            <i v-if="stories.length == 0" class="fs-5 ps-1">
              {{ profile.name }} has no stories posted... yet.
            </i>
          </div>
        </div>
      </div>
    </div>
    <!-- SECTION Non Player Characters -->
    <div v-if="profile.id == user.id" class="row mt-5 px-4">
      <div class="col-12 g-0 pb-1 ps-2 rounded text-light" :class="[theme == 'light' ? 'hg-light' : 'hg-dark']">
        <span class="fs-4">
          Your Non Player Characters
        </span>
      </div>
      <div class="col-12">
        <div class="row pb-1 row-of-cards mt-2 stylized-scrollbar rtl">
          <div class="row ltr g-0">
            <div v-for="npc in nonPlayerCharacters" :key="npc.id" class="w-auto px-3 py-2">
              <CharacterCard :character="npc" />
            </div>
            <i v-if="nonPlayerCharacters.length == 0" class="fs-5 ps-1">
              You have no NPCs made... yet.
            </i>
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
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
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
import CharacterCard from "../components/CharacterCard.vue";

export default {
  setup() {
    const route = useRoute();
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

    onMounted(() => {
      document.title = `${AppState.profile.name}'s Profile - EasilySWADE`
    })

    onUnmounted(() => {
      AppState.profile = null;
      AppState.artArray = [];
      AppState.stories = [];
      AppState.characters = [];
      AppState.parties = [];
    })

    return {
      filter,
      theme: computed(() => AppState.theme),
      user: computed(() => AppState.user),
      profile: computed(() => AppState.profile),
      artArray: computed(() => AppState.artArray),
      stories: computed(() => AppState.stories),
      playerCharacters: computed(() => AppState.characters.filter(c => c.playerCharacter == true)),
      nonPlayerCharacters: computed(() => AppState.characters.filter(c => c.playerCharacter == false)),
      parties: computed(() => AppState.filteredParties)
    }
  },

  components: { Modal, EditProfile, CharacterCard }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 20vh;
  width: 20vh;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
  user-select: none;
}

.row-of-cards {
  max-height: 30vh;
  overflow-x: hidden;
}

.stylized-scrollbar::-webkit-scrollbar {
  background-color: #505050;
  border-radius: 8px;
  width: 10px;
}

.stylized-scrollbar::-webkit-scrollbar-track {
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.452);
}

.stylized-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(75, 74, 74, 0.452);
}

.rtl {
  direction: rtl;
}

.ltr {
  direction: ltr;
}

.description-overflow {
  overflow-x: hidden;
  max-height: 145px;
}

.my-btn-dark {
  background-color: #181818;
  color: white;
}
</style>