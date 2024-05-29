import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const WeaponSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 60 },
    range: { type: String, required: true, maxLength: 30 },
    damage: { type: String, required: true, maxLength: 30 },
    ap: { type: Number, required: true },
    rof: { type: Number, required: true },
    weight: { type: Number, required: true },
    notes: { type: String, maxLength: 600 },
    expanded: { type: Boolean, default: false }
  }, defaultSchemaOptions
)