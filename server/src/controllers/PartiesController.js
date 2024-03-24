import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class PartiesController extends BaseController {
  constructor() {
    super('api/parties')
    this.router
      .get('')
      .get('/:partyId')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('')
      .put('/:partyId')
  }
}