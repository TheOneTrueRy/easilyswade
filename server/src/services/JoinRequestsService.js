import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class JoinRequestsService {
  async getAllJoinRequests() {
    let joinRequests = await dbContext.JoinRequest.find()
      .populate('creator')
      .populate('party')
      .populate('character')
    return joinRequests
  }

  async getJoinRequestById(joinRequestId) {
    let joinRequest = await dbContext.JoinRequest.findById(joinRequestId)
    if (!joinRequest) {
      throw new BadRequest("Bad Join Request ID")
    }
    return joinRequest
  }

  async sendJoinRequest(joinRequestData) {
    let joinRequest = await dbContext.JoinRequest.create(joinRequestData)
    return joinRequest
  }

  async markJoinRequestsSeen(userId) {
    let joinRequests = await dbContext.JoinRequest.find({ receiverId: userId })
    joinRequests.forEach(async j => {
      j.seen = true
      await j.save()
    })
    return joinRequests
  }

  async deleteJoinRequest(joinRequestId, requestorId) {
    let joinRequest = await this.getJoinRequestById(joinRequestId)
    if (requestorId != joinRequest.creatorId || joinRequest.receiverId) {
      throw new Forbidden("Hey! That's not your Join Request to delete!")
    }
    //@ts-ignore
    await joinRequest.remove()
    return "Party Join Request successfully deleted!"
  }
}

export const joinRequestsService = new JoinRequestsService();