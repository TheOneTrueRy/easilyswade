import { AppState } from "../AppState.js";
import { SocketHandler } from "../utils/SocketHandler.js";

class DiceHandler extends SocketHandler {

  constructor() {
    super(true)
    this
      .on('error', this.onError)
  }

  /**
   * Asks the server to roll the dice, the result comes back to the party through the PartyChatHandler.
   * @param {{ characterId: string, dice: { label: string, sides: number, bonus: number }[], modifier: number, ace: boolean }} rollData
   */
  rollDice(rollData) {
    this.emit('ROLL_DICE', rollData)
  }

  onError() {
    AppState.diceTray.rolling = false
  }
}

export const diceHandler = new DiceHandler()
