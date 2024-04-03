import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CharacterSchema } from "../models/Character.js";
import { PartySchema } from "../models/Party.js";
import { StorySchema } from "../models/Story.js";
import { ArtSchema } from "../models/Art.js";
import { PartyInviteSchema } from "../models/PartyInvite.js";
import { JoinRequestSchema } from "../models/JoinRequest.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Character = mongoose.model('Character', CharacterSchema);
  Art = mongoose.model('Art', ArtSchema);
  Party = mongoose.model('Party', PartySchema);
  Story = mongoose.model('Story', StorySchema);
  PartyInvite = mongoose.model('PartyInvite', PartyInviteSchema);
  JoinRequest = mongoose.model('JoinRequest', JoinRequestSchema);
}

export const dbContext = new DbContext()
