import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class CharactersController extends BaseController {
  constructor() {
    super('api/characters')
    this.router
      .get('')
      .get('/:characterId')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('')
      .put('/:characterId')
      .delete('/:characterId')
  }
}