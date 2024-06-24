import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { charactersService } from "../services/CharactersService.js";
import { artService } from "../services/ArtService.js";
import { storiesService } from "../services/StoriesService.js";

export class CharactersController extends BaseController {
  constructor() {
    super('api/characters')
    this.router
      .get('', this.getAllCharacters)
      .get('/:characterId', this.getCharacterById)
      .get('/:characterId/art', this.getCharacterArt)
      .get('/:characterId/stories', this.getCharacterStories)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCharacter)
      .put('/:characterId', this.updateCharacter)
      .delete('/:characterId/deactivate', this.toggleDeactivateCharacter)
      .delete('/:characterId/delete', this.deleteCharacter)
  }

  async getAllCharacters(req, res, next) {
    try {
      const characters = await charactersService.getAllCharacters()
      res.send(characters)
    } catch (error) {
      next(error)
    }
  }

  async getCharacterById(req, res, next) {
    try {
      const characterId = req.params.characterId
      const character = await charactersService.getCharacterById(characterId)
      res.send(character)
    } catch (error) {
      next(error)
    }
  }

  async getCharacterArt(req, res, next) {
    try {
      const characterId = req.params.characterId
      const characterArt = await artService.getArtByCharacter(characterId)
      res.send(characterArt)
    } catch (error) {
      next(error)
    }
  }

  async getCharacterStories(req, res, next) {
    try {
      const characterId = req.params.characterId
      const characterStories = await storiesService.getStoriesByCharacter(characterId)
      res.send(characterStories)
    } catch (error) {
      next(error)
    }
  }

  async createCharacter(req, res, next) {
    try {
      const user = req.userInfo
      const characterData = req.body
      characterData.creatorId = user.id
      const character = await charactersService.createCharacter(characterData)
      res.send(character)
    } catch (error) {
      next(error)
    }
  }

  async updateCharacter(req, res, next) {
    try {
      const user = req.userInfo
      const characterData = req.body
      const characterId = req.params.characterId
      const character = await charactersService.updateCharacter(characterId, characterData, user.id)
      res.send(character)
    } catch (error) {
      next(error)
    }
  }

  async toggleDeactivateCharacter(req, res, next) {
    try {
      const userId = req.userInfo.id
      const characterId = req.params.characterId
      const character = await charactersService.toggleDeactivateCharacter(characterId, userId)
      res.send(character)
    } catch (error) {
      next(error)
    }
  }

  async deleteCharacter(req, res, next) {
    try {
      const userId = req.userInfo.id
      const characterId = req.params.characterId
      const character = await charactersService.deleteCharacter(characterId, userId)
      res.send(character)
    } catch (error) {
      next(error)
    }
  }
}