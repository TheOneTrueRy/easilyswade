import { AppState } from "../AppState.js";
import { Party } from "../models/Party.js";
import { api } from "./AxiosService.js";

class PartiesService {
  async getParties() {
    const res = await api.get(`parties`)
    AppState.parties = res.data.map(p => new Party(p))
  }

  async getPartyById(partyId) {
    const res = await api.get(`parties/` + partyId)
    AppState.party = new Party(res.data)
  }

  async getPartiesByProfileId(profileId) {
    const res = await api.get(`${profileId}/parties`)
    AppState.parties = res.data.map(p => new Party(p))
  }
}

export const partiesService = new PartiesService();