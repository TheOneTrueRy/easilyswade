export class PartyInvite {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.receiverId = data.receiverId
    this.partyId = data.partyId
    this.party = data.party
    this.characterId = data.characterId
    this.character = data.character
    this.seen = data.seen
  }
}