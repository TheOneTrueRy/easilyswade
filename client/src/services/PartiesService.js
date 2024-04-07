import { AppState } from "../AppState.js";
import { Party } from "../models/Party.js";
import { api } from "./AxiosService.js";

class PartiesService {
  async getParties() {
    const res = await api.get(`api/parties`)
    AppState.parties = res.data.map(p => new Party(p))
    AppState.filteredParties = res.data.map(p => new Party(p))
  }

  async getPartyById(partyId) {
    const res = await api.get(`api/parties/` + partyId)
    AppState.party = new Party(res.data)
  }

  changeFilter(filter) {
    if (filter == 'all') {
      AppState.filteredParties = AppState.parties
    } else if (filter == 'creator') {
      AppState.filteredParties = AppState.parties.filter(p => p.creatorId == AppState.account.id)
    } else if (filter == 'dm') {
      AppState.filteredParties = AppState.parties.filter(p => p.dungeonMasterIds.includes(AppState.account.id))
    } else if (filter == 'character') {
      AppState.filteredParties = AppState.parties.filter(p => p.characterIds.some(id => AppState.characters.filter(c => c.playerCharacter == true).includes(id)))
    }
  }
}

export const partiesService = new PartiesService();