import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class CharactersService {
  async createCharacter(characterData) {
    let character = await dbContext.Character.create(characterData)
    return character
  }

  async getAllCharacters() {
    let characters = await dbContext.Character.find()
      .populate('creator')
    return characters
  }

  async getCharacterById(characterId) {
    let character = await dbContext.Character.findById(characterId)
      .populate('creator')
    return character
  }

  async updateCharacter(characterId, characterData, requestorId) {
    let character = await this.getCharacterById(characterId)
    if (requestorId == character.creatorId) {
      await dbContext.Character.findByIdAndUpdate(characterId, characterData)
      return character
    } else {
      throw new Forbidden("That's not your character to update!")
    }
  }
};

export const charactersService = new CharactersService();