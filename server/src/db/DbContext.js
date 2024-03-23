import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CharacterSchema } from "../models/Character.js";
import { HindranceSchema } from "../models/Hindrance.js";
import { ArtSchema } from "../models/Art.js";
import { WeaponSchema } from "../models/Weapon.js";
import { PowerSchema } from "../models/Power.js";
import { SkillSchema } from "../models/Skill.js";
import { EdgeSchema } from "../models/Edge.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Character = mongoose.model('Character', CharacterSchema);
  Hindrance = mongoose.model('Hindrance', HindranceSchema);
  Art = mongoose.model('Art', ArtSchema);
  Weapon = mongoose.model('Weapon', WeaponSchema);
  Power = mongoose.model('Power', PowerSchema);
  Skill = mongoose.model('Skill', SkillSchema);
  Edge = mongoose.model('Edge', EdgeSchema);
}

export const dbContext = new DbContext()
