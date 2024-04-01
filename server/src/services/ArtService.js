import { dbContext } from "../db/DbContext.js";

class ArtService {
  async getAllArt() {
    let art = await dbContext.Art.find()
      .populate('creator')
    return art
  }

  async getArtById(artId) {
    let art = await dbContext.Art.findById(artId)
      .populate('creator')
    return art
  }

  async createArt(artData) {
    let art = await dbContext.Art.create(artData)
    return art
  }
}

export const artService = new ArtService();