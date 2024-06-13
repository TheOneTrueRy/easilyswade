<!-- TODO 
  Move Secret to be a Powers/Weapons sized textarea underneath Weapons
  PP section underneath Wounds and Fatigue, same size
  Background banner, probably gradient, on the hindrances and edges column and around attributes + skills
  Possibly Border Lines to be separating sections more so everything isn't blending together as much
  MAKE NON-CREATOR NON-FORM VERSION
  UPDATE CREATE CHARACTER PAGE WITH CHANGES ABOVE
-->
<template>
  <div v-if="character.creatorId == user.id" class="py-3" :class="editable.dead ? 'bloody' : ''">
    <form class="container-fluid" v-on:keydown.enter.prevent @submit.prevent="saveSheet"
      :class="editable.dead ? 'grayscale' : ''">
      <div class="row mt-1">
        <div class="col-9">
          <div class="row">
            <div class="col-6">
              <div class="row px-2">
                <div class="col-12 text-center">
                  <span class="fs-3 fw-bold text-danger">
                    ATTRIBUTES
                  </span>
                </div>
                <!-- SECTION AGILITY -->
                <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(4)">
                    <span :class="[editable.agility == 4 ? 'fw-bold' : 'opacity-50']">
                      4
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(6)">
                    <span :class="[editable.agility == 6 ? 'fw-bold' : 'opacity-50']">
                      6
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(8)">
                    <span :class="[editable.agility == 8 ? 'fw-bold' : 'opacity-50']">
                      8
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(10)">
                    <span :class="[editable.agility == 10 ? 'fw-bold' : 'opacity-50']">
                      10
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeAgility(12)">
                    <span :class="[editable.agility == 12 ? 'fw-bold' : 'opacity-50']">
                      12
                    </span>
                  </div>
                  <div class="ms-2 text-center border-bottom attribute-number"
                    :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                    <input required v-model="editable.agility" type="number"
                      class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                  </div>
                  <div class="col-4 ps-2">
                    <span class="fs-5 fw-bold">
                      AGILITY
                    </span>
                  </div>
                </div>
                <!-- SECTION SMARTS -->
                <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(4)">
                    <span :class="[editable.smarts == 4 ? 'fw-bold' : 'opacity-50']">
                      4
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(6)">
                    <span :class="[editable.smarts == 6 ? 'fw-bold' : 'opacity-50']">
                      6
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(8)">
                    <span :class="[editable.smarts == 8 ? 'fw-bold' : 'opacity-50']">
                      8
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(10)">
                    <span :class="[editable.smarts == 10 ? 'fw-bold' : 'opacity-50']">
                      10
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSmarts(12)">
                    <span :class="[editable.smarts == 12 ? 'fw-bold' : 'opacity-50']">
                      12
                    </span>
                  </div>
                  <div class="ms-2 text-center border-bottom attribute-number"
                    :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                    <input required v-model="editable.smarts" type="number"
                      class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                  </div>
                  <div class="col-4 ps-2">
                    <span class="fs-5 fw-bold">
                      SMARTS
                    </span>
                  </div>
                </div>
                <!-- SECTION SPIRIT -->
                <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(4)">
                    <span :class="[editable.spirit == 4 ? 'fw-bold' : 'opacity-50']">
                      4
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(6)">
                    <span :class="[editable.spirit == 6 ? 'fw-bold' : 'opacity-50']">
                      6
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(8)">
                    <span :class="[editable.spirit == 8 ? 'fw-bold' : 'opacity-50']">
                      8
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(10)">
                    <span :class="[editable.spirit == 10 ? 'fw-bold' : 'opacity-50']">
                      10
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSpirit(12)">
                    <span :class="[editable.spirit == 12 ? 'fw-bold' : 'opacity-50']">
                      12
                    </span>
                  </div>
                  <div class="ms-2 text-center border-bottom attribute-number"
                    :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                    <input required v-model="editable.spirit" type="number"
                      class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                  </div>
                  <div class="col-4 ps-2">
                    <span class="fs-5 fw-bold">
                      SPIRIT
                    </span>
                  </div>
                </div>
                <!-- SECTION STRENGTH -->
                <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(4)">
                    <span :class="[editable.strength == 4 ? 'fw-bold' : 'opacity-50']">
                      4
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(6)">
                    <span :class="[editable.strength == 6 ? 'fw-bold' : 'opacity-50']">
                      6
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(8)">
                    <span :class="[editable.strength == 8 ? 'fw-bold' : 'opacity-50']">
                      8
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(10)">
                    <span :class="[editable.strength == 10 ? 'fw-bold' : 'opacity-50']">
                      10
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeStrength(12)">
                    <span :class="[editable.strength == 12 ? 'fw-bold' : 'opacity-50']">
                      12
                    </span>
                  </div>
                  <div class="ms-2 text-center border-bottom attribute-number"
                    :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                    <input required v-model="editable.strength" type="number"
                      class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                  </div>
                  <div class="col-4 ps-2">
                    <span class="fs-5 fw-bold">
                      STRENGTH
                    </span>
                  </div>
                </div>
                <!-- SECTION VIGOR -->
                <div class="col-12 align-items-center justify-content-center g-0 d-flex">
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(4)">
                    <span :class="[editable.vigor == 4 ? 'fw-bold' : 'opacity-50']">
                      4
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(6)">
                    <span :class="[editable.vigor == 6 ? 'fw-bold' : 'opacity-50']">
                      6
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(8)">
                    <span :class="[editable.vigor == 8 ? 'fw-bold' : 'opacity-50']">
                      8
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(10)">
                    <span :class="[editable.vigor == 10 ? 'fw-bold' : 'opacity-50']">
                      10
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeVigor(12)">
                    <span :class="[editable.vigor == 12 ? 'fw-bold' : 'opacity-50']">
                      12
                    </span>
                  </div>
                  <div class="ms-2 text-center border-bottom attribute-number"
                    :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                    <input required v-model="editable.vigor" type="number"
                      class="fw-bold text-danger attribute-input w-100 h-100 p-0 text-center fs-5" readonly>
                  </div>
                  <div class="col-4 ps-2">
                    <span class="fs-5 fw-bold">
                      VIGOR
                    </span>
                  </div>
                </div>
              </div>
              <div class="row px-2 mt-4">
                <div class="col-12 text-center">
                  <span class="fs-3 fw-bold text-danger">
                    SKILLS
                  </span>
                </div>
                <div v-for="(s, index) in editable.skills" :key="s.name"
                  class="col-12 align-items-center justify-content-center g-0 d-flex skill-line">
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.name, 4)">
                    <span :class="[s.die == 4 ? 'fw-bold' : 'opacity-50']">
                      4
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.name, 6)">
                    <span :class="[s.die == 6 ? 'fw-bold' : 'opacity-50']">
                      6
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.name, 8)">
                    <span :class="[s.die == 8 ? 'fw-bold' : 'opacity-50']">
                      8
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.name, 10)">
                    <span :class="[s.die == 10 ? 'fw-bold' : 'opacity-50']">
                      10
                    </span>
                  </div>
                  <div class="text-center border attribute-number selectable no-highlight"
                    :class="[theme == 'light' ? 'border-dark' : '']" @click="changeSkillDie(s.name, 12)">
                    <span :class="[s.die == 12 ? 'fw-bold' : 'opacity-50']">
                      12
                    </span>
                  </div>
                  <div class="ms-2 text-center border-bottom attribute-number"
                    :class="[theme == 'light' ? 'border-dark' : 'border-light']">
                    <input required v-model="s.die" type="number"
                      class="fw-bold attribute-input text-danger w-100 h-100 p-0 text-center fs-5" readonly>
                  </div>
                  <div class="col-4 ps-1 d-flex justify-content-between h-100 border-bottom border-1 ms-1"
                    :class="theme == 'light' ? 'border-dark' : 'border-light'">
                    <div class="d-flex align-items-end"
                      :class="s.name !== 'Athletics' && s.name !== 'Common Knowledge' && s.name !== 'Notice' && s.name !== 'Persuasion' && s.name !== 'Stealth' ? 'ellipsis' : 'nowrap'">
                      <span class="fs-small">
                        {{ s.name }}
                      </span>
                    </div>
                    <button
                      v-if="s.name !== 'Athletics' && s.name !== 'Common Knowledge' && s.name !== 'Notice' && s.name !== 'Persuasion' && s.name !== 'Stealth'"
                      type="button" class="btn btn-danger py-0 px-1 delete-skill d-none"
                      @click="deleteSkill(s.name, index)"><i class="mdi mdi-trash-can"></i></button>
                  </div>
                </div>
                <div class="col-8 offset-2 rounded selectable text-center mt-2 border"
                  :class="theme == 'light' ? 'border-dark' : ''" title="Add a new Skill!" data-bs-toggle="modal"
                  data-bs-target="#addSkillModal">
                  <i class="mdi mdi-plus-thick"></i>
                </div>
              </div>
            </div>
            <div class="col-6 ps-0 px-4">
              <div class="row mt-4">
                <div class="col-12 d-flex align-items-end px-0"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <label for="name" class="border-bottom border-1">Name:</label>
                  <input type="text" required v-model="editable.name" name="name" id="name" maxlength="120"
                    class="form-control p-0 ps-1 border-0 border-bottom rounded-0">
                </div>
                <div class="col-9 d-flex align-items-end px-0"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <label for="race" class="border-bottom border-1">Race:</label>
                  <input type="text" required v-model="editable.race" name="race" id="race" maxlength="100"
                    class="form-control p-0 ps-1 border-0 border-bottom border-end rounded-0">
                </div>
                <div class="col-3 d-flex align-items-end g-0 ps-0"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <input type="text" required v-model="editable.height" name="height" id="height" maxlength="20"
                    class="form-control py-0 px-1 border-0 border-bottom border-start rounded-0">
                  <label for="height" class="border-bottom border-1">HT</label>
                </div>
                <div class="col-9 d-flex align-items-end px-0"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <label for="rank" class="border-bottom border-1">Rank:</label>
                  <select v-model="editable.rank" name="rank" id="rank"
                    class="form-control p-0 ps-1 border-0 border-bottom rounded-0 border-end">
                    <option selected value="Novice">Novice</option>
                    <option value="Seasoned">Seasoned</option>
                    <option value="Veteran">Veteran</option>
                    <option value="Heroic">Heroic</option>
                    <option value="Legendary">Legendary</option>
                  </select>
                </div>
                <div class="col-3 d-flex align-items-end g-0 ps-0"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <input type="number" required v-model="editable.weight" name="weight" id="weight"
                    class="form-control py-0 px-1 border-0 border-bottom border-start rounded-0">
                  <label for="height" class="border-bottom border-1">WT</label>
                </div>
                <div class="col-9 d-flex align-items-end px-0"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <label for="conviction" class="border-bottom border-1">Conviction:</label>
                  <select v-model="editable.conviction" name="conviction" id="conviction"
                    class="form-control py-0 px-1 border-0 border-bottom border-end rounded-0">
                    <option :value="true">True</option>
                    <option :value="false">False</option>
                  </select>
                </div>
                <div class="col-3 d-flex align-items-end px-0">
                  <input type="text" required v-model="editable.bennies" name="bennies" id="bennies" maxlength="10"
                    class="form-control p-0 ps-1 border-0 border-bottom border-start rounded-0"
                    :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <label for="bennies" class="border-bottom border-1"
                    :class="theme == 'light' ? 'border-dark' : 'border-light'">Bennies</label>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-4 d-flex flex-column align-items-center justify-content-center px-0">
                  <input type="number" required v-model="editable.pace" name="pace" id="pace"
                    class="form-control text-center fw-bold fs-5 p-0 w-50"
                    title="Pace is a default of 6 plus or minus any values from certain hindrances, edges, etc.">
                  <label for="pace" class="fw-bold fs-5"
                    title="Pace is a default of 6 plus or minus any values from certain hindrances, edges, etc.">Pace</label>
                </div>
                <div class="col-4 d-flex flex-column align-items-center px-0">
                  <input type="number" required v-model="editable.parry" name="parry" id="parry"
                    class="form-control text-center fw-bold fs-5 p-0 w-50"
                    title="Parry is 2 plus half your character's Fighting skill die, plus any bonuses from shields or certain weapons.">
                  <label for="parry" class="fw-bold fs-5"
                    title="Parry is 2 plus half your character's Fighting skill die, plus any bonuses from shields or certain weapons.">Parry</label>
                </div>
                <div class="col-4 d-flex flex-column align-items-center px-0">
                  <input type="number" required v-model="editable.toughness" name="toughness" id="toughness"
                    class="form-control text-center fw-bold fs-5 p-0 w-50"
                    title="Toughness is 2 plus half your character's Vigor attribute.">
                  <label for="toughness" class="fw-bold fs-5"
                    title="Toughness is 2 plus half your character's Vigor attribute.">Toughness</label>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-12 text-center">
                  <span class="fs-3 fw-bold text-danger">
                    GEAR
                  </span>
                </div>
                <div v-for="(g, index) in editable.gear" :key="g" class="col-12 border-bottom border-1 pe-0 ps-1"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <div class="input-group">
                    <span class="fs-small d-flex align-items-center flex-grow">
                      {{ g }}
                    </span>
                    <div class="input-group-append selectable">
                      <button type="button" class="btn py-0" @click="deleteGear(g, index)"
                        :title="`Delete the '${g}' gear item.`">
                        <i class="mdi mdi-delete text-danger"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-12 border-bottom border-1 g-0"
                  :class="theme == 'light' ? 'border-dark' : 'border-light'">
                  <div class="input-group">
                    <input type="text" class="form-control py-0 bg-none border-0 fs-small ps-1" name="gear" id="gear">
                    <div class="input-group-append selectable">
                      <button class="btn py-0" type="button" @click="addGear()" title="Add this item to the Gear list.">
                        <i class="mdi mdi-plus-thick"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6 d-flex align-items-center justify-content-center">
              <div class="col-5 d-flex align-items-center justify-content-end">
                <label for="maxPP" class="fs-4 fw-bold text-danger">MAX PP</label>
                <input type="number" name="maxPP" id="maxPP" required v-model="editable.maxPowerPoints"
                  class="form-control w-25 ms-4 fs-5 py-1">
              </div>
              <div class="col-2 d-flex align-items-center justify-content-center">
                <div
                  class="bg-dark border border-1 border-dark rounded-circle death-btn d-flex align-items-center justify-content-center"
                  @click="restorePowerPoints"
                  :title="`Rest and regain 5 Power Points up to a maximum of ${editable.maxPowerPoints}`">
                  <i class="mdi mdi-sleep fs-1 holy-undo text-light"></i>
                </div>
              </div>
              <div class="col-5 d-flex align-items-center justify-content-start">
                <input type="number" name="currentPP" id="currentPP" required v-model="editable.currentPowerPoints"
                  class="form-control w-25 me-4 fs-5 py-1">
                <label for="currentPP" class="fs-4 fw-bold text-danger">CUR. PP</label>
              </div>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
              <div class="col-5 d-flex align-items-center justify-content-end">
                <label for="wounds" class="fs-4 fw-bold text-danger">WOUNDS</label>
                <select v-model="editable.wounds" name="wounds" id="wounds" class="form-control w-25 ms-4 fs-5 py-1">
                  <option selected value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="INC">INC</option>
                </select>
              </div>
              <div class="col-2 d-flex align-items-center justify-content-center">
                <div
                  class="bg-dark border border-1 border-dark rounded-circle death-btn d-flex align-items-center justify-content-center"
                  @click="// @ts-ignore
    editable.dead = !editable.dead" :title="editable.dead ? 'Bring them back!' : 'Mark your character as dead...'">
                  <i v-if="!editable.dead" class="mdi mdi-skull fs-1 skull text-light"></i>
                  <i v-if="editable.dead" class="mdi mdi-undo fs-1 holy-undo"></i>
                </div>
              </div>
              <div class="col-5 d-flex align-items-center justify-content-start">
                <select name="fatigue" id="fatigue" class="form-control w-25 me-4 fs-5 py-1">
                  <option selected value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="INC">INC</option>
                </select>
                <label for="fatigue" class="fs-4 fw-bold text-danger">FATIGUE</label>
              </div>
            </div>
          </div>
          <div class="row mt-4 ps-3">
            <div class="row">
              <div class="col-3 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  POWER
                </span>
              </div>
              <div class="col-2 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  PP
                </span>
              </div>
              <div class="col-2 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  RANGE
                </span>
              </div>
              <div class="col-2 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  DUR.
                </span>
              </div>
              <div class="col-3 ps-1">
                <span class="fs-4 fw-bold text-danger">
                  EFFECT
                </span>
              </div>
            </div>
            <div v-for="p in editable.powers" :key="p.id" class="row pe-0"
              :class="theme == 'light' ? 'border-dark' : 'border-light'">
              <div class="col-3 border-bottom ps-0">
                <span class="fs-small">
                  {{ p.name }}
                </span>
              </div>
              <div class="col-2 border-bottom ps-0">
                <span class="fs-small">
                  {{ p.powerPoints }}
                </span>
              </div>
              <div class="col-2 border-bottom ps-0">
                <span class="fs-small">
                  {{ p.range }}
                </span>
              </div>
              <div class="col-2 border-bottom ps-0">
                <span class="fs-small">
                  {{ p.duration }}
                </span>
              </div>
              <div class="col-3 selectable border-bottom px-1" :class="p.expanded ? '' : 'overflow-hidden ellipsis'"
                @click="p.expanded = !p.expanded">
                <span class="fs-small">
                  {{ p.description }}
                </span>
              </div>
            </div>
            <div class="row pe-0">
              <div class="col-12 mt-2 px-0">
                <div class="rounded selectable text-center border w-100" :class="theme == 'light' ? 'border-dark' : ''"
                  title="Add a new Power!" data-bs-toggle="modal" data-bs-target="#addPowerModal">
                  <i class="mdi mdi-plus-thick"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 ps-3">
            <div class="row">
              <div class="col-3 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  WEAPON
                </span>
              </div>
              <div class="col-2 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  RANGE
                </span>
              </div>
              <div class="col-1 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  DMG
                </span>
              </div>
              <div class="col-1 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  AP
                </span>
              </div>
              <div class="col-1 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  ROF
                </span>
              </div>
              <div class="col-1 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  WT
                </span>
              </div>
              <div class="col-3 ps-0">
                <span class="fs-4 fw-bold text-danger">
                  NOTES
                </span>
              </div>
            </div>
            <div v-for="w in editable.weapons" :key="w.id" class="row pe-0"
              :class="theme == 'light' ? 'border-dark' : 'border-light'">
              <div class="col-3 border-bottom px-1">
                <span class="fs-small">
                  {{ w.name }}
                </span>
              </div>
              <div class="col-2 border-bottom px-1">
                <span class="fs-small">
                  {{ w.range }}
                </span>
              </div>
              <div class="col-1 border-bottom px-1">
                <span class="fs-small">
                  {{ w.damage }}
                </span>
              </div>
              <div class="col-1 border-bottom px-1">
                <span class="fs-small">
                  {{ w.ap }}
                </span>
              </div>
              <div class="col-1 border-bottom px-1">
                <span class="fs-small">
                  {{ w.rof }}
                </span>
              </div>
              <div class="col-1 border-bottom px-1">
                <span class="fs-small">
                  {{ w.weight }}
                </span>
              </div>
              <div class="col-3 selectable border-bottom ps-0" :class="w.expanded ? '' : 'overflow-hidden ellipsis'"
                @click="w.expanded = !w.expanded">
                <span class="fs-small">
                  {{ w.notes }}
                </span>
              </div>
            </div>
            <div class="row pe-0">
              <div class="col-12 mt-2 px-0">
                <div class="rounded selectable text-center border w-100" :class="theme == 'light' ? 'border-dark' : ''"
                  title="Add a new weapon!" data-bs-toggle="modal" data-bs-target="#addWeaponModal">
                  <i class="mdi mdi-plus-thick"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <span class="fs-3 fw-bold text-danger">
                SECRET
              </span>
            </div>
            <div class="col-12">
              <textarea v-model="editable.secret" name="secret" id="secret" class="form-control px-2" rows="8"
                maxlength="5000"
                placeholder="Only you and the GMs of your character's party can see this..."></textarea>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row">
            <div class="col-12">
              <div v-if="character.picture"
                class="character-picture shadow d-flex align-items-end justify-content-end selectable p-1"
                :style="{ backgroundImage: `url(${character.picture})` }" data-bs-target="#characterPictureModal"
                data-bs-toggle="modal">
                <button type="button" v-if="theme == 'light'" class="btn btn-dark"
                  :class="character.creatorId == user.id ? 'edit-picture-btn btn-dark' : 'd-none'"
                  data-bs-toggle="modal" data-bs-target="#editCharacterPictureModal">
                  <i class="mdi mdi-pencil fs-5"></i>
                </button>
                <button type="button" v-if="theme !== 'light'" class="btn btn-light"
                  :class="character.creatorId == user.id ? 'edit-picture-btn btn-dark' : 'd-none'"
                  data-bs-toggle="modal" data-bs-target="#editCharacterPictureModal">
                  <i class="mdi mdi-pencil fs-5"></i>
                </button>
              </div>
              <div v-else class="d-flex align-items-center justify-content-center p-2 mt-2">
                <button type="button" class="btn" :class="theme == 'light' ? 'btn-dark' : 'btn-light'"
                  data-bs-toggle="modal" data-bs-target="#editCharacterPictureModal">
                  Upload a Picture! <i class="mdi mdi-panorama-variant-outline"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 text-center">
              <span class="fs-3 fw-bold text-danger">
                HINDRANCES
              </span>
            </div>
            <div v-for="(h, index) in editable.hindrances" :key="h" class="col-12">
              <div class="input-group border-bottom" :class="theme == 'light' ? 'border-dark' : 'border-light'">
                <div @click="h.expanded = !h.expanded" class="selectable w-90 px-1"
                  :class="h.expanded ? '' : 'overflow-hidden ellipsis'"
                  :title="h.expanded ? 'Minimize the description of this hindrance!' : 'Expand the description of this hindrance!'">
                  <span class="fs-small">
                    {{ h.name }} <span class="fs-small">- {{ h.description }}</span>
                  </span>
                </div>
                <div class="input-group-append selectable w-10 d-flex align-items-center justify-content-center"
                  @click="deleteHindrance(h.name, index)" :title="`Delete the '${h.name}' gear item.`">
                  <i class="mdi mdi-delete text-danger"></i>
                </div>
              </div>
            </div>
            <div class="col-12 mt-2">
              <div class="rounded selectable text-center border w-100" :class="theme == 'light' ? 'border-dark' : ''"
                title="Add a new Hindrance!" data-bs-toggle="modal" data-bs-target="#addHindranceModal">
                <i class="mdi mdi-plus-thick"></i>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 text-center">
              <span class="fs-3 fw-bold text-danger">
                EDGES & ADVANCES
              </span>
            </div>
            <div v-for="(e, index) in editable.edges" :key="e" class="col-12">
              <div class="input-group border-bottom" :class="theme == 'light' ? 'border-dark' : 'border-light'">
                <div @click="e.expanded = !e.expanded" class="selectable w-90 px-1"
                  :class="e.expanded ? '' : 'overflow-hidden ellipsis'"
                  :title="e.expanded ? 'Minimize the description of this edge!' : 'Expand the description of this edge!'">
                  <span class="fs-small">
                    {{ e.name }} <span class="fs-small">- {{ e.description }}</span>
                  </span>
                </div>
                <div class="input-group-append selectable w-10 d-flex align-items-center justify-content-center"
                  @click="deleteEdge(e.name, index)" :title="`Delete the '${e.name}' gear item.`">
                  <i class="mdi mdi-delete text-danger"></i>
                </div>
              </div>
            </div>
            <div class="col-12 mt-2">
              <div class="rounded selectable text-center border w-100" :class="theme == 'light' ? 'border-dark' : ''"
                title="Add a new Edge!" data-bs-toggle="modal" data-bs-target="#addEdgeModal">
                <i class="mdi mdi-plus-thick"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3 text-end">
        <div class="col-12">
          <button type="submit" class="btn submit-btn" :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  </div>
  <div v-else class="container-fluid p-3">
    <div class="row justify-content-center">
      <img src="https://udixydcfgbzwwnvpwubp.supabase.co/storage/v1/object/public/sandbox/God/Panda-Cowboy.png"
        class="w-25" />
    </div>
    <div class="row flex-column">
      <span class="text-center fs-3">
        🏗️ Under Construction 🚧
      </span>
      <span class="text-center fs-3">
        Check back in another time! - Ry :)
      </span>
    </div>
  </div>

  <!-- SECTION Add Skill Modal -->
  <Modal id="addSkillModal">
    <form @submit.prevent="addSkill" class="container-fluid">
      <div class="row">
        <div class="col-12 mb-2 d-flex justify-content-between">
          <span class="fs-4">
            Add a new skill!
          </span>
          <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-4"></i>
          </button>
        </div>
        <div class="col-4">
          <label for="die">Die Level</label>
          <select required v-model="skillEditable.die" name="die" id="die" class="form-control">
            <option selected value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="col-8">
          <label for="name">Skill Name</label>
          <input required v-model="skillEditable.name" name="name" id="name" type="text" maxlength="20"
            class="form-control">
        </div>
        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn" data-bs-dismiss="modal"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Add Skill
          </button>
        </div>
      </div>
    </form>
  </Modal>

  <!-- SECTION Enlarge Character Picture Modal -->
  <Modal id="characterPictureModal">
    <img :src="character?.picture" :alt="`${character.name}'s Picture Enlarged.`">
  </Modal>

  <!-- SECTION Edit Character Picture Modal -->
  <Modal id="editCharacterPictureModal">
    <form @submit.prevent="changeCharacterPicture" class="container-fluid">
      <div class="row">
        <div class="col-12 mb-2 d-flex justify-content-between">
          <span class="fs-4">
            Change Your Character's Picture!
          </span>
          <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-4"></i>
          </button>
        </div>
        <div class="col-12">
          <input type="file" id="picture" name="fileInput" class="form-control" required>
        </div>
        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn" data-bs-dismiss="modal"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Confirm New Picture
          </button>
        </div>
      </div>
    </form>
  </Modal>

  <!-- SECTION Add Hindrance Modal -->
  <Modal id="addHindranceModal">
    <form @submit.prevent="addHindrance" class="container-fluid">
      <div class="row">
        <div class="col-12 mb-2 d-flex justify-content-between">
          <span class="fs-4">
            Add a new hindrance!
          </span>
          <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-4"></i>
          </button>
        </div>
        <div class="col-6">
          <label for="name">Hindrance Name</label>
          <input type="text" required v-model="hindranceEditable.name" name="name" id="name" minlength="2"
            maxlength="60" class="form-control">
        </div>
        <div class="col-12 mt-2">
          <label for="description">Hindrance Description</label>
          <textarea v-model="hindranceEditable.description" name="description" id="description" rows="10"
            maxlength="2000" class="form-control"></textarea>
        </div>
        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn" data-bs-dismiss="modal"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Add Hindrance
          </button>
        </div>
      </div>
    </form>
  </Modal>

  <!-- SECTION Add Edge Modal -->
  <Modal id="addEdgeModal">
    <form @submit.prevent="addEdge" class="container-fluid">
      <div class="row">
        <div class="col-12 mb-2 d-flex justify-content-between">
          <span class="fs-4">
            Add a new edge!
          </span>
          <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-4"></i>
          </button>
        </div>
        <div class="col-6">
          <label for="name">Edge Name</label>
          <input type="text" required v-model="edgeEditable.name" name="name" id="name" minlength="2" maxlength="80"
            class="form-control">
        </div>
        <div class="col-6">
          <label for="rank">Edge Rank</label>
          <select v-model="edgeEditable.rank" name="rank" id="rank" class="form-control">
            <option selected value="None">None</option>
            <option value="Novice">Novice</option>
            <option value="Seasoned">Seasoned</option>
            <option value="Veteran">Veteran</option>
            <option value="Heroic">Heroic</option>
            <option value="Legendary">Legendary</option>
          </select>
        </div>
        <div class="col-12 mt-2">
          <label for="description">Edge Description</label>
          <textarea v-model="edgeEditable.description" name="description" id="description" rows="10" maxlength="3000"
            class="form-control"></textarea>
        </div>
        <div class="col-12 mt-2">
          <label for="additionalRequirements">Additional Requirements</label>
          <input v-model="edgeEditable.additionalRequirements" type="text" class="form-control">
        </div>
        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn" data-bs-dismiss="modal"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Add Edge
          </button>
        </div>
      </div>
    </form>
  </Modal>

  <!-- SECTION Add Power Modal -->
  <Modal id="addPowerModal">
    <form @submit.prevent="addPower" class="container-fluid">
      <div class="row">
        <div class="col-12 mb-2 d-flex justify-content-between">
          <span class="fs-4">
            Add a new power!
          </span>
          <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-4"></i>
          </button>
        </div>
        <div class="col-6">
          <label for="name">Power Name</label>
          <input v-model="powerEditable.name" type="text" name="name" id="name" required class="form-control">
        </div>
        <div class="col-6">
          <label for="rank">Power Rank</label>
          <select v-model="powerEditable.rank" name="rank" id="rank" class="form-control">
            <option selected value="None">None</option>
            <option value="Novice">Novice</option>
            <option value="Seasoned">Seasoned</option>
            <option value="Veteran">Veteran</option>
            <option value="Heroic">Heroic</option>
            <option value="Legendary">Legendary</option>
          </select>
        </div>
        <div class="col-4 mt-2">
          <label for="powerPoints">Power Points Req.</label>
          <input v-model="powerEditable.powerPoints" type="number" name="powerPoints" id="powerPoints"
            class="form-control">
        </div>
        <div class="col-4 mt-2">
          <label for="range">Power Range</label>
          <input v-model="powerEditable.range" type="text" name="range" id="range" class="form-control">
        </div>
        <div class="col-4 mt-2">
          <label for="duration">Power Duration</label>
          <input v-model="powerEditable.duration" type="text" name="duration" id="duration" required
            class="form-control">
        </div>
        <div class="col-12 mt-2">
          <label for="trappings">Power Trappings</label>
          <input v-model="powerEditable.trappings" type="text" name="trappings" id="trappings" class="form-control">
        </div>
        <div class="col-12 mt-2">
          <label for="description">Power Description</label>
          <textarea required v-model="powerEditable.description" name="description" id="description" rows="10"
            class="form-control" maxlength="1500"></textarea>
        </div>
        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn" data-bs-dismiss="modal"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Add Power
          </button>
        </div>
      </div>
    </form>
  </Modal>

  <!-- SECTION Add Weapon Modal -->
  <Modal id="addWeaponModal">
    <form @submit.prevent="addWeapon" class="container-fluid">
      <div class="row">
        <div class="col-12 mb-2 d-flex justify-content-between">
          <span class="fs-4">
            Add a new weapon!
          </span>
          <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-4"></i>
          </button>
        </div>
        <div class="col-12">
          <label for="name">Name</label>
          <input v-model="weaponEditable.name" type="text" for="name" class="form-control" required>
        </div>
        <div class="col-6 mt-2">
          <label for="range">Range</label>
          <input v-model="weaponEditable.range" type="text" for="range" class="form-control">
        </div>
        <div class="col-6 mt-2">
          <label for="damage">Damage</label>
          <input v-model="weaponEditable.damage" type="text" for="damage" class="form-control" required>
        </div>
        <div class="col-4 mt-2">
          <label for="ap">AP</label>
          <input v-model="weaponEditable.ap" type="number" for="ap" class="form-control">
        </div>
        <div class="col-4 mt-2">
          <label for="rof">ROF</label>
          <input v-model="weaponEditable.rof" type="number" for="rof" class="form-control">
        </div>
        <div class="col-4 mt-2">
          <label for="weight">WT</label>
          <input v-model="weaponEditable.weight" type="number" for="weight" class="form-control">
        </div>
        <div class="col-12 mt-2">
          <label for="notes">Notes</label>
          <textarea v-model="weaponEditable.notes" name="notes" id="notes" rows="10" class="form-control"></textarea>
        </div>
        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn" data-bs-dismiss="modal"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Add Weapon
          </button>
        </div>
      </div>
    </form>
  </Modal>
