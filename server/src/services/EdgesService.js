import { dbContext } from "../db/DbContext.js";

class EdgesService {
  async getEdgeById(edgeId) {
    let edge = await dbContext.Edge.findById(edgeId)
    return edge
  }
  async getAllEdges() {
    let edges = await dbContext.Edge.find()
    return edges
  }

};

export const edgesService = new EdgesService();