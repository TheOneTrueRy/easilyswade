<template>
  <div class="px-3 pt-3">
    <!-- SECTION Hindrances -->
    <div class="sheet-heading text-center mb-2">HINDRANCES</div>
    <div v-for="(h, index) in sheet.hindrances" :key="h.id || h.name" class="sheet-card py-2 ps-3 pe-1 mb-2">
      <div class="d-flex align-items-center justify-content-between">
        <span class="fs-5 fw-bold lh-sm overflow-hidden pe-2">{{ h.name }}</span>
        <div v-if="canEdit" class="d-flex flex-shrink-0">
          <button type="button" class="icon-btn" :title="`Edit the '${h.name}' hindrance.`" data-bs-toggle="modal"
            data-bs-target="#editHindranceModal" @click="$emit('edit-hindrance', h)">
            <i class="mdi mdi-pencil"></i>
          </button>
          <button type="button" class="icon-btn" :title="`Delete the '${h.name}' hindrance.`"
            @click="$emit('delete-hindrance', h.name, index)">
            <i class="mdi mdi-delete accent"></i>
          </button>
        </div>
      </div>
      <div v-if="h.description" class="pb-2 pe-2 selectable" :class="expanded.includes(`h${index}`) ? '' : 'clamp-2'"
        @click="toggleExpanded(`h${index}`)">
        {{ h.description }}
      </div>
    </div>
    <i v-if="!sheet.hindrances.length" class="d-block text-center fs-5 py-2">
      No hindrances... yet.
    </i>
    <button v-if="canEdit" type="button" class="add-btn mt-2" title="Add a new Hindrance!" data-bs-toggle="modal"
      data-bs-target="#addHindranceModal">
      <i class="mdi mdi-plus-thick"></i>
    </button>

    <!-- SECTION Edges & Advances -->
    <div class="sheet-heading text-center mt-4 mb-2">EDGES & ADVANCES</div>
    <div v-for="(e, index) in sheet.edges" :key="e.id || e.name" class="sheet-card py-2 ps-3 pe-1 mb-2">
      <div class="d-flex align-items-center justify-content-between">
        <span class="fs-5 fw-bold lh-sm overflow-hidden pe-2">{{ e.name }}</span>
        <div class="d-flex align-items-center flex-shrink-0">
          <span v-if="e.rank && e.rank != 'None'" class="badge text-bg-secondary">{{ e.rank }}</span>
          <button v-if="canEdit" type="button" class="icon-btn" :title="`Delete the '${e.name}' edge.`"
            @click="$emit('delete-edge', e.name, index)">
            <i class="mdi mdi-delete accent"></i>
          </button>
        </div>
      </div>
      <div v-if="e.description" class="pb-2 pe-2 selectable" :class="expanded.includes(`e${index}`) ? '' : 'clamp-2'"
        @click="toggleExpanded(`e${index}`)">
        {{ e.description }}
      </div>
      <div v-if="e.additionalRequirements && expanded.includes(`e${index}`)" class="fs-small fst-italic pb-2">
        Requires: {{ e.additionalRequirements }}
      </div>
    </div>
    <i v-if="!sheet.edges.length" class="d-block text-center fs-5 py-2">
      No edges... yet.
    </i>
    <button v-if="canEdit" type="button" class="add-btn mt-2" title="Add a new Edge!" data-bs-toggle="modal"
      data-bs-target="#addEdgeModal">
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

  emits: ['edit-hindrance', 'delete-hindrance', 'delete-edge'],

  setup() {
    // NOTE keys like h0 / e2 (hindrance 0, edge 2) of the descriptions that are fully shown
    const expanded = ref([])

    return {
      expanded,
      toggleExpanded(key) {
        const i = expanded.value.indexOf(key)
        i == -1 ? expanded.value.push(key) : expanded.value.splice(i, 1)
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
