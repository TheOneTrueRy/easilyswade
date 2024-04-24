<template>
  <form class="container-fluid" @submit.prevent="editAccount">
    <div class="row">
      <div class="col-12 d-flex justify-content-between align-items-center mb-4">
        <span class="fs-3">
          Edit Your Profile
        </span>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close Modal">
        </button>
      </div>
      <div class="col-12 mb-3">
        <label for="name" class="form-label mb-0">Name</label>
        <input type="text" id="name" v-model="editable.name" required class="form-control" maxlength="200">
      </div>
      <div class="col-12 mb-3">
        <label for="picture" class="form-label mb-0">Profile Picture</label>
        <input type="file" id="picture" name="fileInput" class="form-control">
      </div>
      <div class="col-12 mb-4">
        <label for="description" class="form-label mb-0">Description</label>
        <textarea type="text" id="description" v-model="editable.description" class="form-control" maxlength="1750">
        </textarea>
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">
          Save Changes
        </button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";

export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })

    return {
      editable,
      async editAccount(e) {
        try {
          const file = e.target.fileInput.files[0]
          const formData = editable.value;
          await accountService.editAccount(file, formData);
        } catch (error) {
          Pop.error('Experienced an error attempting to edit your account.', error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>