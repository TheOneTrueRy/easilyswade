import { Auth0Provider } from "@bcwdev/auth0provider";
import { artService } from "../services/ArtService.js";
import BaseController from "../utils/BaseController.js";

export class ArtController extends BaseController {
  constructor() {
    super('api/art')
    this.router
      .get('', this.getAllArt)
      .get('/:artId', this.getArtById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createArt)
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

  async createArt(req, res, next) {
    try {
      const user = req.userInfo
      const artData = req.body
      artData.creatorId = user.id
      const art = await artService.createArt(artData)
      res.send(art)
    } catch (error) {
      next(error)
    }
  }
}