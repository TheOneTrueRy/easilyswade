<template>
  <div class="px-3 pt-3">
    <div class="sheet-heading text-center mb-2">DETAILS</div>

    <!-- SECTION Picture -->
    <div v-if="canEdit" class="d-flex gap-2 mb-3">
      <button v-if="sheet.picture" type="button" class="btn flex-fill"
        :class="theme == 'light' ? 'btn-outline-dark' : 'btn-outline-light'" data-bs-toggle="modal"
        data-bs-target="#characterPictureModal">
        <i class="mdi mdi-magnify"></i> View Picture
      </button>
      <button type="button" class="btn flex-fill" :class="theme == 'light' ? 'btn-dark' : 'btn-light'"
        data-bs-toggle="modal" data-bs-target="#editCharacterPictureModal">
        <i class="mdi mdi-image-edit"></i> {{ sheet.picture ? 'Change Picture' : 'Upload a Picture!' }}
      </button>
    </div>

    <!-- SECTION Owner Fields, each one saves as soon as it is changed -->
    <div v-if="canEdit" class="sheet-card px-3 mb-3">
      <div class="sheet-field py-2">
        <label for="sheetName">Name</label>
        <input type="text" id="sheetName" :value="sheet.name" maxlength="120" required class="form-control"
          @change="changeRequired('name', $event)">
      </div>
      <div class="sheet-field py-2">
        <label for="sheetRace">Race</label>
        <input type="text" id="sheetRace" :value="sheet.race" maxlength="100" required class="form-control"
          @change="changeRequired('race', $event)">
      </div>
      <div class="sheet-field py-2">
        <label for="sheetRank">Rank</label>
        <select id="sheetRank" :value="sheet.rank" class="form-select"
          @change="$emit('update-field', 'rank', $event.target.value)">
          <option v-for="r in ranks" :key="r" :value="r">{{ r }}</option>
        </select>
      </div>
      <div class="row g-0">
        <div class="col-6 sheet-field py-2 pe-2">
          <label for="sheetHeight">Height</label>
          <input type="text" id="sheetHeight" :value="sheet.height" maxlength="20" class="form-control"
            @change="$emit('update-field', 'height', $event.target.value)">
        </div>
        <div class="col-6 sheet-field py-2 ps-2">
          <label for="sheetWeight">Weight</label>
          <input type="text" id="sheetWeight" :value="sheet.weight" maxlength="20" class="form-control"
            @change="$emit('update-field', 'weight', $event.target.value)">
        </div>
      </div>
      <div class="sheet-field py-2">
        <label for="sheetConviction">Conviction</label>
        <select id="sheetConviction" :value="sheet.conviction" class="form-select"
          @change="$emit('update-field', 'conviction', $event.target.value == 'true')">
          <option :value="true">True</option>
          <option :value="false">False</option>
        </select>
      </div>
      <div class="sheet-field py-2">
        <label for="sheetType">Type</label>
        <select id="sheetType" :value="sheet.playerCharacter" class="form-select"
          @change="$emit('update-field', 'playerCharacter', $event.target.value == 'true')">
          <option :value="true">Player Character</option>
          <option :value="false">Non-Player Character</option>
        </select>
      </div>
      <div class="sheet-field py-2 border-bottom-0">
        <label for="sheetPrivacy">Privacy</label>
        <select id="sheetPrivacy" :value="sheet.privacy" class="form-select"
          @change="$emit('update-field', 'privacy', $event.target.value)">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Deactivated">Deactivated</option>
        </select>
      </div>
    </div>

    <!-- SECTION Viewer Fields -->
    <div v-else class="sheet-card px-3 mb-3">
      <div v-for="field in readOnlyFields" :key="field.label" class="sheet-field py-2">
        <label>{{ field.label }}</label>
        <div class="fs-5">{{ field.value }}</div>
      </div>
    </div>

    <!-- SECTION Secret, only the owner and the DMs of their party -->
    <template v-if="canSeeSecret">
      <div class="sheet-heading text-center mt-4 mb-2">SECRET</div>
      <textarea v-if="canEdit" :value="sheet.secret" id="sheetSecret" rows="8" maxlength="5000" class="form-control"
        placeholder="Only you and the GMs of your character's party can see this..."
        @change="$emit('update-field', 'secret', $event.target.value)"></textarea>
      <div v-else class="sheet-card p-3 text-break">
        {{ sheet.secret }}
      </div>
    </template>
  </div>
</template>


<script>
import { computed } from 'vue';
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

  emits: ['update-field'],

  setup(props, { emit }) {
    return {
      ranks: ['Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary'],
      theme: computed(() => AppState.theme),
      readOnlyFields: computed(() => [
        { label: 'Name', value: props.sheet.name },
        { label: 'Race', value: props.sheet.race },
        { label: 'Rank', value: props.sheet.rank },
        { label: 'Height', value: props.sheet.height || '-' },
        { label: 'Weight', value: props.sheet.weight || '-' },
        { label: 'Conviction', value: props.sheet.conviction ? 'True' : 'False' },
        { label: 'Type', value: props.sheet.playerCharacter ? 'Player Character' : 'Non-Player Character' }
      ]),
      // NOTE the server requires these, so a blank value is put back instead of saved
      changeRequired(field, event) {
        const value = event.target.value.trim()
        if (!value) {
          event.target.value = props.sheet[field]
          return
        }
        emit('update-field', field, value)
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
