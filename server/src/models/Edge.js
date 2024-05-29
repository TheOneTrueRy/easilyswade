import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const EdgeSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 80, minLength: 2 },
    description: { type: String, maxLength: 3000 },
    expanded: { type: Boolean, default: false },
    rank: { type: String, enum: ['Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary'], default: 'Novice' },
    additionalRequirements: { type: String, maxLength: 300 }
  }, defaultSchemaOptions
)