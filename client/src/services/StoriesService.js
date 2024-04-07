import { AppState } from "../AppState.js";
import { Story } from "../models/Story.js";
import { api } from "./AxiosService.js";

class StoriesService {
  async getStories() {
    const res = await api.get(`stories`)
    AppState.stories = res.data.map(s => new Story(s))
  }

  async getStoryById(storyId) {
    const res = await api.get(`stories/` + storyId)
    AppState.story = new Story(res.data)
  }

  async getStoriesByProfileId(profileId) {
    const res = await api.get(`${profileId}/stories`)
    AppState.stories = res.data.map(s => new Story(s))
  }
}

export const storiesService = new StoriesService();