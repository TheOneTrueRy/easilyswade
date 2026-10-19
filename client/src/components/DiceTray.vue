<template>
  <!-- SECTION Roll Button, starts a roll -->
  <button v-if="!tray.open" type="button" class="dice-fab btn btn-danger shadow" title="Start a dice roll!"
    @click="openTray">
    <i class="mdi mdi-dice-d20 fs-2"></i>
  </button>

  <!-- SECTION Dice Tray, the roll being built. Tap traits on the sheet or dice below to fill it -->
  <div v-else ref="trayElement" class="dice-tray shadow">
    <div class="d-flex align-items-center justify-content-between">
      <span class="tray-label fs-5">
        <i class="mdi mdi-dice-d20"></i> Roll Dice
      </span>
      <div>
        <button type="button" class="icon-btn" :title="collapsed ? 'Show the dice list.' : 'Hide the dice list.'"
          @click="collapsed = !collapsed">
          <i class="mdi" :class="collapsed ? 'mdi-chevron-up' : 'mdi-chevron-down'"></i>
        </button>
        <button type="button" class="icon-btn" title="Close the dice tray." @click="closeTray">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
    </div>

    <!-- Result of the last roll -->
    <div v-if="lastRoll" class="result-box mt-1">
      <div class="d-flex align-items-baseline justify-content-between">
        <span class="fs-small">{{ lastRoll.description }}</span>
        <span class="result-total">{{ lastRoll.total }}</span>
      </div>
      <div v-for="(d, index) in lastRoll.dice" :key="index" class="fs-small">
        {{ dieName(d) }}: {{ d.rolls.join(' + ') }}<span v-if="d.bonus"> {{ d.bonus > 0 ? '+' : '-' }} {{
          Math.abs(d.bonus) }}</span> = <b>{{ d.total }}</b>
      </div>
      <div class="fs-small">
        <span v-if="lastRoll.dice.length > 1">Highest: <b>{{ lastRoll.highest }}</b></span>
        <span v-if="lastRoll.modifier"> &bull; Modifier: <b>{{ lastRoll.modifier > 0 ? '+' : '' }}{{ lastRoll.modifier
        }}</b></span>
      </div>
    </div>

    <!-- The pool -->
    <div class="d-flex flex-wrap gap-1 mt-2 pool">
      <span v-if="!tray.pool.length" class="fs-small opacity-75">
        Tap a trait or weapon on your sheet, or pick a die below.
      </span>
      <span v-for="d in tray.pool" :key="d.key" class="pool-die">
        {{ dieName(d) }}<span v-if="d.bonus">{{ d.bonus > 0 ? '+' : '-' }}{{ Math.abs(d.bonus) }}</span>
        <button type="button" class="pool-remove" :title="`Take the ${d.label} die out of the roll.`"
          @click="removeFromPool(d.key)">
          <i class="mdi mdi-close"></i>
        </button>
      </span>
    </div>

    <div v-if="!collapsed">
      <!-- Plain dice -->
      <div class="d-flex gap-1 mt-2">
        <button v-for="sides in diceSides" :key="sides" type="button" class="die-btn" :title="`Add a d${sides}.`"
          @click="addDie(sides)">
          d{{ sides }}
        </button>
      </div>

      <!-- Modifier + Ace -->
      <div class="d-flex align-items-center justify-content-between mt-2">
        <div class="d-flex align-items-center gap-1">
          <span class="fs-small me-1">Modifier</span>
          <button type="button" class="step-btn" aria-label="Lower the modifier" @click="changeModifier(-1)">
            <i class="mdi mdi-minus"></i>
          </button>
          <span class="modifier-value">{{ tray.modifier > 0 ? '+' : '' }}{{ tray.modifier }}</span>
          <button type="button" class="step-btn" aria-label="Raise the modifier" @click="changeModifier(1)">
            <i class="mdi mdi-plus"></i>
          </button>
        </div>
        <div class="form-check form-switch m-0"
          title="Dice up to a d12 that roll their highest number are rolled again and added on.">
          <input class="form-check-input" type="checkbox" role="switch" id="diceAce" :checked="tray.ace"
            @change="toggleAce">
          <label class="form-check-label fs-small" for="diceAce">Ace</label>
        </div>
      </div>

    </div>

    <div class="d-flex gap-2 mt-2">
      <button type="button" class="btn btn-outline-secondary" :disabled="!tray.pool.length && !tray.modifier"
        @click="clearPool">
        Clear
      </button>
      <button type="button" class="btn btn-danger flex-grow-1" :disabled="!tray.pool.length || tray.rolling"
        @click="roll">
        <span v-if="tray.rolling" class="spinner-border spinner-border-sm" role="status"></span>
        <span v-else><i class="mdi mdi-dice-multiple"></i></span>
        Roll
      </button>
    </div>
  </div>
