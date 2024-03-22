import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { charactersService } from "../services/CharactersService.js";

export class CharactersController extends BaseController {
  constructor() {
    super('api/characters')
    this.router
      .get('')
      .get('/:characterId')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCharacter)
      .put('/:characterId')
      .delete('/:characterId')
  }

  async createCharacter(req, res, next) {
    try {
      const user = req.user
      const characterData = req.body
      characterData.creatorId = user.id
      const character = await charactersService.createCharacter(characterData)
      res.send(character)
    } catch (error) {
      next(error)
    }
  }
}