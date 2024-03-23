import { edgesService } from "../services/EdgesService.js";
import BaseController from "../utils/BaseController.js";

export class EdgesController extends BaseController {
  constructor() {
    super('api/edges')
    this.router
      .get('', this.getAllEdges)
      .get('/:edgeId', this.getEdgeById)
  }

  async getAllEdges(req, res, next) {
    try {
      const edges = await edgesService.getAllEdges()
      res.send(edges)
    } catch (error) {
      next(error)
    }
  }

  async getEdgeById(req, res, next) {
    try {
      const edgeId = req.params.edgeId
      const edge = await edgesService.getEdgeById(edgeId)
      res.send(edge)
    } catch (error) {
      next(error)
    }
  }
}