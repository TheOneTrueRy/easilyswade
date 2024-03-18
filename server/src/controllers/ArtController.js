import { artService } from "../services/ArtService.js";
import BaseController from "../utils/BaseController.js";

export class ArtController extends BaseController {
  constructor() {
    super('api/art')
    this.router
      .get('', this.getAllArt)
      .get('/:artId', this.getArtById)
  }

  async getAllArt(req, res, next) {
    try {
      const art = await artService.getAllArt()
      res.send(art)
    } catch (error) {
      next(error)
    }
  }

  async getArtById(req, res, next) {
    try {
      const artId = req.params.artId
      const art = await artService.getArtById(artId)
      res.send(art)
    } catch (error) {
      next(error)
    }
  }
}