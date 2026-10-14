<template>
  <div class="px-3 pt-3">
    <!-- SECTION Portrait + Identity -->
    <div class="d-flex align-items-center mb-3">
      <div class="sheet-avatar flex-shrink-0 d-flex align-items-end justify-content-end p-1 selectable"
        :style="sheet.picture ? { backgroundImage: `url(${sheet.picture})` } : {}"
        :data-bs-toggle="sheet.picture || canEdit ? 'modal' : null"
        :data-bs-target="sheet.picture ? '#characterPictureModal' : canEdit ? '#editCharacterPictureModal' : null"
        :title="sheet.picture ? 'Enlarge the character picture.' : 'Upload a picture!'">
        <i v-if="!sheet.picture" class="mdi mdi-image-plus fs-1 m-auto opacity-50"></i>
      </div>
      <div class="ps-3 overflow-hidden">
        <div class="fs-small">
          <span v-if="sheet.height">Height: {{ sheet.height }}</span>
          <span v-if="sheet.height && sheet.weight"> &bull; </span>
          <span v-if="sheet.weight">Weight: {{ sheet.weight }}</span>
        </div>
        <div class="fs-small">
          {{ sheet.playerCharacter ? 'Player Character' : 'Non-Player Character' }}
        </div>
        <span v-if="sheet.conviction" class="badge bg-danger mt-1" title="This character has Conviction.">
          Conviction
        </span>
        <span v-if="sheet.dead" class="badge bg-dark border mt-1 ms-1">
          <i class="mdi mdi-skull"></i> Dead
        </span>
      </div>
    </div>

    <!-- SECTION Pace, Parry, Toughness -->
    <div class="row g-2 mb-3">
      <div class="col-4" v-for="stat in defenses" :key="stat.field">
        <div class="sheet-card stat-tile" :title="stat.title">
          <input v-if="canEdit" type="text" :value="sheet[stat.field]" maxlength="20" class="stat-value"
            :aria-label="stat.label" @change="$emit('update-field', stat.field, $event.target.value)">
          <span v-else class="stat-value">{{ sheet[stat.field] }}</span>
          <span class="sheet-label fs-small">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- SECTION Wounds + Fatigue -->
    <div class="sheet-card p-3 mb-3">
      <div class="sheet-label mb-2">Wounds</div>
      <div class="d-flex gap-2">
        <button v-for="n in woundLevels" :key="n" type="button" class="chip" :class="{ active: wounds == n }"
          :disabled="!canEdit" @click="$emit('update-field', 'wounds', n)">
          {{ n }}
        </button>
      </div>
      <div class="sheet-label mt-3 mb-2">Fatigue</div>
      <div class="d-flex gap-2">
        <button v-for="n in fatigueLevels" :key="n" type="button" class="chip" :class="{ active: fatigue == n }"
          :disabled="!canEdit" @click="$emit('update-field', 'fatigue', n)">
          {{ n }}
        </button>
      </div>
    </div>

    <!-- SECTION Bennies -->
    <div class="sheet-card p-3 mb-3 d-flex align-items-center justify-content-between">
      <span class="sheet-label">Bennies</span>
      <div class="stepper">
        <button v-if="canEdit" type="button" class="stepper-btn" aria-label="Spend a benny"
          @click="$emit('update-field', 'bennies', String(Math.max(0, bennies - 1)))">
          <i class="mdi mdi-minus"></i>
        </button>
        <span class="stepper-value">{{ bennies }}</span>
        <button v-if="canEdit" type="button" class="stepper-btn" aria-label="Gain a benny"
          @click="$emit('update-field', 'bennies', String(bennies + 1))">
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>

    <!-- SECTION Attributes at a glance, edit them on the Traits screen -->
    <div class="sheet-card p-2 mb-3">
      <div class="d-flex justify-content-between text-center">
        <div v-for="a in attributes" :key="a.field" class="flex-fill rounded" :class="{ 'roll-target': rolling }"
          @click="rollAttribute(a)">
          <div class="fs-5 fw-bold accent">
            d{{ sheet[a.field] }}<span v-if="sheet[a.field] == 12 && sheet[`${a.field}Bonus`]">+{{
              sheet[`${a.field}Bonus`] }}</span>
          </div>
          <div class="fs-small">{{ a.short }}</div>
        </div>
      </div>
    </div>

    <!-- SECTION Dead -->
    <button v-if="canEdit" type="button" class="btn w-100"
      :class="sheet.dead ? 'btn-outline-light border-secondary' : 'btn-outline-danger'"
      @click="$emit('update-field', 'dead', !sheet.dead)">
      <i class="mdi" :class="sheet.dead ? 'mdi-undo' : 'mdi-skull'"></i>
      {{ sheet.dead ? 'Bring them back!' : 'Mark your character as dead...' }}
    </button>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../../AppState.js';
import { diceService } from '../../services/DiceService.js';
import Pop from '../../utils/Pop.js';

export default {
  props: {
    sheet: {
      type: Object,
      required: true
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

  emits: ['update-field'],

  setup(props) {
    return {
      woundLevels: [0, 1, 2, 3],
      fatigueLevels: [0, 1, 2],
      defenses: [
        { field: 'pace', label: 'Pace', title: 'Pace is a default of 6 plus or minus any values from certain hindrances, edges, etc.' },
        { field: 'parry', label: 'Parry', title: "Parry is 2 plus half your character's Fighting skill die, plus any bonuses from shields or certain weapons." },
        { field: 'toughness', label: 'Toughness', title: "Toughness is 2 plus half your character's Vigor attribute." }
      ],
      attributes: [
        { field: 'agility', label: 'Agility', short: 'AGI' },
        { field: 'smarts', label: 'Smarts', short: 'SMA' },
        { field: 'spirit', label: 'Spirit', short: 'SPI' },
        { field: 'strength', label: 'Strength', short: 'STR' },
        { field: 'vigor', label: 'Vigor', short: 'VIG' }
      ],
      // NOTE while the dice tray is open, tapping an attribute adds its die to the roll
      rolling: computed(() => AppState.diceTray.open),
      rollAttribute(attribute) {
        try {
          if (!AppState.diceTray.open) { return }
          const die = props.sheet[attribute.field]
          diceService.addToPool(attribute.label, die, die == 12 ? props.sheet[`${attribute.field}Bonus`] : 0)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      wounds: computed(() => Number(props.sheet.wounds) || 0),
      fatigue: computed(() => Number(props.sheet.fatigue) || 0),
      // NOTE bennies is a free text field on the desktop sheet, anything that isn't a number counts as 0
      bennies: computed(() => parseInt(props.sheet.bennies) || 0)
    }
  }
}
</script>


<style lang="scss" scoped></style>
