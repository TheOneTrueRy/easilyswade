<template>
  <div class="px-3 pt-3">
    <!-- SECTION Power Points -->
    <div class="sheet-card p-3 mb-3">
      <div class="d-flex align-items-center justify-content-around">
        <div class="text-center">
          <div class="sheet-label fs-small mb-1">Current PP</div>
          <div class="stepper">
            <button v-if="canEdit" type="button" class="stepper-btn" aria-label="Spend a Power Point"
              @click="$emit('update-field', 'currentPowerPoints', Math.max(0, currentPP - 1))">
              <i class="mdi mdi-minus"></i>
            </button>
            <span class="stepper-value">{{ currentPP }}</span>
            <button v-if="canEdit" type="button" class="stepper-btn" aria-label="Gain a Power Point"
              @click="$emit('update-field', 'currentPowerPoints', Math.min(maxPP, currentPP + 1))">
              <i class="mdi mdi-plus"></i>
            </button>
          </div>
        </div>
        <div class="text-center">
          <div class="sheet-label fs-small mb-1">Max PP</div>
          <div class="stepper">
            <button v-if="canEdit" type="button" class="stepper-btn" aria-label="Lower your max Power Points"
              @click="$emit('update-field', 'maxPowerPoints', Math.max(0, maxPP - 1))">
              <i class="mdi mdi-minus"></i>
            </button>
            <span class="stepper-value">{{ maxPP }}</span>
            <button v-if="canEdit" type="button" class="stepper-btn" aria-label="Raise your max Power Points"
              @click="$emit('update-field', 'maxPowerPoints', maxPP + 1)">
              <i class="mdi mdi-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <button v-if="canEdit" type="button" class="btn btn-sm w-100 mt-3"
        :class="theme == 'light' ? 'btn-dark' : 'btn-light'" :disabled="currentPP >= maxPP"
        :title="`Rest and regain 5 Power Points up to a maximum of ${maxPP}`" @click="$emit('rest-power-points')">
        <i class="mdi mdi-sleep"></i> Rest (+5 PP)
      </button>
    </div>

    <!-- SECTION Powers -->
    <div class="sheet-heading text-center mb-2">POWERS</div>
    <div v-for="(p, index) in sheet.powers" :key="p.id || p.name" class="sheet-card p-3 mb-2">
      <div class="d-flex align-items-start justify-content-between">
        <span class="fs-4 fw-bold lh-sm overflow-hidden pe-2">{{ p.name }}</span>
        <span class="fs-5 fw-bold accent text-nowrap" title="Power Points">{{ p.powerPoints || 0 }} PP</span>
      </div>
      <div class="d-flex align-items-center mt-2">
        <div class="d-flex flex-wrap gap-2 fs-small flex-grow-1">
          <span v-if="p.rank && p.rank != 'None'" class="sheet-badge">{{ p.rank }}</span>
          <span v-if="p.range" class="sheet-badge">Range {{ p.range }}</span>
          <span v-if="p.duration" class="sheet-badge">Duration {{ p.duration }}</span>
        </div>
        <div v-if="canEdit" class="d-flex flex-shrink-0">
          <button type="button" class="icon-btn" :title="`Edit the '${p.name}' power.`" data-bs-toggle="modal"
            data-bs-target="#editPowerModal" @click="$emit('edit-power', p)">
            <i class="mdi mdi-pencil"></i>
          </button>
          <button type="button" class="icon-btn" :title="`Delete the '${p.name}' power.`"
            @click="$emit('delete-power', p.name, index)">
            <i class="mdi mdi-delete accent"></i>
          </button>
        </div>
      </div>
      <div v-if="p.trappings" class="fs-small fst-italic">{{ p.trappings }}</div>
      <div v-if="p.description" class="mt-1 selectable" :class="expanded.includes(index) ? '' : 'clamp-2'"
        @click="toggleExpanded(index)">
        {{ p.description }}
      </div>
    </div>
    <i v-if="!sheet.powers.length" class="d-block text-center fs-5 py-3">
      No powers... yet.
    </i>
    <button v-if="canEdit" type="button" class="add-btn mt-2" title="Add a new Power!" data-bs-toggle="modal"
      data-bs-target="#addPowerModal">
      <i class="mdi mdi-plus-thick"></i>
    </button>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../../AppState.js';

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

  emits: ['update-field', 'rest-power-points', 'edit-power', 'delete-power'],

  setup(props) {
    // NOTE indexes of the powers whose descriptions are fully shown
    const expanded = ref([])

    return {
      expanded,
      theme: computed(() => AppState.theme),
      currentPP: computed(() => Number(props.sheet.currentPowerPoints) || 0),
      maxPP: computed(() => Number(props.sheet.maxPowerPoints) || 0),
      toggleExpanded(index) {
        const i = expanded.value.indexOf(index)
        i == -1 ? expanded.value.push(index) : expanded.value.splice(i, 1)
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
