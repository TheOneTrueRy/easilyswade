import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

import { HindranceSchema } from "./Hindrance.js";
import { EdgeSchema } from "./Edge.js";
import { ArtSchema } from "./Art.js";
import { WeaponSchema } from "./Weapon.js";
import { PowerSchema } from "./Power.js";
import { SkillSchema } from "./Skill.js";

export const CharacterSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    name: { type: String, required: true, maxLength: 100 },
    race: { type: String, required: true, maxLength: 100 },
    age: { type: Number },
    height: { type: String, maxLength: 50 },
    weight: { type: Number },
    bennies: { type: Number },
    pace: { type: Number, required: true },
    parry: { type: Number, required: true },
    toughness: { type: Number, required: true },
    agility: { type: Number, required: true },
    smarts: { type: Number, required: true },
    spirit: { type: Number, required: true },
    strength: { type: Number, required: true },
    vigor: { type: Number, required: true },
    fatigue: { type: Number },
    wounds: { type: Number },
    picture: { type: String, maxLength: 2000 },
    secret: { type: String, maxLength: 5000 },
    rank: { type: String, enum: ['Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary'], default: 'Novice' },
    powerPoints: { type: Number },
    art: [ArtSchema],
    hindrances: [HindranceSchema],
    edges: [EdgeSchema],
    gear: { type: [String], maxLength: 120 },
    weapons: [WeaponSchema],
    powers: [PowerSchema],
    skills: [SkillSchema],
    sheetStyle: { type: String, required: true, default: 'Default' }
  }, defaultSchemaOptions
)

CharacterSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})