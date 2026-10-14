import { randomInt, randomUUID } from "crypto";
import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden, NotFound } from "../utils/Errors.js";

const ALLOWED_SIDES = [4, 6, 8, 10, 12, 20, 100]
const MAX_DICE = 12
// NOTE only the dice up to a d12 can Ace (explode), and only so many times so a roll can't run away
const MAX_ACE_SIDES = 12
const MAX_ACES = 10

class DiceService {
  /**
   * Rolls a pool of dice for one of the requestor's characters.
   * @param {{ characterId: string, dice: { label: string, sides: number, bonus: number }[], modifier: number, ace: boolean }} rollData
   * @param {string} requestorId The id of the account asking for the roll.
   * @returns {Promise<{ roll: any, recipientIds: string[] }>} The finished roll and the ids of every account that should hear about it.
   */
  async rollDice(rollData, requestorId) {
    if (!rollData) {
      throw new BadRequest('There is no roll to make!')
    }
    const character = await dbContext.Character.findById(rollData.characterId)
    if (!character) {
      throw new NotFound('Unable to find the character to roll for!')
    }
    if (String(character.creatorId) != String(requestorId)) {
      throw new Forbidden("Hey! That's not your character to roll for!")
    }
    const roll = {
      ...this.buildRoll(rollData),
      id: randomUUID(),
      characterId: String(character._id),
      characterName: character.name,
      characterPicture: character.thumbnail || character.picture || '',
      creatorId: String(character.creatorId),
      rolledAt: new Date()
    }
    const recipientIds = await this.getRecipientIds(character)
    return { roll, recipientIds }
  }

  /**
   * Validates the requested pool and rolls every die in it.
   * Pure, doesn't touch the database.
   */
  buildRoll(rollData) {
    const { dice, ace } = rollData
    if (!Array.isArray(dice) || !dice.length) {
      throw new BadRequest('Pick at least one die to roll!')
    }
    if (dice.length > MAX_DICE) {
      throw new BadRequest(`You can only roll ${MAX_DICE} dice at a time!`)
    }
    const modifier = this.toInteger(rollData.modifier, -99, 99, 'modifier')
    const rolledDice = dice.map(die => {
      const sides = Number(die?.sides)
      if (!ALLOWED_SIDES.includes(sides)) {
        throw new BadRequest(`A d${die?.sides} isn't a die you can roll!`)
      }
      const bonus = this.toInteger(die.bonus, -20, 20, 'bonus')
      const rolls = this.rollDie(sides, ace === true && sides <= MAX_ACE_SIDES)
      const total = rolls.reduce((sum, r) => sum + r, 0) + bonus
      return { label: String(die.label || `d${sides}`).slice(0, 30), sides, bonus, rolls, total }
    })
    const totals = rolledDice.map(d => d.total)
    return {
      dice: rolledDice,
      modifier,
      ace: ace === true,
      highest: Math.max(...totals),
      total: totals.reduce((sum, t) => sum + t, 0) + modifier
    }
  }

  /**
   * Rolls one die, when it Aces (lands on its highest number) it is rolled again and added on.
   * @returns {number[]} Every roll that made up the die.
   */
  rollDie(sides, canAce) {
    const rolls = []
    let result
    do {
      result = randomInt(1, sides + 1)
      rolls.push(result)
    } while (canAce && result == sides && rolls.length <= MAX_ACES)
    return rolls
  }

  toInteger(value, min, max, name) {
    const number = Number(value || 0)
    if (!Number.isInteger(number) || number < min || number > max) {
      throw new BadRequest(`The ${name} must be a whole number from ${min} to ${max}!`)
    }
    return number
  }

  /**
   * Everyone who should hear about a roll: the character's creator, and if the character is in a party,
   * the party's creator, its DMs, and the creators of every other character in the party.
   * @returns {Promise<string[]>} Account ids, which are also the socket rooms each user joins.
   */
  async getRecipientIds(character) {
    const recipientIds = new Set([String(character.creatorId)])
    if (character.partyId) {
      const party = await dbContext.Party.findById(character.partyId)
      if (party) {
        recipientIds.add(String(party.creatorId))
        party.dungeonMasterIds.forEach(id => recipientIds.add(String(id)))
        const partyCharacters = await dbContext.Character
          .find({ $or: [{ partyId: party._id }, { _id: { $in: party.characterIds } }] })
          .select('creatorId')
        partyCharacters.forEach(c => recipientIds.add(String(c.creatorId)))
      }
    }
    return [...recipientIds]
  }
}

export const diceService = new DiceService()
