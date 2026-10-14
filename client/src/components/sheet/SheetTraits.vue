<template>
  <div class="px-3 pt-3">
    <!-- SECTION Attributes -->
    <div class="sheet-heading text-center mb-2">ATTRIBUTES</div>
    <div v-for="a in attributes" :key="a.field" class="sheet-card mb-2">
      <div class="trait-row" :class="{ selectable: canEdit }" @click="canEdit && toggleOpen(a.field)">
        <span class="fs-5 fw-bold">{{ a.label }}</span>
        <span class="trait-die">
          d{{ sheet[a.field] }}<span v-if="sheet[a.field] == 12 && sheet[`${a.field}Bonus`]">+{{
            sheet[`${a.field}Bonus`] }}</span>
          <i v-if="canEdit" class="mdi text-body fs-5 ms-1" :class="open == a.field ? 'mdi-chevron-up' : 'mdi-chevron-down'"></i>
        </span>
      </div>
      <div v-if="canEdit && open == a.field" class="px-3 pb-3">
        <div class="d-flex gap-2">
          <button v-for="die in dice" :key="die" type="button" class="chip" :class="{ active: sheet[a.field] == die }"
            @click="$emit('update-field', a.field, die)">
            {{ die }}
          </button>
        </div>
        <div v-if="sheet[a.field] == 12" class="d-flex align-items-center justify-content-between mt-3">
          <span class="fs-small" title="Bonus gained after the die is already a d12.">Post-d12 Bonus</span>
          <div class="stepper">
            <button type="button" class="stepper-btn" aria-label="Decrease the bonus"
              @click="$emit('update-field', `${a.field}Bonus`, Math.max(0, (sheet[`${a.field}Bonus`] || 0) - 1))">
              <i class="mdi mdi-minus"></i>
            </button>
            <span class="stepper-value">+{{ sheet[`${a.field}Bonus`] || 0 }}</span>
            <button type="button" class="stepper-btn" aria-label="Increase the bonus"
              @click="$emit('update-field', `${a.field}Bonus`, Math.min(5, (sheet[`${a.field}Bonus`] || 0) + 1))">
              <i class="mdi mdi-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION Skills -->
    <div class="sheet-heading text-center mt-4 mb-2">SKILLS</div>
    <div v-for="(s, index) in sheet.skills" :key="s.name" class="sheet-card mb-2">
      <div class="trait-row" :class="{ selectable: canEdit }" @click="canEdit && toggleOpen(`skill-${s.name}`)">
        <span class="fs-5 overflow-hidden clip-text">{{ s.name }}</span>
        <span class="trait-die text-nowrap">
          d{{ s.die }}<span v-if="s.die == 12 && s.dieBonus">+{{ s.dieBonus }}</span>
          <i v-if="canEdit" class="mdi text-body fs-5 ms-1" :class="open == `skill-${s.name}` ? 'mdi-chevron-up' : 'mdi-chevron-down'"></i>
        </span>
      </div>
      <div v-if="canEdit && open == `skill-${s.name}`" class="px-3 pb-3">
        <div class="d-flex gap-2">
          <button v-for="die in dice" :key="die" type="button" class="chip" :class="{ active: s.die == die }"
            @click="$emit('update-skill', s.name, 'die', die)">
            {{ die }}
          </button>
        </div>
        <div v-if="s.die == 12" class="d-flex align-items-center justify-content-between mt-3">
          <span class="fs-small" title="Bonus gained after the die is already a d12.">Post-d12 Bonus</span>
          <div class="stepper">
            <button type="button" class="stepper-btn" aria-label="Decrease the bonus"
              @click="$emit('update-skill', s.name, 'dieBonus', Math.max(0, (s.dieBonus || 0) - 1))">
              <i class="mdi mdi-minus"></i>
            </button>
            <span class="stepper-value">+{{ s.dieBonus || 0 }}</span>
            <button type="button" class="stepper-btn" aria-label="Increase the bonus"
              @click="$emit('update-skill', s.name, 'dieBonus', Math.min(5, (s.dieBonus || 0) + 1))">
              <i class="mdi mdi-plus"></i>
            </button>
          </div>
        </div>
        <button v-if="!coreSkills.includes(s.name)" type="button" class="btn btn-sm btn-danger mt-3"
          @click="$emit('delete-skill', s.name, index)">
          <i class="mdi mdi-trash-can"></i> Delete {{ s.name }}
        </button>
      </div>
    </div>
    <button v-if="canEdit" type="button" class="add-btn mt-2" title="Add a new Skill!" data-bs-toggle="modal"
      data-bs-target="#addSkillModal">
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

  emits: ['update-field', 'update-skill', 'delete-skill'],

  setup() {
    // NOTE which attribute/skill is expanded into its die picker, only one at a time
    const open = ref('')

    return {
      open,
      dice: [4, 6, 8, 10, 12],
      attributes: [
        { field: 'agility', label: 'Agility' },
        { field: 'smarts', label: 'Smarts' },
        { field: 'spirit', label: 'Spirit' },
        { field: 'strength', label: 'Strength' },
        { field: 'vigor', label: 'Vigor' }
      ],
      // NOTE same skills the desktop sheet refuses to delete
      coreSkills: ['Athletics', 'Common Knowledge', 'Notice', 'Persuasion', 'Stealth'],
      toggleOpen(key) {
        open.value = open.value == key ? '' : key
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
