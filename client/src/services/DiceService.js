import { AppState } from "../AppState.js";
import { diceHandler } from "../handlers/DiceHandler.js";

export const DICE_SIDES = [4, 6, 8, 10, 12, 20, 100]
const MAX_DICE = 12
let nextPoolKey = 0

class DiceService {
  openTray() {
    AppState.diceTray.open = true
  }

  closeTray() {
    AppState.diceTray.open = false
    AppState.lastRoll = null
  }

  /**
   * Closes the tray and forgets the roll being built, for when leaving the sheet.
   */
  reset() {
    AppState.diceTray = { open: false, pool: [], modifier: 0, ace: false, rolling: false }
    AppState.lastRoll = null
  }

  /**
   * Adds a die to the roll being built.
   * @param {string} label What the die is for, like 'Agility', or 'd20' for a plain die.
   * @param {number} sides
   * @param {number} bonus Added to just this die, like the +2 on a d12+2.
   */
  addToPool(label, sides, bonus = 0) {
    const tray = AppState.diceTray
    if (!DICE_SIDES.includes(Number(sides))) {
      throw new Error(`A d${sides} isn't a die you can roll!`)
    }
    if (tray.pool.length >= MAX_DICE) {
      throw new Error(`You can only roll ${MAX_DICE} dice at a time!`)
    }
    tray.pool.push({ key: nextPoolKey++, label, sides: Number(sides), bonus: Number(bonus) || 0 })
    AppState.lastRoll = null
  }

  /**
   * Adds the dice of a weapon's damage, like 'Str+d8', '2d6+1' or 'd10'.
   * Everything is read before anything is added so a damage that can't be read adds nothing.
   * @param {string} label The weapon's name.
   * @param {string} damage
   * @param {{ sides: number, bonus: number }} strength The character's Strength die, for damage that starts with Str.
   */
  addDamage(label, damage, strength) {
    const tray = AppState.diceTray
    const tokens = String(damage).replace(/\s/g, '').split(/(?=[+-])/).filter(t => t)
    const dice = []
    let modifier = 0
    for (const token of tokens) {
      const term = token.replace(/^\+/, '')
      const diceTerm = term.match(/^(\d*)d(\d+)$/i)
      if (/^str$/i.test(term)) {
        dice.push({ label: `${label} (Strength)`, sides: strength.sides, bonus: strength.bonus })
      } else if (diceTerm) {
        const count = Number(diceTerm[1] || 1)
        for (let i = 0; i < count; i++) {
          dice.push({ label, sides: Number(diceTerm[2]), bonus: 0 })
        }
      } else if (/^[+-]?\d+$/.test(term)) {
        modifier += Number(term)
      } else {
        throw new Error(`Unable to read the damage "${damage}" to roll it, add its dice from the list instead!`)
      }
    }
    if (tray.pool.length + dice.length > MAX_DICE) {
      throw new Error(`You can only roll ${MAX_DICE} dice at a time!`)
    }
    dice.forEach(d => this.addToPool(d.label, d.sides, d.bonus))
    this.changeModifier(modifier)
  }

  removeFromPool(key) {
    const tray = AppState.diceTray
    tray.pool = tray.pool.filter(d => d.key != key)
    AppState.lastRoll = null
  }

  clearPool() {
    const tray = AppState.diceTray
    tray.pool = []
    tray.modifier = 0
    AppState.lastRoll = null
  }

  changeModifier(amount) {
    const tray = AppState.diceTray
    tray.modifier = Math.min(99, Math.max(-99, tray.modifier + amount))
    AppState.lastRoll = null
  }

  toggleAce() {
    AppState.diceTray.ace = !AppState.diceTray.ace
    AppState.lastRoll = null
  }

  /**
   * Sends the roll being built to the server, the result is heard back through the DiceHandler.
   * @param {string} characterId The character that is rolling.
   */
  rollPool(characterId) {
    const tray = AppState.diceTray
    if (!tray.pool.length) {
      throw new Error('Pick at least one die to roll!')
    }
    tray.rolling = true
    diceHandler.rollDice({
      characterId,
      dice: tray.pool.map(d => ({ label: d.label, sides: d.sides, bonus: d.bonus })),
      modifier: tray.modifier,
      ace: tray.ace
    })
  }
}

export const diceService = new DiceService();
