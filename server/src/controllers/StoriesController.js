import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class StoriesController extends BaseController {
  constructor() {
    super('api/stories')
    this.router
      .get('')
      .get('/:storyId')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('')
      .put('/:storyId')
  }
}