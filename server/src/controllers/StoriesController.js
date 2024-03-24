import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { storiesService } from "../services/StoriesService.js";

export class StoriesController extends BaseController {
  constructor() {
    super('api/stories')
    this.router
      .get('', this.getAllStories)
      .get('/:storyId', this.getStoryById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createStory)
      .put('/:storyId', this.updateStory)
  }

  async getAllStories(req, res, next) {
    try {
      const stories = await storiesService.getAllStores();
      res.send(stories);
    } catch (error) {
      next(error);
    }
  }

  async getStoryById(req, res, next) {
    try {
      const storyId = req.params.storyId;
      const story = await storiesService.getStoryById(storyId);
      res.send(story)
    } catch (error) {
      next(error)
    }
  }

  async createStory(req, res, next) {
    try {
      const user = req.userInfo;
      const storyData = req.body;
      storyData.creatorId = user.id;
      const story = await storiesService.createStory(storyData);
      res.send(story);
    } catch (error) {
      next(error)
    }
  }

  async updateStory(req, res, next) {
    try {
      const user = req.userInfo;
      const updateData = req.body;
      const story = await storiesService.updateStory(user.id, updateData);
      res.send(story)
    } catch (error) {
      next(error)
    }
  }
}