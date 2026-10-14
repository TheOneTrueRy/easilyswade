<template>
  <div class="px-3 pt-3">
    <div class="sheet-heading text-center mb-2">GEAR</div>
    <div v-for="(g, index) in sheet.gear" :key="`${g}-${index}`"
      class="sheet-card ps-3 mb-2 d-flex align-items-center justify-content-between">
      <span class="fs-5 py-2 overflow-hidden text-break">{{ g }}</span>
      <div v-if="canEdit" class="d-flex flex-shrink-0">
        <button type="button" class="icon-btn" :title="`Edit the '${g}' gear item.`" data-bs-toggle="modal"
          data-bs-target="#editGearModal" @click="$emit('edit-gear', index, g)">
          <i class="mdi mdi-pencil"></i>
        </button>
        <button type="button" class="icon-btn" :title="`Delete the '${g}' gear item.`"
          @click="$emit('delete-gear', g, index)">
          <i class="mdi mdi-delete accent"></i>
        </button>
      </div>
    </div>
    <i v-if="!sheet.gear.length" class="d-block text-center fs-5 py-3">
      Nothing in the pack... yet.
    </i>
    <!-- NOTE the page's addGear() reads this input by its id -->
    <div v-if="canEdit" class="input-group mt-2">
      <input type="text" name="gear" id="gear" placeholder="Add a piece of gear..." class="form-control"
        @keydown.enter.prevent="$emit('add-gear')">
      <button type="button" class="btn btn-outline-secondary" title="Add this item to the Gear list."
        @click="$emit('add-gear')">
        <i class="mdi mdi-plus-thick"></i>
      </button>
    </div>
  </div>
</template>


<script>
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

  emits: ['add-gear', 'edit-gear', 'delete-gear'],

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>
