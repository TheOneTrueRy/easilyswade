export class Party {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.dungeonMasterIds = data.dungeonMasterIds
    this.dungeonMasters = data.dungeonMasters
    this.characterIds = data.characterIds
    this.characters = data.characters
    this.name = data.name
    this.description = data.description
  }
}