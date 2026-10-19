<template>
  <div v-if="sheet?.id" class="mobile-sheet" :class="sheet.dead ? 'bloody' : ''">
    <!-- SECTION Sticky Header, always shows who this is and their current vitals -->
    <header class="sheet-header sticky-top px-3 pt-2 pb-1 shadow-sm">
      <div class="sheet-inner">
        <div class="d-flex align-items-center">
          <div class="flex-grow-1 overflow-hidden pe-2">
            <div class="fs-4 fw-bold lh-sm clip-text">
              {{ sheet.name }}
            </div>
            <div class="fs-small opacity-75 clip-text">
              {{ sheet.race }} &bull; {{ sheet.rank }}
            </div>
          </div>
          <button v-if="canEdit" id="saveButton" type="button" class="btn btn-sm text-nowrap"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'" @click="$emit('save')">
            Save Changes
          </button>
        </div>
        <div class="d-flex justify-content-between fs-small pt-1">
          <span title="Wounds">
            <i class="mdi mdi-heart-broken accent"></i> {{ sheet.wounds || 0 }}
          </span>
          <span title="Fatigue">
            <i class="mdi mdi-sleep accent"></i> {{ sheet.fatigue || 0 }}
          </span>
          <span title="Bennies">
            <i class="mdi mdi-star-four-points accent"></i> {{ sheet.bennies || 0 }}
          </span>
          <span v-if="sheet.maxPowerPoints" title="Power Points">
            <i class="mdi mdi-flash accent"></i> {{ sheet.currentPowerPoints || 0 }}/{{ sheet.maxPowerPoints }}
          </span>
        </div>
      </div>
    </header>

    <!-- SECTION Active Screen -->
    <!-- NOTE inheritAttrs is off so every @event the page puts on this component is handed down to the active screen -->
    <div class="sheet-inner" :class="sheet.dead ? 'grayscale' : ''">
      <component :is="activeScreen.component" :sheet="sheet" :can-edit="canEdit" :can-see-secret="canSeeSecret"
        v-bind="$attrs" :key="activeScreen.key" />
    </div>

    <!-- SECTION Menu Button, always on screen -->
    <button type="button" class="sheet-fab btn btn-danger shadow"
      data-bs-toggle="offcanvas" data-bs-target="#sheetMenu" aria-controls="sheetMenu"
      title="Open the character sheet menu.">
      <i class="mdi mdi-menu fs-3 me-2"></i>
      <span class="fs-5">{{ activeScreen.short }}</span>
    </button>

    <!-- SECTION Menu -->
    <div class="offcanvas offcanvas-bottom sheet-menu" tabindex="-1" id="sheetMenu" aria-labelledby="sheetMenuLabel">
      <div class="offcanvas-header pb-0">
        <h5 class="offcanvas-title fw-bold clip-text" id="sheetMenuLabel">
          {{ sheet.name }}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="row row-cols-3 g-2">
          <div v-for="s in screens" :key="s.key" class="col">
            <button type="button" class="sheet-menu-tile btn" :class="s.key == activeScreen.key ? 'active' : ''"
              data-bs-dismiss="offcanvas" @click="goToScreen(s.key)">
              <i class="mdi" :class="s.icon"></i>
              <span>{{ s.short }}</span>
            </button>
          </div>
          <div class="col">
            <a class="sheet-menu-tile btn" data-bs-dismiss="offcanvas" target="_blank"
              href="https://udixydcfgbzwwnvpwubp.supabase.co/storage/v1/object/public/sandbox/God/SWADE%20Core%20Rulebook.pdf">
              <i class="mdi mdi-book-open-variant"></i>
              <span>Rulebook</span>
            </a>
          </div>
          <div class="col">
            <router-link class="sheet-menu-tile btn" data-bs-dismiss="offcanvas"
              :to="{ name: 'Profile', params: { profileId: sheet.creatorId } }" title="Head back to the creator's Profile.">
              <i class="mdi mdi-arrow-left-bold"></i>
              <span>Profile</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../../AppState.js';
import { router } from '../../router.js';
import Pop from '../../utils/Pop.js';
import SheetOverview from './SheetOverview.vue';
import SheetTraits from './SheetTraits.vue';
import SheetWeapons from './SheetWeapons.vue';
import SheetPowers from './SheetPowers.vue';
import SheetGear from './SheetGear.vue';
import SheetFeatures from './SheetFeatures.vue';
import SheetDetails from './SheetDetails.vue';

// NOTE the order here is the order of the menu, the first screen is the default
const SCREENS = [
  { key: 'overview', short: 'Overview', icon: 'mdi-account-circle', component: SheetOverview },
  { key: 'traits', short: 'Traits', icon: 'mdi-dice-d8', component: SheetTraits },
  { key: 'weapons', short: 'Weapons', icon: 'mdi-sword', component: SheetWeapons },
  { key: 'powers', short: 'Powers', icon: 'mdi-auto-fix', component: SheetPowers },
  { key: 'gear', short: 'Gear', icon: 'mdi-bag-personal', component: SheetGear },
  { key: 'features', short: 'Features', icon: 'mdi-shield-star', component: SheetFeatures },
  { key: 'details', short: 'Details', icon: 'mdi-notebook-edit', component: SheetDetails }
]

export default {
  // NOTE the page owns all of the sheet data + handlers, this component just forwards its listeners to the active screen
  inheritAttrs: false,

  emits: ['save'],

  props: {
    sheet: {
      type: Object,
      default: null
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    canSeeSecret: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const route = useRoute()

    return {
      screens: SCREENS,
      theme: computed(() => AppState.theme),
      // NOTE the screen lives in the url (?screen=powers) so reloading or sharing a link lands on the same screen
      activeScreen: computed(() => SCREENS.find(s => s.key == route.query.screen) || SCREENS[0]),
      goToScreen(screenKey) {
        try {
          router.replace({ query: { ...route.query, screen: screenKey } })
          window.scrollTo({ top: 0 })
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
