<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex align-items-center justify-content-center py-4">
        <span id="EasilySWADE" class="fade-in">
          EasilySWADE
        </span>
      </div>
      <form @submit.prevent="searchProfiles"
        class="col-8 offset-2 d-flex justify-content-center align-items-center py-3 fade-in">
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
import { onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";
import { router } from "../router.js";

export default {
  setup() {
    const editable = ref({})

    onMounted(() => {
      document.title = 'Home - EasilySwade'
    })

    return {
      editable,
      async searchProfiles() {
        try {
          const query = editable.value
          await profilesService.searchProfiles(query)
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

.fade-in {
  animation: fade-in 3s;
}

#EasilySWADE {
  font-size: 4rem;
  font-weight: bold;
}
</style>
