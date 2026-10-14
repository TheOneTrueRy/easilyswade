/**
 * What a die is called, plain dice are just 'd20' and dice from the sheet are 'Agility d8'.
 */
export function dieName(die) {
  return die.label == `d${die.sides}` ? die.label : `${die.label} d${die.sides}`
}

export class DiceRoll {
  constructor(data) {
    this.id = data.id
    this.characterId = data.characterId
    this.characterName = data.characterName || ''
    this.characterPicture = data.characterPicture || ''
    this.creatorId = data.creatorId
    this.dice = data.dice || []
    this.modifier = data.modifier || 0
    this.ace = data.ace || false
    this.total = data.total
    this.highest = data.highest
    this.rolledAt = new Date(data.rolledAt)
  }

  /**
   * The names of everything that was rolled, like 'Agility d8 + Stealth d4 + d100'
   */
  get description() {
    return this.dice.map(dieName).join(' + ')
  }
}
