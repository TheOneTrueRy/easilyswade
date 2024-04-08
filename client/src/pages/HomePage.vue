<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex align-items-center justify-content-center py-4">
        <span id="EasilySWADE" class="">
          EasilySWADE
        </span>
      </div>
      <form @submit.prevent="searchProfiles"
        class="col-8 offset-2 d-flex justify-content-center align-items-center py-3">
        <div class="w-100">
          <label for="query" class="form-label">Search for: Profiles</label>
          <input v-model="editable.query" type="text" name="query" id="query" placeholder="Profile Name..."
            class="form-control">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";
import { router } from "../router.js";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async searchProfiles() {
        try {
          const searchQuery = editable.value
          await profilesService.searchProfiles(searchQuery)
          editable.value = {}
          router.push({ name: 'Search' })
        } catch (error) {
          Pop.error('Experienced an error when attempting to search profiles.', error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes fade-in {
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
}

#EasilySWADE {
  animation: fade-in 3s;
  font-size: 4rem;
  font-weight: bold;
}
</style>
