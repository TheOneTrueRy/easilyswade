import { dbContext } from "../db/DbContext.js";

class HindrancesService {
  async getAllHindrances() {
    let hindrances = await dbContext.Hindrance.find()
    return hindrances
  }

  async getHindranceById(hindranceId) {
    let hindrance = await dbContext.Hindrance.findById(hindranceId)
    return hindrance
  }

};

export const hindrancesService = new HindrancesService();