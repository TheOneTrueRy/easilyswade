import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { partiesService } from "../services/PartiesService.js";
import { artService } from "../services/ArtService.js";
import { storiesService } from "../services/StoriesService.js";

export class PartiesController extends BaseController {
  constructor() {
    super('api/parties')
    this.router
      .get('', this.getAllParties)
      .get('/:partyId', this.getPartyById)
      .get('/:partyId/art', this.getPartyArt)
      .get('/:partyId/stories', this.getPartyStories)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createParty)
      .put('/:partyId', this.updateParty)
  }

  async getAllParties(req, res, next) {
    try {
      const parties = await partiesService.getAllParties();
      res.send(parties);
    } catch (error) {
      next(error);
    }
  }

  async getPartyById(req, res, next) {
    try {
      const partyId = req.params.partyId;
      const party = await partiesService.getPartyById(partyId);
      res.send(party);
    } catch (error) {
      next(error);
    }
  }

  async getPartyArt(req, res, next) {
    try {
      const partyId = req.params.partyId
      const partyArt = await artService.getArtByParty(partyId)
      res.send(partyArt)
    } catch (error) {
      next(error)
    }
  }

  async getPartyStories(req, res, next) {
    try {
      const partyId = req.params.partyId
      const partyStories = await storiesService.getStoriesByParty(partyId)
      res.send(partyStories)
    } catch (error) {
      next(error)
    }
  }

  async createParty(req, res, next) {
    try {
      const user = req.userInfo;
      const partyData = req.body;
      partyData.creatorId = user.id;
      const party = await partiesService.createParty(partyData);
      res.send(party);
    } catch (error) {
      next(error)
    }
  }

  async updateParty(req, res, next) {
    try {
      const user = req.userInfo;
      const updateData = req.body;
      const party = await partiesService.updateParty(user.id, updateData);
      res.send(party);
    } catch (error) {
      next(error);
    }
  }
}