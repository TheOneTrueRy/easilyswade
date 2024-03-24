import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CharacterSchema } from "../models/Character.js";
import { PartySchema } from "../models/Party.js";
import { StorySchema } from "../models/Story.js";
import { ArtSchema } from "../models/Art.js";
// import { HindranceSchema } from "../models/Hindrance.js";
// import { WeaponSchema } from "../models/Weapon.js";
// import { PowerSchema } from "../models/Power.js";
// import { SkillSchema } from "../models/Skill.js";
// import { EdgeSchema } from "../models/Edge.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Character = mongoose.model('Character', CharacterSchema);
  Art = mongoose.model('Art', ArtSchema);
  Party = mongoose.model('Party', PartySchema);
  Story = mongoose.model('Story', StorySchema)
  // Hindrance = mongoose.model('Hindrance', HindranceSchema);
  // Weapon = mongoose.model('Weapon', WeaponSchema);
  // Power = mongoose.model('Power', PowerSchema);
  // Skill = mongoose.model('Skill', SkillSchema);
  // Edge = mongoose.model('Edge', EdgeSchema);
}

export const dbContext = new DbContext()
