export class Story {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.characterId = data.characterId
    this.partyId = data.partyId
    this.title = data.title
    this.description = data.description
    this.tags = data.tags
  }
}