import mongoose from "mongoose";
import { dbContext } from "../db/DbContext.js";
import { Forbidden, NotFound } from "../utils/Errors.js";

class CharactersService {
  async createCharacter(characterData) {
    let character = await dbContext.Character.create(characterData)
    return character
  }

  /**
   * Characters anyone can find by searching: the Public ones, plus all of the viewer's own.
   * @param {string} name
   * @param {string} viewerId The account id of whoever is searching, if they are logged in.
   */
  async searchCharacters(name = '', viewerId = null) {
    const filter = new RegExp(name, 'ig')
    const visibleTo = [{ privacy: { $nin: ['Private', 'Deactivated'] } }]
    if (mongoose.isValidObjectId(viewerId)) {
      visibleTo.push({ creatorId: new mongoose.Types.ObjectId(viewerId) })
    }
    const characters = await dbContext.Character
      .aggregate([{
        $match: { name: filter, $or: visibleTo }
      }])
      .collation({ locale: 'en_US', strength: 1 })
      .exec()
    return characters.map(c => this.hideSecret(c, viewerId))
  }

  /**
   * Gives back a plain copy of the character, without its secret unless the viewer is the character's creator.
   */
  hideSecret(character, viewerId) {
    const data = character.toJSON ? character.toJSON() : { ...character }
    if (String(data.creatorId) != String(viewerId)) {
      delete data.secret
    }
    return data
  }

  /**
   * Finds the party a character is in, the character can point at its party with partyId or the party can list the character in characterIds.
   */
  async findParty(character) {
    if (character.partyId) {
      const party = await dbContext.Party.findById(character.partyId)
      if (party) {
        return party
      }
    }
    return await dbContext.Party.findOne({ characterIds: character._id })
  }

  /**
   * A character as the viewer is allowed to see it. Private characters are only for their creator and their party's DMs,
   * and the secret is only for the creator and their party's DMs.
   * @param {string} viewerId The account id of whoever is asking, if they are logged in.
   */
  async getCharacterForViewer(characterId, viewerId = null) {
    const character = await this.getCharacterById(characterId)
    if (!character) {
      throw new NotFound('Unable to find that character!')
    }
    const party = await this.findParty(character)
    const isCreator = String(character.creatorId) == String(viewerId)
    const isDungeonMaster = !!party && party.dungeonMasterIds.some(id => String(id) == String(viewerId))
    if (character.privacy == 'Private' && !isCreator && !isDungeonMaster) {
      throw new Forbidden('This character is private!')
    }
    const data = character.toJSON()
    // NOTE the sheet checks the party's dungeonMasterIds to know who can see the secret, even if the character is only listed in the party's characterIds
    if (party) {
      data.party = { id: party._id, dungeonMasterIds: party.dungeonMasterIds }
    }
    if (!isCreator && !isDungeonMaster) {
      delete data.secret
    }
    return data
  }

  async getCharacterById(characterId) {
    const character = await dbContext.Character.findById(characterId)
      .populate('creator', 'name picture')
      .populate('party', 'dungeonMasterIds')
    return character
  }

  /**
   * A profile's characters, everyone gets the Public and Deactivated ones and the profile's owner gets all of them.
   * @param {string} viewerId The account id of whoever is asking, if they are logged in.
   */
  async getCharactersByProfile(profileId, viewerId = null) {
    const filter = { creatorId: profileId }
    if (String(viewerId) != String(profileId)) {
      filter.privacy = { $ne: 'Private' }
    }
    const characters = await dbContext.Character.find(filter)
    return characters.map(c => this.hideSecret(c, viewerId))
  }

  async updateCharacter(characterId, characterData, requestorId) {
    let character = await this.getCharacterById(characterId)
    if (requestorId == character.creatorId) {
      await dbContext.Character.findByIdAndUpdate(characterId, characterData)
      let updatedCharacter = await this.getCharacterById(characterId)
      return updatedCharacter
    } else {
      throw new Forbidden("Hey! That's not your character to update!")
    }
  }

  async toggleDeactivateCharacter(characterId, requestorId) {
    let character = await this.getCharacterById(characterId)
    if (requestorId != character.creatorId) {
      throw new Forbidden("Hey! That's not your character to deactivate!")
    }
    if (character.privacy == 'Deactivated') {
      await dbContext.Character.findByIdAndUpdate(characterId, { privacy: 'Public' })
    } else {
      await dbContext.Character.findByIdAndUpdate(characterId, { privacy: 'Deactivated' })
    }
    let toggledCharacter = await this.getCharacterById(characterId)
    return toggledCharacter
  }

  async deleteCharacter(characterId, requestorId) {
    const character = await this.getCharacterById(characterId)
    if (requestorId != character.creatorId) {
      throw new Forbidden("Hey! That's not your character to delete!")
    }
    await character.deleteOne()
    return "Character Successfully removed!"
  }
};

export const charactersService = new CharactersService();