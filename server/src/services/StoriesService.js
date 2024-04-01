import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class StoriesService {
  async getAllStories() {
    const stories = await dbContext.Story.find()
      .populate('creator', 'name picture')
    return stories;
  }

  async getStoryById(storyId) {
    const story = await dbContext.Story.findById(storyId)
      .populate('creator', 'name picture')
      .populate('character', 'name picture')
      .populate('party', 'name picture')
    return story;
  }

  async createStory(storyData) {
    const story = await dbContext.Story.create(storyData);
    return story;
  }

  async updateStory(requestorId, updateData) {
    let story = await this.getStoryById(updateData.id);
    if (story.creatorId == requestorId) {
      await dbContext.Story.findByIdAndUpdate(story.id, updateData);
      return story;
    } else {
      throw new Forbidden("That's not your story to update!")
    }
  }

  async getStoriesByProfile(profileId) {
    let stories = await dbContext.Story.find({ creatorId: profileId })
      .populate('character', 'name picture')
      .populate('party', 'name picture')
    return stories
  }

  async getStoriesByCharacter(characterId) {
    let stories = await dbContext.Story.find({ characterId: characterId })
      .populate('creator', 'name picture')
    return stories
  }

  async getStoriesByParty(partyId) {
    let stories = await dbContext.Story.find({ partyId: partyId })
      .populate('creator', 'name picture')
    return stories
  }

}

export const storiesService = new StoriesService();