export class Character {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.name = data.name
    this.race = data.race
    this.age = data.age
    this.height = data.height
    this.weight = data.weight
    this.bennies = data.bennies
    this.pace = data.pace
    this.parry = data.parry
    this.toughness = data.toughness
    this.agility = data.agility
    this.smarts = data.smarts
    this.spirit = data.spirit
    this.strength = data.strength
    this.vigor = data.vigor
    this.fatigue = data.fatigue
    this.wounds = data.wounds
    this.picture = data.picture
    this.secret = data.secret
    this.rank = data.rank
    this.powerPoints = data.powerPoints
    this.hindrances = data.hindrances
    this.edges = data.edges
    this.gear = data.gear
    this.weapons = data.weapons
    this.powers = data.powers
    this.skills = data.skills
    this.deactivated = data.deactivated
    this.sheetStyle = data.sheetStyle
  }
}