<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3 shadow">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }" title="Head to the Home page.">
      <div class="d-flex flex-column align-items-center">
        <span class="fs-1">EasilySWADE <i class="mdi mdi-home"></i></span>
      </div>
    </router-link>
    <div class="d-sm-none">
      <button class="btn text-light me-3" @click="toggleTheme">
        <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
      </button>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li v-if="user.id">
          <div class="dropdown d-flex justify-content-between">
            <button type="button" class="btn text-success selectable fs-5" data-bs-toggle="dropdown"
              aria-expanded="false">
              CREATE <i class="mdi mdi-menu-down"></i>
            </button>
            <ul class="dropdown-menu py-0">
              <router-link :to="{ name: 'CreateCharacter' }" title="Create a Character.">
                <li class="selectable py-2 ps-2 rounded border">
                  Character
                </li>
              </router-link>
              <!-- <li class="selectable py-2 ps-2 border">
                Party
              </li>
              <li class="selectable py-2 ps-2 border">
                Art
              </li>
              <li class="selectable py-2 ps-2 rounded-bottom border">
                Story
              </li> -->
            </ul>
            <Login class="d-sm-none p-0" />
          </div>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div class="me-3 d-none d-sm-block">
        <button class="btn text-light" @click="toggleTheme">
          <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
        </button>
      </div>
      <Login class="d-none d-sm-block" />
    </div>
  </nav>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AppState } from "../AppState.js";
export default {
  setup() {

    const theme = ref(loadState('theme') || 'light')

    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value),
        AppState.theme = theme.value
    })

    return {
      theme,
      user: computed(() => AppState.user),
      toggleTheme() {
        theme.value = theme.value == 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        saveState('theme', theme.value)
        AppState.theme = theme.value
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
