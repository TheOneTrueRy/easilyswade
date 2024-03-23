import { hindrancesService } from "../services/HindrancesService.js";
import BaseController from "../utils/BaseController.js";

export class HindrancesController extends BaseController {
  constructor() {
    super('api/hindrances')
    this.router
      .get('')
      .get('/:hindranceId')
  }

  async getAllHindrances(req, res, next) {
    try {
      const hindrances = await hindrancesService.getAllHindrances()
      res.send(hindrances)
    } catch (error) {
      next(error)
    }
  }

  async getHidnranceById(req, res, next) {
    try {
      const hindranceId = req.params.hindranceId
      const hindrance = await hindrancesService.getHindranceById(hindranceId)
      res.send(hindrance)
    } catch (error) {
      next(error)
    }
  }
}