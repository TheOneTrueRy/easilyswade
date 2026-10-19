import { AppState } from "../AppState.js";
import { partyChatHandler } from "../handlers/PartyChatHandler.js";

class PartyChatService {
  /**
   * Joins the chat of the character's party, for as long as their sheet is being viewed.
   */
  joinParty(characterId) {
    AppState.partyChat = { characterId, partyId: null, partyName: '', messages: [], unread: 0, open: false, joined: false }
    partyChatHandler.joinParty(characterId)
  }

  leaveParty() {
    AppState.partyChat = { characterId: null, partyId: null, partyName: '', messages: [], unread: 0, open: false, joined: false }
    partyChatHandler.leaveParty()
  }

  sendMessage(text) {
    const chat = AppState.partyChat
    if (!chat.joined) {
      throw new Error("You haven't connected to your party's chat yet!")
    }
    partyChatHandler.sendMessage(chat.characterId, text)
  }

  setOpen(open) {
    AppState.partyChat.open = open
    if (open) {
      AppState.partyChat.unread = 0
    }
  }
}

export const partyChatService = new PartyChatService();
