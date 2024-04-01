export class Party {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.dungeonMasterIds = data.dungeonMasterIds
    this.characterIds = data.characterIds
    this.name = data.name
    this.description = data.description
  }
}