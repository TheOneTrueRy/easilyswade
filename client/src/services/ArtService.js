import { AppState } from "../AppState.js";
import { Art } from "../models/Art.js";
import { api } from "./AxiosService.js";

class ArtService {
  async getArt() {
    const res = await api.get('art')
    AppState.art = res.data.map(a => new Art(a))
  }

  async getArtById(artId) {
    const res = await api.get('art/' + artId)
    AppState.art = new Art(res.data)
  }

  async getArtByProfileId(profileId) {
    const res = await api.get(`${profileId}/art`)
    AppState.art = res.data.map(a => new Art(a))
  }
}

export const artService = new ArtService();