import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class StoriesService {
  async getAllStores() {
    const stories = await dbContext.Story.find();
    return stories;
  }

  async getStoryById(storyId) {
    const story = await dbContext.Story.findById(storyId);
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

}

export const storiesService = new StoriesService();