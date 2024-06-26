import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProfilesService {

  async getProfiles() {
    AppState.profiles = [];
    const res = await api.get('api/profiles')
    AppState.profiles = res.data.map(p => new Profile(p))
  }

  async getProfileById(profileId) {
    AppState.profile = null;
    const res = await api.get('api/profiles/' + profileId)
    AppState.profile = new Profile(res.data)
  }

  async searchProfiles(query) {
    AppState.profiles = [];
    const res = await api.get('api/profiles', { params: { name: query.query } })
    AppState.profiles = res.data.map(p => new Profile(p))
    logger.log(AppState.profiles)
  }

}

export const profilesService = new ProfilesService();