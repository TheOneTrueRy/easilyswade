import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CharacterSchema } from "../models/Character.js";
import { PartySchema } from "../models/Party.js";
import { StorySchema } from "../models/Story.js";
import { ArtSchema } from "../models/Art.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Character = mongoose.model('Character', CharacterSchema);
  Art = mongoose.model('Art', ArtSchema);
  Party = mongoose.model('Party', PartySchema);
  Story = mongoose.model('Story', StorySchema)
}

export const dbContext = new DbContext()
