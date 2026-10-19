import { diceService } from '../services/DiceService'
import { partyChatService } from '../services/PartyChatService'
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
      const { roll, character } = await diceService.rollDice(rollData, this.user.id)
      const message = await partyChatService.recordRoll(character, roll)
      // NOTE the party hears about the roll through its room, which only the sockets on a party member's sheet are in
      if (message.partyId && this.socket.data.partyId == String(message.partyId)) {
        this.io.to(partyChatService.roomName(message.partyId)).emit('PARTY_MESSAGE', message)
      } else {
        this.socket.emit('PARTY_MESSAGE', message)
      }
    } catch (error) {
      // NOTE async errors skip the try catch in SocketHandler.on so they are sent back here
      this.socket.emit('error', { message: error.message })
    }
  }
}
