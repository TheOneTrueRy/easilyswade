import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class ArtService {
  async getAllArt() {
    let art = await dbContext.Art.find()
      .populate('creator', 'name picture')
    return art
  }

  async getArtById(artId) {
    let art = await dbContext.Art.findById(artId)
      .populate('creator', 'name picture')
      .populate('character', 'name picture')
      .populate('party', 'name picture')
    return art
  }

  async createArt(artData) {
    let art = await dbContext.Art.create(artData)
    return art
  }

  async getArtByProfile(profileId) {
    let art = await dbContext.Art.find({ creatorId: profileId })
      .populate('character', 'name picture')
      .populate('party', 'name picture')
    return art
  }

  async getArtByCharacter(characterId) {
    let art = await dbContext.Art.find({ characterId: characterId })
      .populate('creator', 'name picture')
    return art
  }

  async getArtByParty(partyId) {
    let art = await dbContext.Art.find({ partyId: partyId })
      .populate('creator', 'name picture')
    return art
  }

  async updateArt(artId, artData, requestorId) {
    let art = await this.getArtById(artId)
    if (requestorId != art.creatorId) {
      throw new Forbidden("Hey! That's not your art to update!")
    }
    await dbContext.Art.findByIdAndUpdate(art.id, artData)
    let updatedArt = await this.getArtById(artId)
    return updatedArt
  }

  async deleteArt(artId, requestorId) {
    let art = await this.getArtById(artId)
    if (requestorId != art.creatorId) {
      throw new Forbidden("Hey! That's not your art to delete!")
    }
    await art.deleteOne()
    return "Art post successfully deleted!"
  }
}

export const artService = new ArtService();