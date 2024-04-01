export class Story {
  constructor(data) {
    this.Id = data.Id
    this.creatorId = data.creatorId
    this.characterId = data.characterId
    this.partyId = data.partyId
    this.title = data.title
    this.description = data.description
    this.tags = data.tags
  }
}