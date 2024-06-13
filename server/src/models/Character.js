import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

import { HindranceSchema } from "./Hindrance.js";
import { EdgeSchema } from "./Edge.js";
import { WeaponSchema } from "./Weapon.js";
import { PowerSchema } from "./Power.js";
import { SkillSchema } from "./Skill.js";

export const CharacterSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, maxLength: 120 },
    race: { type: String, required: true, maxLength: 100 },
    age: { type: Number },
    height: { type: String, maxLength: 20 },
    weight: { type: String, maxLength: 20 },
    bennies: { type: String, maxLength: 10 },
    conviction: { type: Boolean },
    pace: { type: Number, required: true },
    parry: { type: Number, required: true },
    toughness: { type: Number, required: true },
    agility: { type: Number, required: true, enum: [4, 6, 8, 10, 12], default: 4 },
    smarts: { type: Number, required: true, enum: [4, 6, 8, 10, 12], default: 4 },
    spirit: { type: Number, required: true, enum: [4, 6, 8, 10, 12], default: 4 },
    strength: { type: Number, required: true, enum: [4, 6, 8, 10, 12], default: 4 },
    vigor: { type: Number, required: true, enum: [4, 6, 8, 10, 12], default: 4 },
    fatigue: { type: Number },
    wounds: { type: Number },
    picture: { type: String, maxLength: 2000 },
    thumbnail: { type: String, maxLength: 2000 },
    secret: { type: String, maxLength: 5000 },
    rank: { type: String, enum: ['Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary'], default: 'Novice' },
    maxPowerPoints: { type: Number },
    currentPowerPoints: { type: Number },
    hindrances: [HindranceSchema],
    edges: [EdgeSchema],
    gear: { type: [String], maxLength: 200 },
    weapons: [WeaponSchema],
    powers: [PowerSchema],
    skills: [SkillSchema],
    deactivated: { type: Boolean, required: true, default: false },
    dead: { type: Boolean, required: true, default: false },
    private: { type: Boolean, required: true, default: false },
    playerCharacter: { type: Boolean, required: true, default: true },
    sheetStyle: { type: String, required: true, default: 'Default' }
  }, defaultSchemaOptions
)

CharacterSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})