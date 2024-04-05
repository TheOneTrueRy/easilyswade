import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class PartyInvitesService {
  async getAllPartyInvites() {
    let partyInvites = await dbContext.PartyInvite.find()
      .populate('creator')
      .populate('party')
      .populate('character')
    return partyInvites
  }

  async getPartyInviteById(partyInviteId) {
    let partyInvite = await dbContext.PartyInvite.findById(partyInviteId)
    if (!partyInvite) {
      throw new BadRequest("Bad Party Invite ID")
    }
    return partyInvite
  }

  async sendPartyInvite(partyInviteData) {
    let partyInvite = await dbContext.PartyInvite.create(partyInviteData)
    return partyInvite
  }

  async markPartyInvitesSeen(userId) {
    let partyInvites = await dbContext.PartyInvite.find({ receiverId: userId })
    partyInvites.forEach(async p => {
      p.seen = true
      await p.save()
    })
    return partyInvites
  }

  async deletePartyInvite(partyInviteId, requestorId) {
    let partyInvite = await this.getPartyInviteById(partyInviteId)
    if (requestorId != partyInvite.creatorId || partyInvite.receiverId) {
      throw new Forbidden("Hey! That's not your party invite to delete!")
    }
    //@ts-ignore
    await partyInvite.remove()
    return "Party Invite successfully removed!"
  }
}

export const partyInvitesService = new PartyInvitesService();