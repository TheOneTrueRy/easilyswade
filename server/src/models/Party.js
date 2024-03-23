import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema

export const PartySchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    dungeonMasterIds: { type: [Schema.Types.ObjectId], ref: 'Profile' },
    characterIds: { type: [Schema.Types.ObjectId], ref: 'Character' },
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    description: { type: String, maxLength: 3000 }
  }, defaultSchemaOptions
)