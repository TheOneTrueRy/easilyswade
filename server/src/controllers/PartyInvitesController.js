import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { partyInvitesService } from "../services/PartyInvitesService.js";

export class PartyInvitesController extends BaseController {
  constructor() {
    super('api/partyInvites')
    this.router
      .get('', this.getAllPartyInvites)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.sendPartyInvite)
      .put('', this.markPartyInvitesSeen)
      .delete('/:partyInviteId', this.deletePartyInvite)
  }

  async getAllPartyInvites(req, res, next) {
    try {
      const partyInvites = await partyInvitesService.getAllPartyInvites()
      res.send(partyInvites)
    } catch (error) {
      next(error)
    }
  }

  async sendPartyInvite(req, res, next) {
    try {
      const user = req.userInfo
      const partyInviteData = req.body
      partyInviteData.creatorId = user.id
      const partyInvite = await partyInvitesService.sendPartyInvite(partyInviteData)
      res.send(partyInvite)
    } catch (error) {
      next(error)
    }
  }

  async markPartyInvitesSeen(req, res, next) {
    try {
      const userId = req.userInfo.id
      const partyInvites = await partyInvitesService.markPartyInvitesSeen(userId)
      res.send(partyInvites)
    } catch (error) {
      next(error)
    }
  }

  async deletePartyInvite(req, res, next) {
    try {
      const requestorId = req.userInfo.id
      const partyInviteId = req.params.partyInviteId
      const partyInvite = await partyInvitesService.deletePartyInvite(partyInviteId, requestorId)
      res.send(partyInvite)
    } catch (error) {
      next(error)
    }
  }
}