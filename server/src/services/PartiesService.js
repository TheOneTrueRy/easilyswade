import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class PartiesService {
  async getAllParties() {
    let parties = await dbContext.Party.find()
      .populate('creator', 'name picture')
    return parties;
  }

  async getPartyById(partyId) {
    let party = await dbContext.Party.findById(partyId)
      .populate('creator', 'name picture')
      .populate('dungeonmasters', 'name picture')
      .populate('characters', 'name picture')
      .populate('npcs', 'name picture')
    return party;
  }

  async createParty(partyData) {
    let party = await dbContext.Party.create(partyData);
    return party;
  }

  async updateParty(requestorId, updateData) {
    let party = await this.getPartyById(updateData.id);
    if (requestorId == party.creatorId) {
      await dbContext.Party.findByIdAndUpdate(party.id, updateData);
      return party;
    } else {
      throw new Forbidden("Hey! That's not your party to edit!")
    }
  }

  async deleteParty(partyId, requestorId) {
    let party = await this.getPartyById(partyId)
    if (requestorId != party.creatorId) {
      throw new Forbidden("Hey! That's not your party to delete1")
    }
  }

};

export const partiesService = new PartiesService();