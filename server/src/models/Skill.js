import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const SkillSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 20 },
    die: { type: Number, required: true, enum: [4, 6, 8, 10, 12], default: 4 }
  }, defaultSchemaOptions
)