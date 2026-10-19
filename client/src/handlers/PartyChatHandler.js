import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { AppState } from "../AppState.js";
import { dieName } from "../models/DiceRoll.js";
import { PartyMessage } from "../models/PartyMessage.js";
import { SocketHandler } from "../utils/SocketHandler.js";

// NOTE how many messages are kept in the chat at once
const MAX_MESSAGES = 200

class PartyChatHandler extends SocketHandler {

  constructor() {
    super(true)
    this
      .on('PARTY_JOINED', this.onPartyJoined)
      .on('PARTY_MESSAGE', this.onPartyMessage)
      .on('authenticated', this.onReauthenticated)
  }

  /**
   * Asks the server to put this tab in the chat of the character's party, it only hears about the party while it's in there.
   */
  joinParty(characterId) {
    this.emit('JOIN_PARTY', { characterId })
  }

  leaveParty() {
    this.emit('LEAVE_PARTY')
  }

  sendMessage(characterId, text) {
    this.emit('SEND_PARTY_MESSAGE', { characterId, text })
  }

  onPartyJoined(party) {
    const chat = AppState.partyChat
    // NOTE ignores a join that finishes after the sheet was already left
    if (!chat.characterId) { return }
    // NOTE the server found no party for this character
    chat.noParty = !party.partyId
    chat.joined = !chat.noParty
    chat.partyId = party.partyId
    chat.partyName = party.partyName
    chat.messages = party.messages.map(m => new PartyMessage(m))
    chat.unread = 0
  }

  onPartyMessage(messageData) {
    const message = new PartyMessage(messageData)
    const chat = AppState.partyChat
    // NOTE a roll from a character without a party is only sent to the roller
    const isSolo = !message.partyId
    if (!isSolo && message.partyId != chat.partyId) { return }
    const isMine = isSolo || message.characterId == AppState.character?.id
    if (message.roll && isMine) {
      AppState.lastRoll = message.roll
      AppState.diceTray.rolling = false
    }
    if (!isSolo) {
      chat.messages.push(message)
      chat.messages.splice(0, Math.max(0, chat.messages.length - MAX_MESSAGES))
      if (!isMine && !chat.open) { chat.unread++ }
    }
    // NOTE the roller sees their own result in the tray, and everyone sees it in the chat when it's open
    const alreadySeen = chat.open || (isMine && AppState.diceTray.open)
    if (message.roll && !alreadySeen) {
      this.toastRoll(message.roll)
    }
  }

  // NOTE if the connection was remade the server has forgotten which party we were in
  onReauthenticated() {
    const chat = AppState.partyChat
    if (chat.characterId && chat.joined) {
      this.joinParty(chat.characterId)
    }
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

export const partyChatHandler = new PartyChatHandler()