</template>


<script>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { AppState } from "../AppState.js";
import { dieName } from "../models/DiceRoll.js";
import { diceService, DICE_SIDES } from "../services/DiceService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    characterId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const trayElement = ref(null)
    const collapsed = ref(false)

    // NOTE the mobile sheet's menu button and bottom padding make room for the tray with this css variable
    function setTrayHeight(height) {
      document.documentElement.style.setProperty('--dice-tray-height', `${height}px`)
    }
    let observer = null
    watch(trayElement, (element) => {
      observer?.disconnect()
      if (!element) {
        return setTrayHeight(0)
      }
      observer = new ResizeObserver(() => setTrayHeight(element.offsetHeight))
      observer.observe(element)
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
      setTrayHeight(0)
    })

    return {
      trayElement,
      collapsed,
      diceSides: DICE_SIDES,
      dieName,
      tray: computed(() => AppState.diceTray),
      lastRoll: computed(() => AppState.lastRoll),
      openTray() {
        diceService.openTray()
      },
      closeTray() {
        diceService.closeTray()
      },
      addDie(sides) {
        try {
          diceService.addToPool(`d${sides}`, sides)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      removeFromPool(key) {
        diceService.removeFromPool(key)
      },
      clearPool() {
        diceService.clearPool()
      },
      changeModifier(amount) {
        diceService.changeModifier(amount)
      },
      toggleAce() {
        diceService.toggleAce()
      },
      roll() {
        try {
          diceService.rollPool(props.characterId)
          // NOTE the result arrives from the server, if it doesn't the roll button would stay stuck
          setTimeout(() => {
            if (AppState.diceTray.rolling) {
              AppState.diceTray.rolling = false
              Pop.error('The roll never came back, check your connection and try again!')
            }
          }, 8000)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
* {
  font-family: 'Times New Roman', Times, serif;
}

.dice-fab {
  align-items: center;
  border-radius: 50%;
  bottom: 16px;
  display: flex;
  // NOTE same layer as the mobile sheet's menu button, under offcanvases and modals
  z-index: 1030;
  height: 56px;
  justify-content: center;
  left: 16px;
  padding: 0;
  position: fixed;
  width: 56px;
}

.dice-tray {
  --tray-accent: var(--bs-danger);
  background-color: var(--bs-body-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 12px;
  bottom: 16px;
  max-height: 70vh;
  overflow-y: auto;
  left: 16px;
  padding: 0.75rem;
  position: fixed;
  width: 360px;
  z-index: 1030;
}

[data-bs-theme="dark"] .dice-tray {
  --tray-accent: #ff5c5c;
}

.tray-label {
  color: var(--tray-accent);
  font-weight: bold;
}

.fs-small {
  font-size: small;
}

.icon-btn {
  background-color: transparent;
  border: 0;
  color: inherit;
  font-size: 1.35rem;
  height: 40px;
  width: 40px;
}

.result-box {
  background-color: var(--bs-tertiary-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;

  .result-total {
    color: var(--tray-accent);
    font-size: 2.25rem;
    font-weight: bold;
    line-height: 1;
  }
}

.pool-die {
  align-items: center;
  border: 1px solid var(--tray-accent);
  border-radius: 6px;
  display: inline-flex;
  font-size: small;
  padding: 0.1rem 0.25rem 0.1rem 0.5rem;

  .pool-remove {
    background-color: transparent;
    border: 0;
    color: inherit;
    height: 28px;
    width: 28px;
  }
}

.die-btn {
  background-color: transparent;
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  color: inherit;
  flex: 1 1 0;
  height: 44px;
  min-width: 0;

  &:active {
    background-color: var(--bs-danger);
    border-color: var(--bs-danger);
    color: #fff;
  }
}

.step-btn {
  background-color: transparent;
  border: 1px solid var(--bs-border-color);
  border-radius: 50%;
  color: inherit;
  height: 36px;
  width: 36px;
}

.modifier-value {
  font-weight: bold;
  min-width: 2.5ch;
  text-align: center;
}

// NOTE phones + tablets give the tray the full width of the bottom of the screen
@media screen and (max-width: 991.98px) {
  .dice-tray {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
  }
}
</style>
