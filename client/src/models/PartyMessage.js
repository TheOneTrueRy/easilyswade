import { DiceRoll } from "./DiceRoll.js"

export class PartyMessage {
  constructor(data) {
    this.id = data.id || data._id
    this.partyId = data.partyId
    this.creatorId = data.creatorId
    this.characterId = data.characterId
    this.characterName = data.characterName || ''
    this.characterPicture = data.characterPicture || ''
    this.type = data.type
    this.text = data.text || ''
    this.roll = data.roll ? new DiceRoll(data.roll) : null
    this.createdAt = new Date(data.createdAt)
  }
}
