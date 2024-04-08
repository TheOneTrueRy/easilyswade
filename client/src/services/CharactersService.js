import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";
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
  }

  async getCharactersByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/characters`)
    AppState.characters = res.data.map(c => new Character(c))
  }

  async createCharacter(picture, characterData) {
    const folder = AppState.user.id
    if (picture) {
      const url = supabaseService.upload(picture, `${folder}/characterpictures/${characterData.name}/${new Date().toISOString()}`)
      characterData.picture = url
    }
    const res = await api.post('api/characters')
    AppState.character = new Character(res.data)
  }

  async updateCharacter(picture, characterData) {
    const folder = AppState.user.id
    if (picture) {
      const url = supabaseService.upload(picture, `${folder}/characterpictures/${characterData.name}/${new Date().toISOString()}`)
      characterData.picture = url
    }
    const res = await api.put('api/characters/' + characterData.id)
    AppState.character = new Character(res.data)
  }
}

export const charactersService = new CharactersService();