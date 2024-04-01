import { dbContext } from "../db/DbContext.js";

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
}

export const artService = new ArtService();