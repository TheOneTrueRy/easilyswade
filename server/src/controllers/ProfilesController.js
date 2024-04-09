import { artService } from "../services/ArtService.js"
import { charactersService } from "../services/CharactersService.js"
import { profileService } from '../services/ProfileService.js'
import { storiesService } from "../services/StoriesService.js"
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:profileId', this.getProfile)
      .get('/:profileId/characters', this.getCharactersByProfile)
      .get('/:profileId/art', this.getArtByProfile)
      .get('/:profileId/stories', this.getStoriesByProfile)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.profileId)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getCharactersByProfile(req, res, next) {
    try {
      const characters = await charactersService.getCharactersByProfile(req.params.profileId)
      res.send(characters)
    } catch (error) {
      next(error)
    }
  }

  async getArtByProfile(req, res, next) {
    try {
      const art = await artService.getArtByProfile(req.params.profileId)
      res.send(art)
    } catch (error) {
      next(error)
    }
  }

  async getStoriesByProfile(req, res, next) {
    try {
      const stories = await storiesService.getStoriesByProfile(req.params.profileId)
      res.send(stories)
    } catch (error) {
      next(error)
    }
  }

}
