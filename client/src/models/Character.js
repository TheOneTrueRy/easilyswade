export class Character {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.name = data.name || ''
    this.race = data.race || ''
    this.age = data.age || 0
    this.height = data.height || ''
    this.weight = data.weight || 0
    this.bennies = data.bennies || 0
    this.conviction = data.conviction || false
    this.pace = data.pace || 0
    this.parry = data.parry || 0
    this.toughness = data.toughness || 0
    this.agility = data.agility || 4
    this.smarts = data.smarts || 4
    this.spirit = data.spirit || 4
    this.strength = data.strength || 4
    this.vigor = data.vigor || 4
    this.fatigue = data.fatigue || 0
    this.wounds = data.wounds || 0
    this.picture = data.picture || ''
    this.secret = data.secret || ''
    this.rank = data.rank || 'Novice'
    this.maxPowerPoints = data.maxPowerPoints || 0
    this.currentPowerPoints = data.currentPowerPoints || 0
    this.hindrances = data.hindrances || []
    this.edges = data.edges || []
    this.gear = data.gear || []
    this.weapons = data.weapons || []
    this.powers = data.powers || []
    this.skills = data.skills || []
    this.deactivated = data.deactivated || false
    this.dead = data.dead || false
    this.playerCharacter = data.playerCharacter || true
    this.sheetStyle = data.sheetStyle || 'Default'
  }
}