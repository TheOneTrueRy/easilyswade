import { diceService } from '../services/DiceService'
import { SocketHandler } from '../utils/SocketHandler'

export class DiceHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    // NOTE rolling needs a logged in user, the roll is checked against their characters
    super(io, socket, true)
    this
      .on('ROLL_DICE', this.onRollDice)
  }

  async onRollDice(rollData) {
    try {
      const { roll, recipientIds } = await diceService.rollDice(rollData, this.user.id)
      // NOTE every user joins a room named after their account id when they authenticate
      this.io.to(recipientIds).emit('DICE_ROLLED', roll)
    } catch (error) {
      // NOTE async errors skip the try catch in SocketHandler.on so they are sent back here
      this.socket.emit('error', { message: error.message })
    }
  }
}
