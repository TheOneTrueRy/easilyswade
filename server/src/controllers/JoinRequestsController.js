import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { joinRequestsService } from "../services/JoinRequestsService.js";

export class JoinRequestsController extends BaseController {
  constructor() {
    super('api/joinRequests')
    this.router
      .get('', this.getAllJoinRequests)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.sendJoinRequest)
      .put('', this.markJoinRequestsSeen)
      .delete('/:joinRequestId', this.deleteJoinRequest)
  }

  async getAllJoinRequests(req, res, next) {
    try {
      const joinRequests = await joinRequestsService.getAllJoinRequests()
      res.send(joinRequests)
    } catch (error) {
      next(error)
    }
  }

  async sendJoinRequest(req, res, next) {
    try {
      const user = req.userInfo
      const joinRequestData = req.body
      joinRequestData.creatorId = user.id
      const joinRequest = await joinRequestsService.sendJoinRequest(joinRequestData)
      res.send(joinRequest)
    } catch (error) {
      next(error)
    }
  }

  async markJoinRequestsSeen(req, res, next) {
    try {
      const userId = req.userInfo.id
      const joinRequests = await joinRequestsService.markJoinRequestsSeen(userId)
      res.send(joinRequests)
    } catch (error) {
      next(error)
    }
  }

  async deleteJoinRequest(req, res, next) {
    try {
      const requestorId = req.userInfo.id
      const joinRequestId = req.params.joinRequestId
      const joinRequest = await joinRequestsService.deleteJoinRequest(joinRequestId, requestorId)
      res.send(joinRequest)
    } catch (error) {
      next(error)
    }
  }
}