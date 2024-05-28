import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const HindranceSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 60 },
    description: { type: String, maxLength: 2000 },
    expanded: { type: Boolean, default: false }
  }, defaultSchemaOptions
)