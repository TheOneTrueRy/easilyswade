<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    <span class="px-2 py-2 text-center">
      EasilySWADE is a free to use, fan-made resource created by and for DMs and players
      alike. This site is not
      officially affiliated with Pinnacle Entertainment Group (PEG) and does not own the copyrights to any associated
      Savage Worlds content.</span>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
}

footer span {
  font-size: x-small;
}
</style>
