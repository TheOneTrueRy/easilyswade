export class Art {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.characterId = data.characterId
    this.character = data.character
    this.partyId = data.partyId
    this.party = data.party
    this.title = data.title
    this.description = data.description
    this.imgUrl = data.imgUrl
  }
}