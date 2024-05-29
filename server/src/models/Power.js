import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const PowerSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 60 },
    rank: { type: String, enum: ['Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary'], default: 'Novice' },
    powerPoints: { type: Number, required: true },
    range: { type: String, required: true, maxLength: 30 },
    duration: { type: String, required: true, maxLength: 30 },
    trappings: { type: String, maxLength: 400 },
    description: { type: String, maxLength: 1500 },
    expanded: { type: Boolean, default: false },
    modifiers: { type: [{ name: { type: String, required: true, maxLength: 60 }, description: { type: String, maxLength: 400 } }] }
  }, defaultSchemaOptions
)