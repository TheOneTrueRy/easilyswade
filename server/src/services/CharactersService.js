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
    let character = await dbContext.Character.findById(characterId)
      .populate('creator', 'name picture')
    return character
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

  async getCharactersByProfile(profileId) {
    let characters = await dbContext.Character.find({ creatorId: profileId })
    return characters
  }
};

export const charactersService = new CharactersService();