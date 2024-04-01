export class Party {
  constructor(data) {
    this.Id = data.Id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.dungeonMasterIds = data.dungeonMasterIds
    this.characterIds = data.characterIds
    this.name = data.name
    this.description = data.description
  }
}