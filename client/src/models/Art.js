export class Art {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.title = data.title
    this.description = data.description
    this.imgUrl = data.imgUrl
  }
}