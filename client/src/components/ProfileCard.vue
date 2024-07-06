<template>
  <div class="col-12 p-4" :class="theme == 'light' ? 'border-dark' : 'border-light'">
    <div class="row rounded border py-2" :class="theme == 'light' ? 'bg-light border-dark' : 'bg-dark border-light'">
      <div class="picture-section">
        <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
          <img :src="profile.picture" :alt="`${profile.name}'s Picture`" class="profile-picture rounded"
            :class="theme == 'light' ? 'hover-dark' : 'hover-light'">
        </router-link>
      </div>
      <div class="col-10">
        <div class="row">
          <span class="fs-5 fw-bold profile-name">
            <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
              {{ profile.name }}
            </router-link>
          </span>
        </div>
        <div class="row profile-description ellipsis">
          <span>
            {{ profile.description }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";


export default {
  props: {
    profile: {
      type: Profile,
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
.profile-picture {
  height: 20vh;
  width: 20vh;
  object-fit: cover;
  object-position: center;
  transition: 0.6s;
}

.profile-name {
  transition: 0.6s;
  height: 10%;
  width: fit-content;
}

.profile-picture:hover {
  transform: scale(1.05);
}

.profile-name:hover {
  transform: scale(1.1);
}

.profile-picture:active {
  transform: scale(0.9);
}

.profile-name:active {
  transform: scale(0.9);
}

.hover-dark:hover {
  box-shadow: 0px 0px 6px black;
}

.hover-light:hover {
  box-shadow: 0px 0px 6px white;
}

.ellipsis {
  text-wrap: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-description {
  max-height: 16vh;
}

.picture-section {
  flex: 0 0 auto;
  width: fit-content;
}
</style>