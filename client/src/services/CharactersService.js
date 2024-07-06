import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { supabaseService } from "./SupabaseService.js";

class CharactersService {
  async getCharacters() {
    const res = await api.get(`api/characters`)
    AppState.characters = res.data.map(c => new Character(c))
  }

  async getCharacterById(characterId) {
    const res = await api.get(`api/characters/` + characterId)
    AppState.character = new Character(res.data)
    logger.log(AppState.character)
  }

  async getCharactersByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/characters`)
    AppState.characters = res.data.map(c => new Character(c))
  }

  async createCharacter(characterData) {
    const res = await api.post('api/characters', characterData)
    AppState.character = new Character(res.data)
  }

  async updateCharacter(characterData) {
    const res = await api.put('api/characters/' + characterData.id, characterData)
    AppState.character = new Character(res.data)
  }

  async updateCharacterPicture(picture) {
    const folder = AppState.user.id
    const url = await supabaseService.upload(picture, `${folder}/characterpictures/${AppState.character.id}/${new Date().toISOString()}`)
    this.updateCharacter({ ...AppState.character, picture: url })
    return url
  }

  async updateCharacterThumbnail(thumbnail, characterId) {
    const folder = AppState.user.id
    let character = AppState.characters.find(c => c.id == characterId)
    const url = await supabaseService.upload(thumbnail, `${folder}/characterthumbnails/${characterId}/${new Date().toISOString()}`)
    await this.updateCharacter({ ...character, thumbnail: url })
    character.thumbnail = url
  }

  async uploadNewCharacterPicture(picture) {
    const folder = AppState.user.id
    const url = await supabaseService.upload(picture, `${folder}/unassignedcharacterpictures/${new Date().toISOString()}`)
    return url
  }

  async deleteCharacter(characterId) {
    const res = await api.delete(`api/characters/${characterId}/delete`)
    const characterIndex = AppState.characters.findIndex(c => c.id == characterId)
    AppState.characters.splice(characterIndex, 1)
  }

  async toggleDeactivateCharacter(characterId) {
    const toggledCharacter = await api.delete(`api/characters/${characterId}/deactivate`)
    const characterIndex = AppState.characters.findIndex(c => c.id == characterId)
    AppState.characters.splice(characterIndex, 1, new Character(toggledCharacter.data))
  }
}

export const charactersService = new CharactersService();