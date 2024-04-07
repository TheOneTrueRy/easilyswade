<template>
  <div class="modal fade" tabindex="-2" id={{modalId}} aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
      <div class="modal-content p-2 pb-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    modalId: {
      type: String,
      required: true
    }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>