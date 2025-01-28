<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex align-items-center justify-content-center py-4">
        <span id="EasilySWADE" class="fade-in">
          EasilySWADE
        </span>
      </div>
      <form @submit.prevent="search"
        class="col-8 offset-2 d-flex justify-content-center align-items-center py-3 fade-in">
        <div class="w-100">
          <label for="query" class="form-label col-2">
            Search for:
            <select v-model="searchType" name="searchSelect" id="searchSelect" class="form-control">
              <option selected value="Profiles">
                Profiles
              </option>
              <option value="Characters">
                Characters
              </option>
              <option value="Parties">
                Parties
              </option>
            </select>
          </label>
          <input v-model="editable.query" type="text" name="query" id="query"
            :placeholder="searchType == 'Profiles' ? 'Profile name...' : searchType == 'Characters' ? 'Character name...' : searchType == 'Parties' ? 'Party name...' : ''"
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
import { charactersService } from "../services/CharactersService.js";
import { partiesService } from "../services/PartiesService.js";

export default {
  setup() {
    const editable = ref({ query: '' })
    const searchType = ref('Profiles')

    onMounted(() => {
      document.title = 'Home - EasilySwade'
      console.log(searchType.value)
    })

    return {
      editable,
      searchType,
      async searchProfiles() {
        try {
          const query = editable.value
          await profilesService.searchProfiles(query)
          editable.value = { query: '' }
          router.push({ name: 'Search' })
        } catch (error) {
          Pop.error('Experienced an error when attempting to search profiles.', error.message)
        }
      },
      async searchCharacters() {
        try {
          const query = editable.value
          await charactersService.searchCharacters(query)
          editable.value = { query: '' }
          router.push({ name: 'Search' })
        } catch (error) {
          Pop.error('Experienced an error when attempting to search characters.', error.message)
        }
      },
      async searchParties() {
        try {
          const query = editable.value
          await partiesService.searchParties(query)
          editable.value = { query: '' }
          router.push({ name: 'Search' })
        } catch (error) {
          Pop.error('Experienced an error when attempting to search parties.', error.message)
        }
      },
      search() {
        try {
          if (searchType.value == 'Profiles') {
            // @ts-ignore
            this.searchProfiles()
          } else if (searchType.value == 'Characters') {
            // @ts-ignore
            this.searchCharacters()
          } else if (searchType.value == 'Parties') {
            // @ts-ignore
            this.searchParties()
          }
        } catch (error) {
          Pop.error('Experienced an error attempted to even search anything at all just kill me')
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
