export class Profile {
  constructor(data) {
    this.id = data._id
    this.name = data.name
    this.picture = data.picture
    this.description = data.description
  }
}