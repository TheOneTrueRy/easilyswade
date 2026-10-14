import { partyChatService } from '../services/PartyChatService'
import { SocketHandler } from '../utils/SocketHandler'

export class PartyChatHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket, true)
    // NOTE counts every join and leave, a join that finishes after a newer join or leave was asked for is dropped
    this.latestRequest = 0
    this
      .on('JOIN_PARTY', this.onJoinParty)
      .on('LEAVE_PARTY', this.onLeaveParty)
      .on('SEND_PARTY_MESSAGE', this.onSendPartyMessage)
  }

  async onJoinParty(payload) {
    try {
      const request = ++this.latestRequest
      const party = await partyChatService.joinParty(payload?.characterId, this.user.id)
      if (request != this.latestRequest) { return }
      this.leaveCurrentParty()
      // NOTE the room is what makes someone hear the party's rolls and messages, it's only joined while on a party member's sheet
      this.socket.join(partyChatService.roomName(party.partyId))
      this.socket.data.partyId = party.partyId
      this.socket.emit('PARTY_JOINED', party)
    } catch (error) {
      this.socket.emit('error', { message: error.message })
    }
  }

  onLeaveParty() {
    this.latestRequest++
    this.leaveCurrentParty()
  }

  async onSendPartyMessage(payload) {
    try {
      const message = await partyChatService.sendMessage(payload?.characterId, payload?.text, this.user.id, this.socket.data.partyId)
      this.io.to(partyChatService.roomName(message.partyId)).emit('PARTY_MESSAGE', message)
    } catch (error) {
      this.socket.emit('error', { message: error.message })
    }
  }

  leaveCurrentParty() {
    const partyId = this.socket.data.partyId
    if (partyId) {
      this.socket.leave(partyChatService.roomName(partyId))
      this.socket.data.partyId = null
    }
  }
}
