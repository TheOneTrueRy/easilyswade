import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class CharactersService {
  async createCharacter(characterData) {
    let character = await dbContext.Character.create(characterData)
    return character
  }

  async getAllCharacters() {
    let characters = await dbContext.Character.find()
      .populate('creator', 'name picture')
    return characters
  }

  async getCharacterById(characterId) {
    const character = await dbContext.Character.findById(characterId)
      .populate('creator', 'name picture')
      .populate('party', 'dungeonMasterIds')
    return character
  }

  async getCharactersByProfile(profileId) {
    let characters = await dbContext.Character.find({ creatorId: profileId })
    return characters
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