import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const WeaponSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 60 },
    range: { type: String, maxLength: 30 },
    damage: { type: String, required: true, maxLength: 30 },
    ap: { type: Number },
    rof: { type: Number },
    weight: { type: Number },
    notes: { type: String, maxLength: 600 },
    expanded: { type: Boolean, default: false }
  }, defaultSchemaOptions
)