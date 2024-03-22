import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const ArtSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    title: { type: String, required: true, minLength: 2, MaxLength: 60 },
    description: { type: String, maxLength: 2000 },
    imgUrl: { type: String, required: true, maxLength: 2000 }
  }, defaultSchemaOptions
)