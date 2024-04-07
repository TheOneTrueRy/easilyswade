import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";
import { api } from "./AxiosService.js";

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
}

export const charactersService = new CharactersService();