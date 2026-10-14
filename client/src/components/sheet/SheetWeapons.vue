<template>
  <div class="px-3 pt-3">
    <div class="sheet-heading text-center mb-2">WEAPONS</div>
    <div v-for="(w, index) in sheet.weapons" :key="w.id || w.name" class="sheet-card p-3 mb-2">
      <div class="d-flex align-items-start justify-content-between">
        <span class="fs-4 fw-bold lh-sm overflow-hidden pe-2">{{ w.name }}</span>
        <span class="fs-4 fw-bold accent text-nowrap" title="Damage">{{ w.damage }}</span>
      </div>
      <div class="d-flex align-items-center mt-2">
        <div class="d-flex flex-wrap gap-2 fs-small flex-grow-1">
          <span v-if="w.range" class="badge text-bg-secondary">Range {{ w.range }}</span>
          <span class="badge text-bg-secondary">AP {{ w.ap || 0 }}</span>
          <span class="badge text-bg-secondary">ROF {{ w.rof || 1 }}</span>
          <span class="badge text-bg-secondary">WT {{ w.weight || 0 }}</span>
        </div>
        <button v-if="canEdit" type="button" class="icon-btn flex-shrink-0" :title="`Delete the '${w.name}' weapon.`"
          @click="$emit('delete-weapon', w.name, index)">
          <i class="mdi mdi-delete accent"></i>
        </button>
      </div>
      <div v-if="w.notes" class="mt-1 selectable" :class="expanded.includes(index) ? '' : 'clamp-2'"
        @click="toggleExpanded(index)">
        {{ w.notes }}
      </div>
    </div>
    <i v-if="!sheet.weapons.length" class="d-block text-center fs-5 py-3">
      No weapons... yet.
    </i>
    <button v-if="canEdit" type="button" class="add-btn mt-2" title="Add a new weapon!" data-bs-toggle="modal"
      data-bs-target="#addWeaponModal">
      <i class="mdi mdi-plus-thick"></i>
    </button>
  </div>
</template>


<script>
import { ref } from 'vue';

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

  emits: ['delete-weapon'],

  setup() {
    // NOTE indexes of the weapons whose notes are fully shown
    const expanded = ref([])

    return {
      expanded,
      toggleExpanded(index) {
        const i = expanded.value.indexOf(index)
        i == -1 ? expanded.value.push(index) : expanded.value.splice(i, 1)
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
