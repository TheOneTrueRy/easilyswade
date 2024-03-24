import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class PartiesService {
  async getAllParties() {
    let parties = await dbContext.Party.find();
    return (parties);
  }

  async getPartyById(partyId) {
    let party = await dbContext.Party.findById(partyId);
    return (party);
  }

  async createParty(partyData) {
    let party = await dbContext.Party.create(partyData);
    return (party);
  }

  async updateParty(requestorId, updateData) {
    let party = await this.getPartyById(updateData.id);
    if (requestorId == party.creatorId) {
      await dbContext.Party.findByIdAndUpdate(party.id, updateData);
      return party;
    } else {
      throw new Forbidden("That's not your party to edit!")
    }
  }
};

export const partiesService = new PartiesService();