import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { AppState } from "../AppState.js";
import { DiceRoll, dieName } from "../models/DiceRoll.js";
import { SocketHandler } from "../utils/SocketHandler.js";

// NOTE how many rolls are remembered
const MAX_ROLLS = 30

class DiceHandler extends SocketHandler {

  constructor() {
    super(true)
    this
      .on('DICE_ROLLED', this.onDiceRolled)
      .on('error', this.onError)
  }

  /**
   * Asks the server to roll the dice, the result comes back to everyone in the party through DICE_ROLLED.
   * @param {{ characterId: string, dice: { label: string, sides: number, bonus: number }[], modifier: number, ace: boolean }} rollData
   */
  rollDice(rollData) {
    this.emit('ROLL_DICE', rollData)
  }

  onDiceRolled(rollData) {
    const roll = new DiceRoll(rollData)
    AppState.rolls.unshift(roll)
    AppState.rolls.splice(MAX_ROLLS)
    if (roll.creatorId == AppState.user.id) {
      AppState.lastRoll = roll
      AppState.diceTray.rolling = false
      // NOTE the tray shows our own result, only tell us about it if the tray is closed
      if (AppState.diceTray.open) { return }
    }
    this.toastRoll(roll)
  }

  onError() {
    AppState.diceTray.rolling = false
  }

  toastRoll(roll) {
    // NOTE built with textContent instead of html strings because character names are typed in by users
    const content = document.createElement('div')
    content.className = 'text-start'
    const title = document.createElement('div')
    title.className = 'fw-bold'
    title.textContent = `${roll.characterName} rolled ${roll.description}`
    content.appendChild(title)
    roll.dice.forEach(d => {
      const line = document.createElement('div')
      const bonus = d.bonus ? ` ${d.bonus > 0 ? '+' : '-'} ${Math.abs(d.bonus)}` : ''
      line.textContent = `${dieName(d)}: ${d.rolls.join(' + ')}${bonus} = ${d.total}`
      content.appendChild(line)
    })
    const total = document.createElement('div')
    total.className = 'fw-bold fs-5'
    total.textContent = `Total: ${roll.total}${roll.modifier ? ` (${roll.modifier > 0 ? '+' : '-'}${Math.abs(roll.modifier)} modifier)` : ''}`
    content.appendChild(total)
    Swal.fire({
      toast: true,
      position: 'top-end',
      html: content,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 8000,
      timerProgressBar: true
    })
  }
}

export const diceHandler = new DiceHandler()