</template>


<script>
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { charactersService } from "../services/CharactersService.js";
import Pop from "../utils/Pop.js";
import Modal from "../components/Modal.vue";

export default {
  setup() {
    const editable = ref({});
    const skillEditable = ref({ die: 4 });
    const hindranceEditable = ref({});
    const edgeEditable = ref({});
    const powerEditable = ref({});
    const weaponEditable = ref({});
    const route = useRoute();

    // eslint-disable-next-line space-before-function-paren
    watchEffect(async () => {
      if (route.params.characterId) {
        await charactersService.getCharacterById(route.params.characterId)
      }
      if (AppState.character.id) {
        editable.value = { ...AppState.character }
      }
    })

    onMounted(() => {
      document.title = `${AppState.character.name}'s Sheet - EasilySwade'`
    })

    onUnmounted(() => {
      AppState.character = null;
    })

    return {
      editable,
      skillEditable,
      hindranceEditable,
      edgeEditable,
      powerEditable,
      weaponEditable,
      character: computed(() => AppState.character),
      user: computed(() => AppState.user),
      theme: computed(() => AppState.theme),
      async saveSheet() {
        try {
          const sheetData = editable.value
          await charactersService.updateCharacter(sheetData)
          Pop.success('Successfully saved the character sheet!')
        } catch (error) {
          Pop.error('Experienced an error attempting to save your Character Sheet! Oh no!', error.message)
        }
      },
      changeAgility(num) {
        try {
          // @ts-ignore
          editable.value.agility = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value! Oh no!', error.message)
        }
      },
      changeSmarts(num) {
        try {
          // @ts-ignore
          editable.value.smarts = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value! Oh no!', error.message)
        }
      },
      changeSpirit(num) {
        try {
          // @ts-ignore
          editable.value.spirit = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value! Oh no!', error.message)
        }
      },
      changeStrength(num) {
        try {
          // @ts-ignore
          editable.value.strength = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value! Oh no!', error.message)
        }
      },
      changeVigor(num) {
        try {
          // @ts-ignore
          editable.value.vigor = num;
        } catch (error) {
          Pop.error('Experienced an error attempting to set that attribute value! Oh no!', error.message)
        }
      },
      changeSkillDie(skillName, die) {
        try {
          // @ts-ignore
          let skill = editable.value.skills.find(s => s.name == skillName)
          skill.die = die
        } catch (error) {
          Pop.error('Experienced an error attempting to change the die level of that skill! Oh no!', error.message)
        }
      },
      addSkill() {
        try {
          const skillData = skillEditable.value
          // @ts-ignore
          if (editable.value.skills.some(s => s.name == skillData.name)) {
            skillEditable.value = { die: 4 }
            throw new Error('There is already a skill with that name on this sheet!')
          }
          // @ts-ignore
          editable.value.skills.push({ name: skillData.name, die: skillData.die })
          skillEditable.value = { die: 4 }
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteSkill(skillName, skillIndex) {
        try {
          if (await Pop.confirm(`Are you sure you wish to delete the ${skillName} skill?`)) {
            // @ts-ignore
            editable.value.skills.splice(skillIndex, 1)
          }
        } catch (error) {
          Pop.error('Experienced an error attempting to delete that skill! Oh no!', error.message)
        }
      },
      addGear() {
        try {
          // @ts-ignore
          let item = document.getElementById('gear').value
          if (item == '') {
            throw new Error('You must input the name of the Gear to add it!')
          }
          // @ts-ignore
          editable.value.gear.push(item)
          // @ts-ignore
          document.getElementById('gear').value = ''
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteGear(gearName, gearIndex) {
        try {
          if (await Pop.confirm(`Are you sure you wish to delete the ${gearName} piece of gear?`)) {
            // @ts-ignore
            editable.value.gear.splice(gearIndex, 1)
          }
        } catch (error) {
          Pop.error('Experienced an error attempting to delete this piece of gear! Oh no!', error.message)
        }
      },
      async changeCharacterPicture(e) {
        try {
          const picture = e.target.fileInput.files[0]
          if (!picture) {
            throw new Error('This form has no image uploaded into it!')
          }
          let newPictureURL = await charactersService.updateCharacterPicture(picture,);
          // @ts-ignore
          editable.value.picture = newPictureURL
        } catch (error) {
          Pop.error(error.message)
        }
      },
      addHindrance() {
        try {
          const hindranceData = hindranceEditable.value
          hindranceData.expanded = false
          // @ts-ignore
          editable.value.hindrances.push({ ...hindranceData })
          hindranceEditable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteHindrance(hindranceName, hindranceIndex) {
        try {
          if (await Pop.confirm(`Are you sure you wish to delete the ${hindranceName} hindrance?`)) {
            // @ts-ignore
            editable.value.hindrances.splice(hindranceIndex, 1)
          }
        } catch (error) {
          Pop.error('Experienced an error attempting to delete this hindrance! Oh no!', error.message)
        }
      },
      addEdge() {
        try {
          const edgeData = edgeEditable.value
          edgeData.expanded = false
          // @ts-ignore
          editable.value.edges.push({ ...edgeData })
          edgeEditable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteEdge(edgeName, edgeIndex) {
        try {
          if (await Pop.confirm(`Are you sure you wish to delete the ${edgeName} edge?`)) {
            // @ts-ignore
            editable.value.edges.splice(edgeIndex, 1)
          }
        } catch (error) {
          Pop.error('Experienced an error attempted to delete this edge! Oh no!', error.message)
        }
      },
      addPower() {
        try {
          const powerData = powerEditable.value
          powerData.expanded = false
          // @ts-ignore
          editable.value.powers.push({ ...powerData })
          powerEditable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      addWeapon() {
        try {
          const weaponData = weaponEditable.value
          weaponData.expanded = false
          // @ts-ignore
          editable.value.weapons.push({ ...weaponData })
          weaponEditable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      restorePowerPoints() {
        try {
          editable.value.currentPowerPoints += 5
          if (editable.value.currentPowerPoints > editable.value.maxPowerPoints) {
            editable.value.currentPowerPoints = editable.value.maxPowerPoints
          }
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  },

  components: { Modal }
}
</script>


<style lang="scss" scoped>
* {
  font-family: 'Times New Roman', Times, serif;
}

.character-picture {
  height: 35vh;
  width: 100%;
  border-radius: 6px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  user-select: none;
}

.attribute-number {
  height: 27px;
  width: 27px;
}

.attribute-input {
  border: none;
  background-color: inherit;
  cursor: default;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.fs-small {
  font-size: small;
}

.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;

}

.nowrap {
  white-space: nowrap
}

.skill-line:hover .delete-skill {
  display: block !important;
}

.skill-line:hover .ellipsis {
  overflow: hidden;
}

form {
  overflow: auto;
}

form::-webkit-scrollbar {
  background-color: #505050;
  border-radius: 8px;
  width: 10px;
}

form::-webkit-scrollbar-track {
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.452);
}

form::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(75, 74, 74, 0.452);
}

#gear {
  border-radius: 0;
  outline: none;
}

.flex-grow {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}

.edit-picture-btn {
  display: none;
}

.character-picture:hover {
  .edit-picture-btn {
    display: block
  }
}

.form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.submit-btn {
  transition: 1s;
}

.submit-btn:active {
  transform: scale(0.9);
}

textarea {
  resize: none;
}

textarea::-webkit-scrollbar {
  background-color: #505050;
  border-radius: 8px;
  width: 10px;
}

textarea::-webkit-scrollbar-track {
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.452);
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(75, 74, 74, 0.452);
}

.death-btn {
  height: 75px;
  width: 75px;
  max-width: 100%;
  transition: 0.4s;
}

.skull {
  transition: 2s;
}

.holy-undo {
  transition: 2s;
}

.death-btn:hover {
  transform: scale(1.1);
  cursor: pointer;

  .skull {
    color: #971515 !important;
  }

  .holy-undo {
    text-shadow: 0px 0px 8px white;
  }
}

.death-btn:active {
  transform: scale(0.95)
}

.grayscale {
  filter: grayscale(1);
}

.bloody {
  background-image: url('https://udixydcfgbzwwnvpwubp.supabase.co/storage/v1/object/public/sandbox/God/blood-splatter.png');
  background-size: cover;
  background-position: center;
}

input:valid {
  outline: none;
}

select:valid {
  outline: none;
}

textarea:valid {
  outline: none;
}

.w-90 {
  width: 90%;
}

.w-10 {
  width: 10%;
}

.save-btn {
  position: absolute;
}
</style>