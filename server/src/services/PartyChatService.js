import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden, NotFound } from "../utils/Errors.js";

const MAX_TEXT_LENGTH = 500
// NOTE how many of the party's most recent messages (chat and rolls) are sent when someone joins
const LOG_SIZE = 100

class PartyChatService {
  /**
   * The socket room everyone in a party's chat is in.
   */
  roomName(partyId) {
    return `party:${partyId}`
  }

  /**
   * Finds one of the requestor's own characters.
   */
  async getOwnCharacter(characterId, requestorId) {
    const character = await dbContext.Character.findById(characterId)
    if (!character) {
      throw new NotFound('Unable to find that character!')
    }
    if (String(character.creatorId) != String(requestorId)) {
      throw new Forbidden("Hey! That's not your character!")
    }
    return character
  }

  /**
   * Finds the party a character is in, the character can point at its party with partyId or the party can list the character in characterIds.
   * @returns {Promise<any>} The party, or null if the character isn't in one.
   */
  async findParty(character) {
    if (character.partyId) {
      const party = await dbContext.Party.findById(character.partyId)
      if (party) {
        return party
      }
    }
    return await dbContext.Party.findOne({ characterIds: character._id })
  }

  /**
   * @returns {Promise<{ partyId: string, partyName: string, messages: any[] }>} The party and its recent messages, oldest first. The partyId is null if the character isn't in a party.
   */
  async joinParty(characterId, requestorId) {
    const character = await this.getOwnCharacter(characterId, requestorId)
    const party = await this.findParty(character)
    if (!party) {
      return { partyId: null, partyName: '', messages: [] }
    }
    const messages = await dbContext.PartyMessage.find({ partyId: party._id }).sort({ createdAt: -1 }).limit(LOG_SIZE)
    return { partyId: String(party._id), partyName: party.name, messages: messages.reverse() }
  }

  /**
   * @param {string} joinedPartyId The party the sending socket is in the chat of.
   */
  async sendMessage(characterId, text, requestorId, joinedPartyId) {
    const character = await this.getOwnCharacter(characterId, requestorId)
    const party = await this.findParty(character)
    if (!party) {
      throw new BadRequest("This character isn't in a party!")
    }
    if (String(party._id) != String(joinedPartyId)) {
      throw new Forbidden("Join your party's chat before sending messages!")
    }
    const trimmedText = String(text ?? '').trim()
    if (!trimmedText) {
      throw new BadRequest('Write something to send!')
    }
    if (trimmedText.length > MAX_TEXT_LENGTH) {
      throw new BadRequest(`Messages can only be ${MAX_TEXT_LENGTH} characters long!`)
    }
    return await this.createMessage(character, party, { type: 'chat', text: trimmedText })
  }

  /**
   * Adds a roll to its party's log. A character without a party has no log, so its roll is just handed back.
   */
  async recordRoll(character, roll) {
    const party = await this.findParty(character)
    if (!party) {
      return {
        id: roll.id,
        partyId: null,
        creatorId: roll.creatorId,
        characterId: roll.characterId,
        characterName: roll.characterName,
        characterPicture: roll.characterPicture,
        type: 'roll',
        roll,
        createdAt: roll.rolledAt
      }
    }
    return await this.createMessage(character, party, { type: 'roll', roll })
  }

  async createMessage(character, party, messageData) {
    return await dbContext.PartyMessage.create({
      partyId: party._id,
      creatorId: character.creatorId,
      characterId: character._id,
      characterName: character.name,
      characterPicture: character.thumbnail || character.picture || '',
      ...messageData
    })
  }
}

export const partyChatService = new PartyChatService();
